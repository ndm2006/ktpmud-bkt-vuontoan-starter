'use strict';
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const { once } = require('node:events');
const { mkdtemp, rm } = require('node:fs/promises');
const { createServer } = require('node:net');
const { tmpdir } = require('node:os');
const { join } = require('node:path');
const { randomUUID } = require('node:crypto');
const Database = require('better-sqlite3');
const fixtures = require('../server/estimation-questions');
const { seedEstimation, SET_ID, LESSON_ID } = require('../server/estimation-seed');
const scoring = require('../server/estimation-scoring');
const seed = require('../data/seed.json');
const expected = [42,7,92,14,111,288,26,36,320,304,13,32];
const rangeIds = ['r2','r2','r2','r1','r3','r2','r2','r3','r1','r3','r2','r1'];
let directory, child, origin, first, second, database, questions;
const endpoint = '/api/estimation-practice';
const id = i => `est-set-${String(i+1).padStart(2,'0')}`;
const goodEstimates = () => Object.fromEntries(rangeIds.map((value,i) => [id(i),value]));
const goodAnswers = () => Object.fromEntries(expected.map((value,i) => [id(i),value]));
async function start() {
  const socket = createServer();
  await new Promise((resolve,reject) => socket.once('error',reject).listen(0,'127.0.0.1',resolve));
  const { port } = socket.address();
  await new Promise(resolve => socket.close(resolve));
  origin = `http://127.0.0.1:${port}`;
  child = spawn(process.execPath,['server/index.js'],{ env:{...process.env, PORT:String(port), DB_PATH:join(directory,'test.db'), NODE_ENV:'test'} });
  await new Promise((resolve,reject) => {
    let output='';
    const timer=setTimeout(() => reject(new Error(output || 'Startup timeout')),30000);
    child.stdout.on('data',chunk => { output+=chunk; if(output.includes(`http://localhost:${port}`)){clearTimeout(timer);resolve();} });
    child.stderr.on('data',chunk => { output+=chunk; });
    child.once('error',error => {clearTimeout(timer);reject(error);});
    child.once('exit',code => {clearTimeout(timer);reject(new Error(`Server exited ${code}: ${output}`));});
  });
}
async function stop(){if(child && child.exitCode===null && !child.signalCode){const exited=once(child,'exit');child.kill();await exited;}}
async function call(path,token,body){
  const response=await fetch(origin+path,{method:body===undefined?'GET':'POST',headers:{...(token?{Authorization:`Bearer ${token}`} : {}),...(body===undefined?{}:{'Content-Type':'application/json'})},body:body===undefined?undefined:JSON.stringify(body)});
  return {status:response.status,data:await response.json()};
}
async function login(username){const r=await call('/api/auth/login',null,{username,password:'123456'});assert.equal(r.status,200);return r.data.token;}
async function lock(token=first, estimates=goodEstimates(), requestId=randomUUID()){
  return call(`${endpoint}/estimates`,token,{setId:SET_ID,requestId,estimates});
}
async function finish(run,answers=goodAnswers(),token=first,extra={}){return call('/api/submissions',token,{setId:SET_ID,runId:run.id,answers,...extra});}
function counts(){return database.prepare(`SELECT (SELECT COUNT(*) FROM attempts WHERE ref_id=?) attempts,(SELECT COUNT(*) FROM estimation_runs) runs`).get(SET_ID);}
before(async()=>{directory=await mkdtemp(join(tmpdir(),'vuontoan-v2-'));await start();database=new Database(join(directory,'test.db'));first=await login('hocsinh01');second=await login('hocsinh02');questions=database.prepare('SELECT * FROM questions WHERE set_id=? ORDER BY sort_order').all(SET_ID);});
after(async()=>{await stop();database?.close();if(directory)await rm(directory,{recursive:true,force:true});});

test('12 fixtures match independently written answers/ranges and contain 6 of each operation',()=>{
  assert.equal(fixtures.length,12);assert.equal(new Set(fixtures.map(q=>q.id)).size,12);
  assert.equal(fixtures.filter(q=>q.op==='×').length,6);assert.equal(fixtures.filter(q=>q.op==='÷').length,6);
  fixtures.forEach((q,i)=>{
    assert.equal(q.op==='×'?q.a*q.b:q.a/q.b,expected[i]);
    if(q.op==='÷')assert.equal(q.a%q.b,0);
    const subject=q.markFactor?q.b:q.a;assert.ok(q.marks[0]<subject && subject<q.marks[1]);
    const lower=q.op==='×'?q.marks[0]*(q.markFactor??q.b):q.marks[0]/q.b;
    const upper=q.op==='×'?q.marks[1]*(q.markFactor??q.b):q.marks[1]/q.b;
    const options=scoring.rangesFor(questions[i]);
    const correct=options.find(r=>r.id===rangeIds[i]);
    assert.ok(scoring.contains(correct,expected[i]));
    for(let value=lower+1;value<upper;value++)assert.ok(scoring.contains(correct,value));
    for(const r of options){assert.ok(scoring.contains(r,r.min));assert.ok(scoring.contains(r,r.max));assert.equal(scoring.contains(r,r.min-1),false);assert.equal(scoring.contains(r,r.max+1),false);}
  });
});
test('normalization accepts integers and rejects lossy coercion',()=>{
  for(const [value,want] of [[0,'0'],[999,'999'],[' 007 ','7'],['','']])assert.equal(scoring.normalizeExact(value),want);
  for(const value of [null,true,false,[],{},-1,1000,1.5,'1e2','7.0','a','   ','1000'])assert.throws(()=>scoring.normalizeExact(value),/số nguyên/);
});
test('four scoring combinations and exact-only or estimate-only cannot pass',()=>{
  const estimates=goodEstimates(), answers=goodAnswers();
  estimates[id(1)]='r1'; answers[id(2)]=0; estimates[id(3)]='r2'; answers[id(3)]=0;
  const r=scoring.score(questions,estimates,answers);
  assert.deepEqual(r.detail.slice(0,4).map(d=>[d.estimateCorrect,d.exactCorrect,d.correct]),[[true,true,true],[false,true,false],[true,false,false],[false,false,false]]);
  assert.equal(r.correctCount,9);assert.equal(r.scorePercent,75);
  assert.equal(scoring.score(questions,goodEstimates(),{}).scorePercent,0);
  const wrong=Object.fromEntries(questions.map((q,i)=>[q.id,rangeIds[i]==='r1'?'r2':'r1']));
  assert.equal(scoring.score(questions,wrong,goodAnswers()).scorePercent,0);
  assert.equal(scoring.score(questions,goodEstimates(),{[id(0)]:42}).scorePercent,8);
});
test('authenticated question API uses allowlist and does not expose scoring before submission',async()=>{
  assert.equal((await call(endpoint)).status,401);
  assert.equal((await call(`/api/question-sets/${SET_ID}/questions`)).status,401);
  const r=await call(`/api/question-sets/${SET_ID}/questions`,first);assert.equal(r.status,200);assert.equal(r.data.questions.length,12);
  for(const q of r.data.questions){assert.deepEqual(Object.keys(q).sort(),['id','type','prompt','points','category','options'].sort());assert.deepEqual(Object.keys(q.options).sort(),['hint','ranges']);}
  assert.equal((await call('/server/estimation-questions.js',first)).status,404);
  assert.equal((await call('/data/seed.json',first)).status,404);
  assert.deepEqual((await call(endpoint,first)).data,{run:null});
});
test('missing stage, invalid sets, incomplete/extra/invalid ranges do not create runs',async()=>{
  assert.equal((await call('/api/submissions',first,{setId:SET_ID,answers:goodAnswers()})).status,409);
  const initial=counts();
  for(const estimates of [null,[],{}, {...goodEstimates(),unknown:'r1'},{...goodEstimates(),[id(0)]:'r4'},{...goodEstimates(),[id(0)]:true}])assert.equal((await lock(first,estimates)).status,400);
  assert.equal((await call(`${endpoint}/estimates`,first,{setId:'other',requestId:randomUUID(),estimates:goodEstimates()})).status,400);
  assert.deepEqual(counts(),initial);
});
test('locking all estimates opens exact stage without feedback, rejects overwrite and isolates users',async()=>{
  const key=randomUUID(); const saved=await lock(first,goodEstimates(),key);assert.equal(saved.status,200);
  const run=saved.data.run;assert.equal(run.status,'exact');assert.equal(run.result,undefined);
  assert.deepEqual(Object.keys(run).sort(),['id','setId','status','estimates','questions'].sort());
  assert.deepEqual((await lock(first,goodEstimates(),key)).data,saved.data);
  assert.equal((await lock(first,{...goodEstimates(),[id(0)]:'r1'},key)).status,409);
  assert.equal((await lock()).status,409);
  assert.equal((await call(`${endpoint}/runs/${run.id}`,second)).status,404);
  assert.deepEqual((await call(endpoint,second)).data,{run:null});
  assert.equal((await finish(run,goodAnswers(),second)).status,404);
  assert.equal((await finish(run,goodAnswers(),first,{setId:'bai-15-kiem-tra'})).status,409);
  assert.equal((await finish(run,goodAnswers(),first,{estimates:goodEstimates()})).status,400);
  assert.equal((await finish(run,{[id(0)]:true})).status,400);
  assert.equal((await finish(run,{unknown:42})).status,400);
  assert.equal((await call(endpoint,first)).data.run.result,undefined);
  await stop();await start();
  assert.deepEqual((await call(endpoint,first)).data.run,run);
});
test('atomic finish writes attempts/progress/stars once under concurrent retries and persists result',async()=>{
  const run=(await call(endpoint,first)).data.run; const before=counts();
  const results=await Promise.all([finish(run),finish(run)]);assert.ok(results.every(r=>r.status===200));assert.deepEqual(results[0],results[1]);
  const r=results[0].data;assert.equal(r.scorePercent,100);assert.equal(r.correctCount,12);assert.equal(r.starsEarned,40);
  assert.equal(counts().attempts,before.attempts+1);
  const progress=(await call('/api/me/progress',first)).data.lessons.find(l=>l.id===LESSON_ID);assert.equal(progress.bestScore,100);assert.equal(progress.completed,true);
  // A retry never rewrites the frozen answer, even if the request changed.
  assert.deepEqual((await finish(run,{})).data,r);
  await stop();await start();
  assert.deepEqual((await call(`${endpoint}/runs/${run.id}`,first)).data.run.result,r);
  const attempt=database.prepare('SELECT * FROM attempts WHERE id=?').get(r.attemptId);
  assert.deepEqual(JSON.parse(attempt.answers_json),Object.fromEntries(expected.map((v,i)=>[id(i),String(v)])));
  assert.equal(attempt.correct_count,12);assert.equal(attempt.score_percent,100);
});
test('a second perfect run earns no duplicate stars; only six complete questions pass at 50%',async()=>{
  const run=(await lock()).data.run;const repeated=await finish(run);assert.equal(repeated.data.starsEarned,0);
  const other=(await lock(second)).data.run;const six=Object.fromEntries(expected.slice(0,6).map((v,i)=>[id(i),v]));
  const partial=await finish(other,six,second);assert.equal(partial.status,200);assert.equal(partial.data.scorePercent,50);assert.equal(partial.data.correctCount,6);assert.equal(partial.data.starsEarned,20);
});
test('transaction rolls back every write if progress update fails, then allows retry',async()=>{
  const run=(await lock()).data.run;const initial=counts();
  database.exec("CREATE TRIGGER test_fail_progress BEFORE INSERT ON progress BEGIN SELECT RAISE(ABORT,'injected write failure'); END;");
  try{assert.equal((await finish(run)).status,500);assert.deepEqual(counts(),initial);assert.equal((await call(`${endpoint}/runs/${run.id}`,first)).data.run.status,'exact');}
  finally{database.exec('DROP TRIGGER test_fail_progress');}
  assert.equal((await finish(run)).status,200);
});
test('content changes fail closed without writes; old final results remain viewable',async()=>{
  const run=(await lock()).data.run; const initial=counts();
  database.prepare('UPDATE questions SET prompt=prompt || ? WHERE id=?').run(' changed',id(0));
  assert.equal((await finish(run)).status,409);assert.deepEqual(counts(),initial);
  database.prepare('UPDATE questions SET prompt=? WHERE id=?').run(questions[0].prompt,id(0));
  assert.equal((await finish(run)).status,200);
});
test('additive seed is idempotent on an existing database and does not change users, attempts or old progress',()=>{
  const users=database.prepare('SELECT * FROM users').all();const attempts=database.prepare('SELECT * FROM attempts').all();const progress=database.prepare('SELECT * FROM progress').all();
  seedEstimation(database);seedEstimation(database);
  assert.equal(database.prepare('SELECT COUNT(*) c FROM questions WHERE set_id=?').get(SET_ID).c,12);
  assert.deepEqual(database.prepare('SELECT * FROM users').all(),users);assert.deepEqual(database.prepare('SELECT * FROM attempts').all(),attempts);assert.deepEqual(database.prepare('SELECT * FROM progress').all(),progress);
  assert.ok(database.prepare("SELECT name FROM sqlite_master WHERE name='estimation_answers'").get());
});
test('all four old types preserve original exact-string scoring, points and progress',async()=>{
  for(const setId of ['phieu-bai-9-10','bai-15-kiem-tra']){
    const old=seed.questionSets[setId].questions;
    const publicQuestions=await call(`/api/question-sets/${setId}/questions`,second);assert.equal(publicQuestions.status,200);
    assert.ok(publicQuestions.data.questions.every(q=>!Object.hasOwn(q,'correct_answer')&&!Object.hasOwn(q,'correctAnswer')));
    const answers=Object.fromEntries(old.map(q=>[q.id,` ${q.correctAnswer.toUpperCase()} `]));
    const r=await call('/api/submissions',second,{setId,answers});assert.equal(r.status,200);assert.equal(r.data.scorePercent,100);assert.equal(r.data.correctCount,old.length);
    assert.equal((await call('/api/submissions',second,{setId,answers})).data.starsEarned,0);
  }
});
