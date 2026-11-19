# PROGRESS — N57 — Track B

- Starter: `fossbk-spec/ktpmud-bkt-vuontoan-starter` · tag `bkt-2026-v1` · commit `057a48205f50f0f30d6260be1a44b343a167a3e7`
- Fork: https://github.com/ndm2006/ktpmud-bkt-vuontoan-starter
- Nhánh: `track-b-work`
- Bản chuẩn bị cho ngày 11/11/2026. Các trạng thái dưới đây phản ánh bản MVP và kết quả kiểm tra đã có.

## PC-1 — 11/11/2026

Hồ sơ CP1 bổ sung theo [đính chính #25](https://github.com/fossbk-spec/ktpmud-project/issues/25): [REQUIREMENTS và tiêu chí nghiệm thu](../REQUIREMENTS.md), [kế hoạch kiểm thử](../TEST_PLAN.md), [ADR-001](../DECISIONS.md). M0 đã ghi trong [hồ sơ kickoff](../docs/M0-KICKOFF.md). Phạm vi CP1 chờ GV/TA duyệt. Xem [kịch bản demo PC-1](../docs/PC1-DEMO.md) để chạy MVP, trình bày luồng và đối chiếu bằng chứng.

### 1.1. Tiến độ theo acceptance criteria

Nhóm dùng **Xong** cho tiêu chí đã có bằng chứng trong phạm vi ghi ở cột ghi chú. **Đang** là mục đã có một phần bằng chứng và còn ca cần kiểm tra. [Phạm vi kiểm thử và các ca trình duyệt](../TEST_REPORT.md)

| Mã | Trạng thái | Bằng chứng | Ghi chú |
|---|---|---|---|
| B-01 | Xong | [Phòng Luyện Tập](../public/exercise.html), [T01/T12](../TEST_PLAN.md) | Đã mở bài từ menu trên trình duyệt tích hợp. Hai thẻ luyện tập nằm dưới thanh lộ trình. Đã kiểm tra chuyển qua lại, giữ lựa chọn của phiếu và chạy ca nộp phiếu cũ qua API. |
| B-02 | Xong | [12 câu synthetic](../server/estimation-questions.js), [test](../test/estimation-practice.test.js) | 6 phép nhân và 6 phép chia, ba chặng cố định. |
| B-03 | Xong | [Quy tắc chấm](../server/estimation-practice.js), [test](../test/estimation-practice.test.js) | Mọi kết quả nguyên giữa hai mốc dễ nhẩm nằm trong duy nhất một khoảng. Server chấm bằng hai cờ độc lập. |
| B-04 | Xong | [API](../server/estimation-practice.js), [test](../test/estimation-practice.test.js) | Kiểm tra tải bài và bước ước lượng không trả đáp số hoặc lời giải. |
| B-05 | Xong | [Schema](../server/db.js), [API](../server/estimation-practice.js), [test](../test/estimation-practice.test.js) | Kiểm tra nộp đúng thứ tự, khôi phục sau khởi động lại server và cách ly hai tài khoản. DOM kiểm tra tải lại cả hai bước. |
| B-06 | Xong | [JS](../public/assets/js/pages/estimation-practice.js), [test](../test/estimation-practice.test.js) | Kiểm tra hai phản hồi riêng trên DOM với ca sai khoảng nhưng tính đúng. Có giải thích mốc sau khi nộp. |
| B-07 | Xong | [Checklist](../SECURITY_PRIVACY_CHECKLIST.md), [test hồi quy phiếu cũ](../test/estimation-practice.test.js) | Đối chiếu tag starter xác nhận các tệp auth, dữ liệu tài khoản mẫu và cấu hình deployment giữ nguyên. Ca hồi quy phiếu Bài 9–10 đạt. |
| B-08 | Xong | [8 ca tự động](../test/estimation-practice.test.js) | Đủ ca thông thường, biên đầu vào, dữ liệu lỗi, chấm, nộp lặp và gửi đồng thời. |
| B-09 | Xong | [Báo cáo kiểm thử](../TEST_REPORT.md) | Bản xuất Git sạch trên Windows x64 chạy được `npm ci` và `npm test`, đạt 8/8 với Node.js 22. |
| B-10 | Xong | [T14](../TEST_PLAN.md), [CI trên PR #1](https://github.com/ndm2006/ktpmud-bkt-vuontoan-starter/actions/runs/42870604600) | `npm ci` và `npm test` đạt tại `88f7f12`. Nhóm đối chiếu run theo SHA ở mỗi mốc nộp. |
| B-11 | Xong | [Fixture synthetic](../server/estimation-questions.js), [nhật ký AI](../AI_USE.md) | Diff MVP dùng dữ liệu bài synthetic và alias. DB thử được tạo cục bộ, ngoài repo. |
| B-12 | Đang | [Ca bàn phím T10](../TEST_REPORT.md) | Đã kiểm tra luồng chính bằng Tab, phím mũi tên và Enter cho một câu, gồm sửa lỗi định dạng. Cần thử thêm các chặng, kích thước màn hình và trình đọc màn hình. |

Kiểm tra MVP ban đầu đã đi hết **12 câu** bằng DOM nối với server thật. Với giao diện `0bc0176`, đã kiểm tra trên trình duyệt tích hợp hai liên kết đầu trang, chuyển hoạt động, lưu khoảng, nộp đáp số, mở gợi ý và xem cách nhẩm. Bộ kiểm thử đạt **8/8** từ checkout sạch trên Windows với Node.js 22. PR nội bộ cũng đã chạy CI thành công. [Báo cáo kiểm thử](../TEST_REPORT.md) · [Các bước demo](../docs/PC1-DEMO.md).

### 1.2. Sửa đổi bắt buộc từ Checkpoint 1

Không có tại thời điểm lập bản chuẩn bị. Nhóm xác nhận chưa từng nộp CP1 và đang bổ sung hồ sơ theo #25. Khi nhận góp ý của GV/TA, cập nhật từng mục bắt buộc kèm bằng chứng.

### 1.3. Timeline dự kiến đến khi hoàn thành

Giờ Việt Nam. CP2 là buổi demo nội bộ của M2. PC-2 là buổi kiểm tra tiến độ tại lớp. [Hướng dẫn Progress Check](https://fossbk-spec.github.io/ktpmud-book/exams/KTPMUD_Hack_Marathon_2026_Progress_Check.html) · [Đính chính #28](https://github.com/fossbk-spec/ktpmud-project/issues/28)

| Việc | Vai trò phụ trách | Mốc (CP2 15/11 · M3 · Freeze 19/11 · M4 20/11) | Ngày dự kiến |
|---|---|---|---|
| Bổ sung yêu cầu, tiêu chí nghiệm thu, ADR và kế hoạch test lên fork | N57-A, N57-B cùng đọc và kiểm tra | CP1 bổ sung | 10/11, trước 9:30 ngày 11/11 |
| Cập nhật báo cáo, trình bày tại lớp và xác nhận SHA trên Issue #17 | Cả nhóm | PC-1 | 11/11, 9:30–11:30 |
| Đã có fixture, bộ chấm, API và SQLite trong MVP. Đối chiếu kết quả và nhận góp ý | N57-A | PC-1 / M2 | 11–12/11 |
| Hiện đủ đáp án sau khi nộp, rà dấu chọn khi xem lại giữa các chặng, kiểm tra bàn phím và kích thước màn hình. Bổ sung ca trình duyệt cho luồng chính | N57-A hỗ trợ sửa và tự động hóa, N57-B kiểm thử giao diện và ghi kết quả | M2 | 12–14/11 |
| Kiểm tra API, chấm và lưu tiến độ, hồi quy giao diện, chạy bộ test công khai. Demo nội bộ 5 phút và ghi phản hồi | N57-A kiểm tra nghiệp vụ và test, N57-B kiểm tra giao diện, cả nhóm demo | CP2 | 14–15/11, hoàn thành cuối ngày 15/11 |
| Rà soát CI, bảo mật, dữ liệu và tài liệu. Chuẩn bị gói theo mẫu Track B, điền SHA dự kiến PC-2, tên tag dự kiến và URL CI vào `source-ref.json` | N57-A chuẩn bị hồ sơ và CI, N57-B kiểm tra tài liệu và bằng chứng giao diện | M3 | 16–17/11 |
| Mở Draft PR từ fork kho môn học vào `fossbk-spec/ktpmud-project`, chỉ thêm thư mục bài nộp của nhóm. Sửa trên cùng nhánh đến khi `validate` đạt | N57-A mở PR và theo dõi `validate`, N57-B soát gói nộp | M3 / PC-2 | Dự kiến 17/11, hạn 11:30 ngày 18/11 |
| Đối chiếu kế hoạch với thực tế, cập nhật mục PC-2, push báo cáo và xác nhận trên Issue #18 bằng SHA đầy đủ và URL Draft PR | Cả nhóm | PC-2 | 18/11, 09:30–11:30 |
| Rà soát tiêu chí và tệp cuối, xác nhận CI trên fork, chốt SHA và gắn tag `bkt-2026-N57-rc1` | N57-A chốt SHA, CI và tag, N57-B kiểm tra hồ sơ và demo | Freeze | Hạn 23:59 ngày 19/11 |
| Cập nhật `source-ref.json` và tài liệu bằng SHA, tag và URL CI của bản freeze. Chuyển cùng Draft PR sang Ready for review và kiểm tra `validate` đạt | N57-A cập nhật và chuyển trạng thái PR, N57-B kiểm tra gói cuối | M4 | 20/11 |
| Demo tối đa 7 phút và vấn đáp tối đa 8 phút | Cả nhóm | Demo/Viva | 21/11 |

### 1.4. Rủi ro / đang vướng

- CP1 bổ sung sau hạn gốc. Cần xác nhận phạm vi với GV/TA tại PC-1 và dành thời gian xử lý góp ý.
- Kiểm tra các phản hồi ở giữa hai bước để tránh lộ đáp số. Khi refresh hoặc nhấn nộp hai lần, server phải khôi phục đúng trạng thái và không ghi đè kết quả.
- MVP đã chạy trên máy cục bộ, kiểm tra từ menu và qua bàn phím. Độ khó ba chặng chưa được thử với học sinh. [Checklist](../SECURITY_PRIVACY_CHECKLIST.md) ghi hai cảnh báo dependency để nhóm xem xét trước Freeze.

### 1.5. Câu hỏi cho GV

- Q1: Với hồ sơ CP1 bổ sung theo #25, nhóm nên nhận và theo dõi phản hồi duyệt phạm vi ở đâu sau PC-1?
- Q2: Lưu kết quả ước lượng trong mục luyện tập riêng, giữ nguyên điểm và sao của phiếu cũ, có phù hợp phạm vi B-05 không?
- Q3: Hai mốc và gợi ý ở từng chặng đã phù hợp với học sinh lớp 3 chưa?

### 1.6. Phân công

| Alias / vai trò | Đầu việc chính theo kế hoạch đã chốt | Commit/PR tiêu biểu |
|---|---|---|
| N57-A | Đề xuất ý tưởng, chốt luồng học, cùng phát triển MVP với AI hỗ trợ, kiểm tra MVP và hồ sơ, chịu trách nhiệm bản bàn giao | Xác nhận đã kiểm tra `5abd6d3`. Xem [đóng góp](../CONTRIBUTIONS.md). |
| N57-B | Kiểm thử giao diện và đồng ý chốt bố trí MVP | Nhóm ghi nhận kiểm thử và góp ý của N57-B cho bố trí hiện tại. Xem [đóng góp](../CONTRIBUTIONS.md). |

## PC-2 — 18/11/2026

Bổ sung thực tế ngày 19/11/2026 theo nhận xét follow-up trong issue #18. Nhóm chưa có comment xác nhận PC-2 trong khung 09:30–11:30 ngày 18/11; không tự xác nhận đã tham dự/nộp đúng hạn. Phần PC-1 phía trên giữ nguyên làm lịch sử. Nhóm hỏi thủ tục xử lý bổ sung tại issue #32 theo hướng dẫn của GV.

### 2.1. Đối chiếu timeline PC-1

| Việc theo 1.3 | Kế hoạch | Thực tế / bằng chứng | Lệch và lý do |
|---|---|---|---|
| Hoàn thiện luồng và demo nội bộ | 12–15/11 | MVP cũ có lịch sử PC-1; luồng ADR-002 và kiểm thử cuối hoàn thành tại d98c33f | Thay thiết kế sau phản biện: khóa toàn bộ 12 ước lượng, tích hợp submissions/progress/sao; không giả lập demo nhóm ngày 15/11 |
| Rà CI, bảo mật và hồ sơ | 16–17/11 | 14 unit/API, 4 E2E và CI tại d98c33f; TEST_REPORT và FINAL_REVIEW | Có sửa cuối câu 6, tương thích randomUUID và metadata; đã kiểm tra lại |
| Draft PR hồ sơ và validate | Trước 11:30 18/11 | [Draft PR #52](https://github.com/fossbk-spec/ktpmud-project/pull/52), mở 19/11; [validate đạt](https://github.com/fossbk-spec/ktpmud-project/actions/runs/44567458530) | Trễ hạn PC-2; đợt trước mới chuẩn bị gói cục bộ, chưa công bố PR |
| Cập nhật báo cáo và xác nhận PC-2 | 09:30–11:30 18/11 | Bổ sung báo cáo ngày 19/11; không có comment đúng khung giờ | Không tự sửa thời gian hoặc nhận là đã hoàn thành đúng hạn |
| Chốt SHA/tag freeze | Trước 23:59 19/11 | Candidate code d98c33f đã được đại diện yêu cầu giữ nguyên; bản bổ sung chỉ sửa hồ sơ | Cần chốt tag thật sau khi CI của bản bổ sung đạt |
| Ready for review và demo/viva | 20–21/11 | Draft PR #52; docs/DEMO.md | Chưa đến bước nhóm xác nhận nộp cuối và trình bày |

### 2.2. Tiến độ acceptance criteria hiện hành

Bằng chứng code đã kiểm tra: [d98c33f](https://github.com/ndm2006/ktpmud-bkt-vuontoan-starter/tree/d98c33feb787395d3701d2235a354da428cfd20b), [CI đạt](https://github.com/ndm2006/ktpmud-bkt-vuontoan-starter/actions/runs/44129408084). Bản bổ sung tiến độ không thay đổi code. Các mã test và giới hạn xem TEST_PLAN.md, TEST_REPORT.md, docs/FINAL_REVIEW.md. “Xong” là trạng thái triển khai có bằng chứng, không thay nghiệm thu của GV.

| Mã | Trạng thái | Bằng chứng | Giới hạn / ghi chú |
|---|---|---|---|
| B-01 | Xong | E01, public/exercise.html, public/lesson.html | Đi từ menu thật tới bài tích hợp |
| B-02 | Xong | U01, server/estimation-questions.js | 12 fixture cố định, 6 nhân/6 chia; câu 6 là 48 × 6 |
| B-03 | Xong | U01–U03, server/estimation-scoring.js | Một điểm khi cả hai bước đúng; các khoảng không chồng lấn |
| B-04 | Xong | I01, allowlist publicQuestion | Không trả đáp án trước nộp |
| B-05 | Xong | I03–I07, E01–E02 | Lưu ước lượng/kết quả, refresh/restart/retry; số đang gõ chưa nộp không tự lưu |
| B-06 | Xong | U03/E03 | Hai feedback riêng, đủ bốn tổ hợp |
| B-07 | Xong | Diff starter, ca hồi quy trong TEST_REPORT | Không đổi auth/session/tài khoản mẫu/deployment |
| B-08 | Xong | 14 unit/API trong test/estimation-practice.test.js | Có boundary, invalid, scoring, rollback và concurrency |
| B-09 | Xong | CI checkout sạch, README | Node 22, npm ci + npm test + E2E |
| B-10 | Xong | CI run 44129408084, PR nội bộ #1 | Bản bổ sung hồ sơ tiếp tục chạy CI qua cùng PR |
| B-11 | Xong | SECURITY_PRIVACY_CHECKLIST.md, AI_USE.md | Dữ liệu synthetic/alias; không commit DB hoặc env |
| B-12 | Xong trong phạm vi kiểm thử | E01/E03/E04, ảnh Codex trong artifacts/review | Đủ bàn phím 12 câu, mobile, thông báo lỗi; chưa chứng nhận screen reader thực tế |

### 2.3. Sẵn sàng nộp bài

| Deliverable | Có / Chưa | Đường dẫn / bằng chứng |
|---|---|---|
| README cài đặt/chạy/test | Có | [README.md](../README.md) |
| REQUIREMENTS | Có | [REQUIREMENTS.md](../REQUIREMENTS.md) |
| DECISIONS / ADR | Có | [DECISIONS.md](../DECISIONS.md), ADR-002 |
| TEST_PLAN | Có | [TEST_PLAN.md](../TEST_PLAN.md) |
| Test tự động và CI xanh | Có | [14 unit/API + 4 E2E](https://github.com/ndm2006/ktpmud-bkt-vuontoan-starter/actions/runs/44129408084) |
| TEST_REPORT | Có | [TEST_REPORT.md](../TEST_REPORT.md) |
| SECURITY_PRIVACY_CHECKLIST | Có | [SECURITY_PRIVACY_CHECKLIST.md](../SECURITY_PRIVACY_CHECKLIST.md) |
| AI_USE | Có | [AI_USE.md](../AI_USE.md) |
| CONTRIBUTIONS / phân công | Có | [CONTRIBUTIONS.md](../CONTRIBUTIONS.md), bảng 1.6 giữ nguyên |
| Demo script ≤7 phút | Có | [docs/DEMO.md](../docs/DEMO.md) |
| Draft PR vào ktpmud-project | Có, bổ sung muộn | [PR #52](https://github.com/fossbk-spec/ktpmud-project/pull/52) |
| Check validate của PR | Có | [Run đạt cho bản hồ sơ đầu](https://github.com/fossbk-spec/ktpmud-project/actions/runs/44567458530); mỗi lần push tiếp tục đối chiếu run mới trên PR |
| source-ref.json, sáu artifacts, alias nhóm | Có | submissions/hoang_mai_toan_n57 trong PR #52; N57-A/N57-B, ngoại lệ hai người theo xác nhận đại diện nhóm |
| Tag freeze | Chốt sau CI của bản tài liệu cuối | bkt-2026-N57-rc1; kiểm tra tag thật và source-ref.json trong PR #52, không di chuyển tag |

### 2.4. Việc còn lại đến freeze / nộp cuối

| Việc | Vai trò phụ trách | Hạn |
|---|---|---|
| Push báo cáo bổ sung, CI đúng SHA, đồng bộ source-ref và validate | Codex hỗ trợ theo yêu cầu đại diện; N57-A kiểm tra bàn giao | Trước 23:59 19/11 |
| Tạo tag thật sau CI đạt và không di chuyển tag | Đại diện nhóm đã ủy quyền Codex hoàn thiện freeze trong yêu cầu mới ngày 19/11 | Trước 23:59 19/11 |
| Trao đổi xử lý PC-2 bổ sung muộn tại #32 | Đại diện nhóm, Codex hỗ trợ gửi theo yêu cầu mới | 19/11; quyết định ghi nhận thuộc GV |
| Review hồ sơ cuối và chuyển cùng PR #52 sang Ready for review | N57-A; N57-B đối chiếu demo/bằng chứng | 20/11 |
| Diễn tập và trình bày demo/viva | N57-A, N57-B | 21/11; demo ≤7 phút, viva ≤8 phút |

### 2.5. Rủi ro / câu hỏi cho GV

- Nhóm chưa xác nhận PC-2 đúng khung giờ. Xin hướng dẫn ghi nhận hồ sơ bổ sung qua #32; không đề nghị tự động coi là đúng hạn.
- Teacher analytics chỉ chẩn đoán lỗi bước chính xác; điểm tổng tính cả hai bước. Không sửa route teacher theo phạm vi bảo vệ.
- Số đang gõ chưa nộp không tự lưu; UI đã thông báo. Nội dung bị sửa giữa lượt sẽ bị từ chối chấm và cần hỗ trợ; bộ fixture giữ ổn định qua demo.
- Chưa nghiên cứu với học sinh thật, chưa kiểm tra screen reader thực tế. Không ghi kết quả tự động thành xác nhận của người học hoặc GV.

## Kết quả cuối — Freeze 19/11/2026

- Code giữ nguyên candidate d98c33feb787395d3701d2235a354da428cfd20b theo lựa chọn đại diện nhóm. Bản cuối chỉ bổ sung hồ sơ tiến độ/AI; không thay code hoặc fixture.
- Đại diện nhóm yêu cầu Codex hoàn thiện các bước trước 23:59 ngày 19/11, bao gồm tạo tag thay lựa chọn tự tạo trước đó. Mốc freeze là tag bkt-2026-N57-rc1 trỏ vào chính bản tài liệu cuối này sau khi CI đạt; SHA, URL CI và trạng thái tag thực tế được ghi trong source-ref.json/README của PR #52. Không thay đổi tag đã công bố.
- Bản tài liệu này được commit trước thao tác tạo tag; bằng chứng công bố được đối chiếu tại GitHub và gói nộp để tránh tự tham chiếu SHA.
- Trạng thái AC: như bảng 2.2; các giới hạn vẫn giữ rõ ở 2.5.
- Việc lệch timeline: Draft PR và báo cáo PC-2 bổ sung ngày 19/11, quá hạn 18/11; chưa có xác nhận tham gia PC-2 đúng giờ. Ready for review và demo do nhóm thực hiện theo lịch.
