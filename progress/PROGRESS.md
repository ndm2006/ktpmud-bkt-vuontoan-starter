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

Cập nhật chuẩn bị theo ADR-002, chưa xác nhận đã trình bày PC-2 hoặc đăng comment issue #18. Phần PC-1 giữ nguyên như lịch sử.

### 2.1. Đối chiếu kế hoạch và thực tế

Thiết kế PC-1 lưu từng câu riêng chưa nối attempts/progress/sao. Sau phản biện, đại diện nhóm yêu cầu sửa sang kế hoạch tối ưu: khóa 12 ước lượng một lần, nộp qua submissions, chấm cả hai bước và cập nhật luồng hiện hữu. Bộ fixture được giữ; giao diện chuyển sang lesson.html. Không quy đổi điểm từng câu cũ thành lượt mới.

### 2.2. Tiến độ acceptance criteria hiện hành

| Mã | Trạng thái | Bằng chứng / giới hạn |
|---|---|---|
| B-01 | Đạt cục bộ | E01: đi từ menu thật sang lesson.html |
| B-02 | Đạt cục bộ | U01: 12 fixture/ID cố định, 6 nhân/6 chia |
| B-03 | Đạt cục bộ | U01–U03; ADR-002, điểm toàn phần |
| B-04 | Đạt cục bộ | I01, allowlist đề/run trước nộp |
| B-05 | Đạt cục bộ | I03–I07; E01–E02: lưu, refresh/restart/retry |
| B-06 | Đạt cục bộ | U03/E03: feedback đủ bốn tổ hợp |
| B-07 | Đã soát diff | Các file bảo vệ và route auth/teacher/admin khớp starter; PC-1 giữ nguyên |
| B-08 | Đạt cục bộ | 14 test unit/API; boundary/invalid/scoring/rollback |
| B-09 | Đạt CI checkout sạch | npm ci + npm test + E2E đạt tại 43e3302; TEST_REPORT |
| B-10 | Đạt CI code hiện hành | [Run 43e3302](https://github.com/ndm2006/ktpmud-bkt-vuontoan-starter/actions/runs/44123673362), PR #1, npm ci + npm test + E2E |
| B-11 | Đã soát staged diff | Không phát hiện mẫu secret trong phần thêm; không stage DB/env/artifact |
| B-12 | Đạt luồng chính cục bộ | E01 keyboard đủ 12; E03 mobile; E04 thiếu randomUUID; Codex IAB thật. Chưa screen reader thực tế |

### 2.3. Hồ sơ sẵn sàng

README, REQUIREMENTS, DECISIONS/ADR-002, TEST_PLAN/REPORT, SECURITY_PRIVACY_CHECKLIST, AI_USE, CONTRIBUTIONS và docs/DEMO.md được cập nhật theo thiết kế mới. Bằng chứng CI và commit cuối cần đúng SHA hiện hành.

Draft PR vào ktpmud-project/check validate: chưa thực hiện trong đợt sửa source. CI fork không thay check validate. Nhóm cần đối chiếu hồ sơ riêng theo docs/SUBMISSION.md và đính chính #28.

### 2.4. Việc còn lại trước freeze

- Review code, quy tắc khoảng và độ phù hợp sư phạm; xác nhận bằng chứng kiểm thử.
- Code đã có CI checkout sạch và soát phạm vi; nhóm review và cập nhật hồ sơ nộp bằng SHA cuối.
- Đại diện nhóm xử lý Draft PR hồ sơ, comment PC-2 đúng khung giờ và chốt tag/release theo đề.

### 2.5. Giới hạn / câu hỏi còn lại

Teacher analytics chỉ chẩn đoán lỗi bước chính xác; điểm trung bình lấy điểm cả hai bước. Các số đang gõ chưa nộp không tự lưu. Nếu nội dung bị sửa giữa lượt, server từ chối chấm và cần thầy cô hỗ trợ; MVP chưa có UI hủy lượt lỗi thời.

### Bổ sung review cuối trước freeze

Nhóm xác nhận ngoại lệ hai người đã được GV chấp thuận. Code có chỉnh cuối tương thích trình duyệt, chặn metadata sai và đồng bộ câu 6 thành 48 × 6. 14/14 unit/API, 4/4 E2E và kiểm thử trực tiếp Codex đạt cục bộ; xem docs/FINAL_REVIEW.md và ảnh artifacts/review. CI của bản chỉnh cuối và gói nộp phải khớp SHA mới, không dùng run cũ ghi ở bảng trên.

## Kết quả cuối — Freeze 19/11/2026

- Tag: `bkt-2026-N57-rc1` (dự kiến) · SHA: điền tại Freeze.
- Trạng thái cuối từng AC: điền tại Freeze.
- Những việc trong timeline chưa hoàn thành và lý do: điền tại Freeze.
