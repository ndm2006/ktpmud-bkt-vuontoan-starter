# AI_USE — M0 — Track B — N57

Trạng thái: **Đã được N57-A review và chấp thuận theo xác nhận trong cuộc trao đổi kickoff**.

## 1. Công cụ và phạm vi AI hỗ trợ

| Trường | Nội dung |
|---|---|
| Công cụ | ChatGPT/Codex |
| Model | **GPT 6.1 Sol**, theo xác nhận của đại diện nhóm |
| Mốc | M0 — Kickoff, 04/11/2026 |
| Người chịu trách nhiệm | **N57-A**; ánh xạ danh tính giữ trong hồ sơ riêng của nhóm |
| Tệp liên quan | docs/M0-KICKOFF.md, AI_USE.md |
| Nhánh | track-b-work |

## 2. Tác vụ và kiểm chứng

| Tác vụ AI hỗ trợ | Bằng chứng kiểm chứng | Phạm vi kết quả |
|---|---|---|
| Đọc đề, tổng hợp M0 và giới hạn Track B | Đối chiếu Mục 0, 4, 5, 8 của đề chính thức; N57-A đã đọc README và architecture-reference, review và chấp thuận hồ sơ đã chỉnh sửa | Hồ sơ khởi động; không phải nghiệm thu tính năng |
| Khảo sát hệ thống hiện có | README.md, docs/architecture-reference.md; đối chiếu các tệp liên quan trong starter | Mô tả frontend, API, SQLite và cơ chế chấm chuỗi hiện tại |
| Xác định điểm xuất phát | Tag bkt-2026-v1 phân giải về commit 057a48205f50f0f30d6260be1a44b343a167a3e7 | Tag gốc và nhánh làm việc |
| Tạo fork và nhánh | Fork ndm2006/ktpmud-bkt-vuontoan-starter; track-b-work được tạo từ starter commit | Kho làm việc của nhóm |
| Chạy kiểm tra khởi đầu starter | Trợ lý chạy npm ci, khởi động với DB synthetic riêng; / và /exercise.html trả 200; đăng nhập demo thành công; API lessons/progress trả JSON | Smoke check starter trên Linux, Node.js 24.22.1, npm 11.9.0 |
| Soạn và cập nhật tài liệu | N57-A xác nhận nhóm 57, Track B, đăng ký hai người thành công với giảng viên, model AI và quyết định review | Hai tệp tài liệu trên nhánh track-b-work |

Các phép kiểm tra kỹ thuật được thực hiện bởi trợ lý. N57-A chấp thuận sử dụng kết quả trong hồ sơ với giới hạn đã nêu; không ghi nhận N57-A tự chạy lại các lệnh kiểm tra.

## 3. Quyết định của nhóm và lý do

**Quyết định đã được N57-A chấp thuận:**

Giữ bản tổng hợp yêu cầu, khảo sát kiến trúc và hồ sơ kickoff do AI hỗ trợ sau khi sửa theo xác nhận của N57-A; bỏ phần phân công công việc.

**Lý do:**

N57-A đã đọc README và tài liệu kiến trúc, xác nhận lựa chọn Track B, thông tin nhóm và việc đăng ký với giảng viên; chấp thuận dùng các tài liệu đã chỉnh sửa làm hồ sơ khởi động M0.

**Các sửa đổi được chấp thuận:**
- Ghi nhóm 57, alias N57, gồm hai thành viên và đã đăng ký thành công với giảng viên theo xác nhận của đại diện nhóm.
- Ghi model GPT 6.1 Sol và người chịu trách nhiệm review là N57-A.
- Ghi việc N57-A đã đọc README.md và docs/architecture-reference.md.
- Bỏ phần phân công công việc.
- Thay các trạng thái chờ xác nhận M0 đã được giải quyết bằng kết quả xác nhận cụ thể.
- Giữ rõ giới hạn smoke check và tách công việc M0 khỏi yêu cầu phát triển ở các mốc tiếp theo.

## 4. Truy vết commit tài liệu

| Commit | Nội dung |
|---|---|
| 1891bbe755d32c84abafa83e86e817ead3f49df1 | Khởi tạo docs/M0-KICKOFF.md |
| 0457f32a78a32b6571e1d6ce021edb189a1a799e | Khởi tạo AI_USE.md |
| bbfa8ebf4ca17cbf2eb3a4e601068e218ee8e2ce | Cập nhật kickoff theo xác nhận đăng ký và review của đại diện nhóm |

Lần cập nhật AI_USE.md này được truy vết bằng lịch sử commit của chính tệp trên nhánh track-b-work.

## 5. Giới hạn và nguyên tắc tiếp tục

Tại M0, AI hỗ trợ tài liệu, thao tác kho mã và kiểm tra starter; chưa triển khai tính năng ước lượng và chưa có kết quả test/CI mới cho tính năng đó.

Mỗi tác vụ AI tiếp theo phải bổ sung mục đích, tệp/module/commit liên quan, bằng chứng kiểm chứng, quyết định giữ/sửa/loại cùng lý do và mã thành viên chịu trách nhiệm. Không ghi secret hoặc dữ liệu cá nhân vào log; chỉ dùng dữ liệu synthetic trong ứng dụng.

Sự chấp thuận hồ sơ M0 không phải xác nhận sản phẩm đã đạt toàn bộ yêu cầu. Nhóm chịu trách nhiệm review và giải thích các quyết định. Không dùng AI khi viva. Agent không tự merge hoặc phát hành.

## 6. Bổ sung CP1 và chuẩn bị PC-1 — 10/11/2026

| Trường | Nội dung |
|---|---|
| Công cụ | ChatGPT/Codex (GPT-6) |
| Mục đích | Đối chiếu đề, đính chính và starter, soạn yêu cầu, tiêu chí nghiệm thu, ADR, kế hoạch test và báo cáo tiến độ dựa trên trạng thái fork. |
| Phạm vi | REQUIREMENTS.md, DECISIONS.md, TEST_PLAN.md, progress/PROGRESS.md và mục nhật ký này trên track-b-work. Commit xác định từ lịch sử nhánh. |
| Bằng chứng kiểm chứng | Đề chính thức mục 4 và 8, Issues #19/#25, mẫu PC-1 và mã nguồn tại b66ff71. Kiểm tra liên kết nội bộ, đối chiếu đủ B-01–B-12 và tính lại 12 câu trong ADR. Đây là kiểm tra hồ sơ. Các ca trong TEST_PLAN.md là kế hoạch cho tính năng. |
| Quyết định của nhóm | N57-A xác nhận CP1 chưa làm, đồng ý luồng chọn khoảng rồi nhập kết quả chính xác, tích hợp Phòng Luyện Tập, chấm và lưu hai bước trên server. N57-A chốt phân công dự kiến N57-A quy tắc/API/lưu, N57-B UI/kiểm thử luồng. Chi tiết về khoảng, API, lưu và toàn bộ bản soạn cần N57-A đọc lại để quyết định giữ, sửa hoặc loại kèm lý do. |
| Người chịu trách nhiệm | N57-A. Xác nhận thiết kế cấp luồng và phân công đã có, còn xác nhận nội dung hồ sơ cuối chờ đọc lại. |

Giữ tách biệt xác nhận của thành viên, kết quả kiểm thử và duyệt phạm vi của GV/TA.

## 7. MVP tương tác cho PC-1

| Trường | Nội dung |
|---|---|
| Công cụ | ChatGPT/Codex (GPT-6) |
| Mục đích | Triển khai và kiểm tra MVP theo thảo luận với N57-A. |
| Phạm vi | Bộ câu synthetic, bộ chấm và API hai bước, lưu SQLite, giao diện Phòng Luyện Tập, test, tài liệu và báo cáo PC-1. Xem lịch sử nhánh track-b-work. |
| Kiểm chứng | npm ci, npm test 8/8, kiểm tra DOM nối với API thật qua 12 câu. Có kiểm tra cách ly tài khoản, khôi phục, không lộ lời giải trước bước tính, hai kết quả độc lập và hồi quy phiếu cũ. Chromium headless chưa chạy được trong môi trường kiểm thử này. |
| Quyết định của nhóm | N57-A yêu cầu triển khai MVP để giảng viên trực tiếp tương tác, dựa trên bộ 12 câu, ba chặng, gợi ý tùy chọn và giải thích sau nộp. Phần triển khai và bằng chứng chờ N57-A chạy lại trên laptop và ghi quyết định giữ/sửa sau review. |
| Người chịu trách nhiệm | N57-A kiểm chứng phần AI hỗ trợ. Phân công nhóm vẫn theo PROGRESS.md. |

## Khắc phục cài đặt Windows trước PC-1

- AI hỗ trợ phân tích log Node 24/npm 12 của thành viên, kiểm tra bản dựng do better-sqlite3 phát hành và bổ sung hướng dẫn cài đặt. Repo ghi phê duyệt cài đặt riêng cho better-sqlite3@11.10.0, phiên bản đã khóa trong package-lock.json.
- Đã chạy lại 8 ca test với npm 12.2.1 và Node 24 trên Linux sau khi cài tạm better-sqlite3@12.11.1. Đã xác minh upstream phát hành tệp dựng sẵn Node 24/Windows x64 của bản này. Chờ N57-A xác nhận kết quả chạy trên Windows.

## Giao diện bài ước lượng sau khi chạy thử

- GPT 6.1 Sol hỗ trợ chỉnh giao diện bài ước lượng sau khi N57-A duyệt phương án. Dùng kiểu đánh dấu câu và hình Ong Vàng từ phiếu gốc, làm rõ hai bước làm bài và hai kết quả chấm. Khi mở bài, giao diện tạm ẩn phiếu gốc và hiện lại khi quay về phòng luyện tập.
- Phạm vi triển khai gồm khối ước lượng trong `public/exercise.html` cùng CSS và JavaScript riêng của tính năng. Bộ đề, chấm điểm, lưu tiến độ và đồng hồ phiếu gốc giữ nguyên.
- Kiểm chứng trên Linux với `npm test` (8/8) và kiểm thử DOM nối API thật qua 12 câu, gồm tải lại ở bước nhập đáp số, kết quả độc lập và quay về phiếu gốc. Chromium headless không khởi động được trong môi trường kiểm thử. N57-A phụ trách xác nhận hiển thị trên Windows.

## Bổ sung thông tin khi xem lại bài ước lượng

- GPT 6.1 Sol hỗ trợ đánh dấu câu đang xem trong danh sách và hiển thị khoảng đã chọn, khoảng đúng, số đã nhập và đáp số đúng trong hai thẻ kết quả. Giữ phần giải thích và dùng dữ liệu chấm sẵn có từ API.
- Kiểm tra JavaScript với dữ liệu API giả lập, gồm mở lại câu đã nộp từ đường dẫn, chuyển giữa các câu đã làm và trở lại câu chưa hoàn thành. N57-A phụ trách xác nhận hiển thị trên Windows.
