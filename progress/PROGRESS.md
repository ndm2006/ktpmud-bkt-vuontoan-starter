# PROGRESS — N57 — Track B

- Starter: `fossbk-spec/ktpmud-bkt-vuontoan-starter` · tag `bkt-2026-v1` · commit `057a48205f50f0f30d6260be1a44b343a167a3e7`
- Fork: https://github.com/ndm2006/ktpmud-bkt-vuontoan-starter
- Nhánh: `track-b-work`
- Bản chuẩn bị cho ngày 11/11/2026. Các trạng thái dưới đây phản ánh bản MVP và kết quả kiểm tra đã có.

## PC-1 — 11/11/2026

Hồ sơ CP1 bổ sung theo [đính chính #25](https://github.com/fossbk-spec/ktpmud-project/issues/25): [REQUIREMENTS và tiêu chí nghiệm thu](../REQUIREMENTS.md), [kế hoạch kiểm thử](../TEST_PLAN.md), [ADR-001](../DECISIONS.md). M0 đã ghi trong [hồ sơ kickoff](../docs/M0-KICKOFF.md). Phạm vi CP1 chờ GV/TA duyệt. Xem [kịch bản demo PC-1](../docs/PC1-DEMO.md) để chạy MVP, trình bày luồng và đối chiếu bằng chứng.

### 1.1. Tiến độ theo acceptance criteria

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
| B-10 | Xong | [T14](../TEST_PLAN.md), [CI trên PR #1](https://github.com/ndm2006/ktpmud-bkt-vuontoan-starter/actions/runs/42864978852) | Workflow chạy `npm ci` và `npm test` thành công với bản MVP tại `c0d3169`. |
| B-11 | Xong | [Fixture synthetic](../server/estimation-questions.js), [nhật ký AI](../AI_USE.md) | Diff MVP dùng dữ liệu bài synthetic và alias. DB thử được tạo cục bộ, ngoài repo. |
| B-12 | Xong | [Ca bàn phím T10](../TEST_REPORT.md) | Đã thử Tab, phím mũi tên và Enter cho luồng chọn khoảng, nhập đáp số, sửa lỗi định dạng và nhận phản hồi. |

Kiểm tra MVP ban đầu đã đi hết **12 câu** bằng DOM nối với server thật. Với giao diện `0bc0176`, đã kiểm tra trên trình duyệt tích hợp hai liên kết đầu trang, chuyển hoạt động, lưu khoảng, nộp đáp số, mở gợi ý và xem cách nhẩm. Bộ kiểm thử đạt **8/8** từ checkout sạch trên Windows với Node.js 22. PR nội bộ cũng đã chạy CI thành công. [Báo cáo kiểm thử](../TEST_REPORT.md) · [Các bước demo](../docs/PC1-DEMO.md).

### 1.2. Sửa đổi bắt buộc từ Checkpoint 1

Không có tại thời điểm lập bản chuẩn bị. Nhóm xác nhận chưa từng nộp CP1 và đang bổ sung hồ sơ theo #25. Khi nhận góp ý của GV/TA, cập nhật từng mục bắt buộc kèm bằng chứng.

### 1.3. Timeline dự kiến đến khi hoàn thành

| Việc | Vai trò phụ trách | Mốc | Ngày dự kiến |
|---|---|---|---|
| Bổ sung yêu cầu, tiêu chí nghiệm thu, ADR và kế hoạch test lên fork | N57-A, N57-B cùng đọc và kiểm tra | CP1 bổ sung | 10/11, trước 9:30 ngày 11/11 |
| Cập nhật báo cáo, trình bày tại lớp và xác nhận SHA trên Issue #17 | Cả nhóm | PC-1 | 11/11, 9:30–11:30 |
| Đã có fixture, bộ chấm, API và SQLite trong MVP. Đối chiếu kết quả và nhận góp ý | N57-A | PC-1 / M2 | 11–12/11 |
| Đã tích hợp UI hai bước và khôi phục. Kiểm tra bàn phím, bố cục và chỉnh theo góp ý | N57-B | M2 | 12–14/11 |
| Test API/chấm/lưu, hồi quy UI, chạy test công khai và chuẩn bị demo nội bộ | N57-A, N57-B | CP2 | 14–15/11 |
| Hoàn thiện test, CI trên PR nội bộ, kiểm tra dữ liệu và tài liệu | N57-A, N57-B | M3 / PC-2 | 16–18/11 |
| Đối chiếu tiêu chí, chốt tag và SHA | Cả nhóm | Freeze | 19/11 trước 23:59 |
| Nộp một PR vào kho môn học, kiểm tra CI validate | Cả nhóm | M4 | 20/11 |
| Demo và vấn đáp | Cả nhóm | Demo/Viva | 21/11 |

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
| N57-A | Lên ý tưởng, chốt luồng học, kiểm tra MVP và hồ sơ, chịu trách nhiệm bản bàn giao | Xác nhận đã kiểm tra `5abd6d3`. Xem [đóng góp](../CONTRIBUTIONS.md). |
| N57-B | Kiểm thử giao diện và đồng ý chốt bố trí MVP | N57-A xác nhận kết quả kiểm thử và ý kiến của N57-B. Xem [đóng góp](../CONTRIBUTIONS.md). |

## PC-2 — 18/11/2026

Bảng dưới là trạng thái chuẩn bị, chưa phải xác nhận đã trình bày PC-2. Xem [hồ sơ nộp](../docs/SUBMISSION.md) để theo dõi phần còn thiếu.

### 2.1. Đối chiếu timeline PC-1

| Việc (theo bảng 1.3) | Kế hoạch | Thực tế | Lệch & lý do |
|---|---|---|---|
| Đối chiếu MVP và chuẩn bị trình bày | PC-1 / M2 | Luồng đã kiểm tra trên trình duyệt, có [kịch bản demo](../docs/PC1-DEMO.md). | Chờ phản hồi của GV/TA. |
| Chốt bằng chứng CI và hồ sơ | M3 / PC-2 | Có run CI, kiểm tra bàn phím, báo cáo kiểm thử và xác nhận đóng góp. | Kiểm tra CI lại trên bản freeze. |

### 2.2. Tiến độ theo acceptance criteria

| Mã | Trạng thái | Bằng chứng | Ghi chú |
|---|---|---|---|
| B-01–B-06, B-08–B-09, B-11–B-12 | Có bằng chứng cục bộ | [Báo cáo kiểm thử](../TEST_REPORT.md) | Đối chiếu chi tiết và giới hạn tại bảng 1.1. |
| B-07 | Xong | [Checklist](../SECURITY_PRIVACY_CHECKLIST.md) | Đã đối chiếu các tệp thuộc phạm vi bảo vệ của đề và chạy hồi quy phiếu Bài 9–10. |
| B-10 | Xong ở PC-1 | [CI trên PR #1](https://github.com/ndm2006/ktpmud-bkt-vuontoan-starter/actions/runs/42864978852) | Kiểm tra lại trên SHA freeze. |

### 2.3. Sẵn sàng nộp bài

| Deliverable | Có / Chưa | Đường dẫn |
|---|---|---|
| README.md (cài đặt / chạy / test) | Có | [README.md](../README.md) |
| REQUIREMENTS.md | Có | [REQUIREMENTS.md](../REQUIREMENTS.md) |
| DECISIONS.md / ADR | Có | [DECISIONS.md](../DECISIONS.md) |
| Test tự động + CI xanh | Có cho PC-1 | [TEST_REPORT.md](../TEST_REPORT.md) |
| TEST_REPORT.md | Có | [TEST_REPORT.md](../TEST_REPORT.md) |
| SECURITY_PRIVACY_CHECKLIST.md | Có | [Checklist](../SECURITY_PRIVACY_CHECKLIST.md) |
| AI_USE.md | Có | [AI_USE.md](../AI_USE.md) |
| CONTRIBUTIONS.md | Có xác nhận vai trò N57-A và kiểm thử giao diện của N57-B | [CONTRIBUTIONS.md](../CONTRIBUTIONS.md) |
| Slide / demo script ≤ 7 phút | Có kịch bản | [Kịch bản demo](../docs/PC1-DEMO.md) |

### 2.4. Việc còn lại đến Freeze (23:59 19/11)

| Việc | Vai trò phụ trách | Hạn |
|---|---|---|
| Chạy CI trên PR nội bộ, ghi link và SHA | N57-A và N57-B | Trước Freeze |
| Kiểm tra tệp cuối và chốt SHA/tag | Cả nhóm | 23:59 ngày 19/11 |

### 2.5. Rủi ro / câu hỏi cho GV

Điền tại PC-2.

## Kết quả cuối — Freeze 19/11/2026

- Tag: `bkt-2026-N57-rc1` (dự kiến) · SHA: điền tại Freeze.
- Trạng thái cuối từng AC: điền tại Freeze.
- Những việc trong timeline chưa hoàn thành và lý do: điền tại Freeze.
