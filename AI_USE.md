# Nhật ký sử dụng AI — Track B — N57

Nhóm ghi lại cách chúng mình sử dụng AI trong quá trình làm Track B. N57-A đề xuất ý tưởng, cùng phát triển MVP với AI hỗ trợ, kiểm tra sản phẩm và chịu trách nhiệm bàn giao. N57-B kiểm thử và đồng ý chốt bố trí giao diện.

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
| Chạy kiểm tra khởi đầu starter | Kiểm tra có AI hỗ trợ bằng npm ci và DB synthetic riêng; / và /exercise.html trả 200; đăng nhập demo thành công; API lessons/progress trả JSON | Smoke check starter trên Linux, Node.js 24.22.1, npm 11.9.0 |
| Soạn và cập nhật tài liệu | N57-A xác nhận nhóm 57, Track B, đăng ký hai người thành công với giảng viên, model AI và quyết định review | Hai tệp tài liệu trên nhánh track-b-work |

Ở M0, nhóm dùng AI hỗ trợ chạy các kiểm tra khởi động ở trên. N57-A đối chiếu kết quả với phạm vi M0 và dùng chúng làm bằng chứng cho starter.

## 3. Quyết định của nhóm và lý do

**Quyết định đã được N57-A chấp thuận:**

Nhóm giữ bản tổng hợp yêu cầu, khảo sát kiến trúc và hồ sơ kickoff sau khi N57-A đọc và chỉnh nội dung cùng AI. Phân công được ghi ở mốc lập kế hoạch CP1.

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

Sự chấp thuận hồ sơ M0 không phải xác nhận sản phẩm đã đạt toàn bộ yêu cầu. Nhóm kiểm tra kết quả, quyết định nội dung bàn giao và tự giải thích các lựa chọn khi vấn đáp.

## 6. Bổ sung CP1 và chuẩn bị PC-1 — 10/11/2026

| Trường | Nội dung |
|---|---|
| Công cụ | ChatGPT/Codex (GPT-6) |
| Mục đích | Đối chiếu đề, đính chính và starter, soạn yêu cầu, tiêu chí nghiệm thu, ADR, kế hoạch test và báo cáo tiến độ dựa trên trạng thái fork. |
| Phạm vi | REQUIREMENTS.md, DECISIONS.md, TEST_PLAN.md, progress/PROGRESS.md và mục nhật ký này trên track-b-work. Commit xác định từ lịch sử nhánh. |
| Bằng chứng kiểm chứng | Đề chính thức mục 4 và 8, Issues #19/#25, mẫu PC-1 và mã nguồn tại b66ff71. Kiểm tra liên kết nội bộ, đối chiếu đủ B-01–B-12 và tính lại 12 câu trong ADR. Đây là kiểm tra hồ sơ. Các ca trong TEST_PLAN.md là kế hoạch cho tính năng. |
| Quyết định của nhóm | N57-A đề xuất đưa bài ước lượng vào Phòng Luyện Tập, cho học sinh chọn khoảng rồi mới tính, và lưu từng bước trên server. Nhóm dùng AI để rà phương án và hoàn thiện hồ sơ CP1. |
| Người chịu trách nhiệm | N57-A kiểm tra thiết kế, MVP và hồ sơ bàn giao. |

Giữ tách biệt xác nhận của thành viên, kết quả kiểm thử và duyệt phạm vi của GV/TA.

## 7. MVP tương tác cho PC-1

| Trường | Nội dung |
|---|---|
| Công cụ | ChatGPT/Codex (GPT-6) |
| Mục đích | N57-A cùng phát triển MVP từ ý tưởng của nhóm. AI hỗ trợ hiện thực từng phần, chạy kiểm thử và đối chiếu kết quả. |
| Phạm vi | Bộ câu synthetic, bộ chấm và API hai bước, lưu SQLite, giao diện Phòng Luyện Tập, test, tài liệu và báo cáo PC-1. Xem lịch sử nhánh track-b-work. |
| Kiểm chứng | npm ci, npm test 8/8, kiểm tra DOM nối với API thật qua 12 câu. Có kiểm tra cách ly tài khoản, khôi phục, không lộ lời giải trước bước tính, hai kết quả độc lập và hồi quy phiếu cũ. Chromium headless chưa chạy được trong môi trường kiểm thử này. |
| Quyết định của nhóm | Nhóm chốt bộ 12 câu, ba chặng, gợi ý tùy chọn và giải thích sau khi nộp để giảng viên có thể thử trực tiếp. N57-A đã kiểm tra MVP và hồ sơ tại `5abd6d3`. N57-B đã kiểm thử và đồng ý chốt bố trí giao diện tại `0bc0176`. |
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

## Hồ sơ trình bày và nộp Track B — 11/11/2026

| Trường | Nội dung |
|---|---|
| Công cụ và mục đích | Nhóm dùng ChatGPT/Codex hỗ trợ đối chiếu đề và diễn đạt lại hồ sơ theo các quyết định, kết quả kiểm thử và phân công của nhóm. |
| Phạm vi | Kịch bản demo, bảng tiến độ, báo cáo test, bảo mật, đóng góp, README, hướng dẫn nộp và cấu hình CI. Mốc giao diện được đối chiếu là `0bc0176`. |
| Kiểm chứng | Đối chiếu mã và lịch sử Git, chạy lại bộ test MVP, đối chiếu mục 6, 8, 11, 12 và mẫu nộp Track B. Bằng chứng và giới hạn nằm trong [TEST_REPORT.md](TEST_REPORT.md). |
| Quyết định của nhóm | Nhóm dùng MVP đã kiểm tra làm căn cứ bàn giao và bổ sung bằng chứng theo hướng dẫn của môn học. |
| Người chịu trách nhiệm | N57-A lên ý tưởng, kiểm chứng phần AI hỗ trợ và chịu trách nhiệm về bản bàn giao. Xem [CONTRIBUTIONS.md](CONTRIBUTIONS.md). |
