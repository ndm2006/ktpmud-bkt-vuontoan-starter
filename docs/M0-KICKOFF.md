# M0 — Kickoff — Nhóm 57

Ngày kickoff: **04/11/2026**. Track duy nhất: **B — Vườn Toán Lớp 3: Ước lượng trước khi tính đúng**.

## 1. Thông tin nhóm và xác nhận đăng ký

- Mã nhóm: **57**. Alias: **N57**. Mã lớp: **173820**.
- Nhóm gồm **hai thành viên**, sử dụng mã **N57-A** và **N57-B** trong hồ sơ công khai. Ánh xạ tên và MSSV được giữ trong hồ sơ riêng của nhóm.
- Nhóm hai thành viên đã đăng ký với giảng viên và chọn **Track B**.
- Chủ fork: **ndm2006**.
- Người chịu trách nhiệm kiểm chứng và chấp thuận phần AI hỗ trợ: **N57-A**.
- N57-A xác nhận đã đọc **README.md** và **docs/architecture-reference.md**.

## 2. Đề và điểm xuất phát

- Đề chính thức: https://fossbk-spec.github.io/ktpmud-book/exams/KTPMUD_Hack_Marathon_2026_De_Thi_Chinh_Thuc_v1.0.0_20261103.html
- Phiên bản nội dung đã đọc: **v1.0.2**.
- Starter: https://github.com/fossbk-spec/ktpmud-bkt-vuontoan-starter
- Fork: https://github.com/ndm2006/ktpmud-bkt-vuontoan-starter
- Tag gốc: **bkt-2026-v1**.
- Starter commit: **057a48205f50f0f30d6260be1a44b343a167a3e7**.
- Nhánh làm việc: **track-b-work**, được tạo trực tiếp từ starter commit.
- Tài liệu nền: README.md và docs/architecture-reference.md tại tag gốc.

Tag gốc xác định phiên bản xuất phát. Các commit tài liệu của nhóm được thêm trên nhánh làm việc, nên HEAD sau kickoff khác starter commit.

## 3. Kết quả đọc hiểu và phạm vi Track B

Nhóm mở rộng một dạng bài nhân/chia trong luồng học hiện có: người học nộp ước lượng hoặc khoảng hợp lý trước khi chuyển sang bước tính chính xác. Server chấm bằng quy tắc tất định, lưu kết quả và hiển thị phản hồi riêng cho ước lượng và kết quả chính xác.

Kiến trúc hiện có:
- Frontend HTML/CSS/JavaScript gọi JSON API của Express.
- SQLite lưu câu hỏi, lượt nộp và tiến độ.
- API lấy câu hỏi không trả đáp án đúng.
- Luồng nộp bài hiện tại so sánh chuỗi đáp án chính xác; hệ thống chưa có cơ chế chấm khoảng ước lượng. Phần mở rộng phải được phân tích cả ở UI, API và dữ liệu.

Giới hạn thực hiện:
- Chỉ mở rộng dạng bài được giao và giữ hành vi bốn loại câu hỏi cũ.
- Không sửa auth/session, tài khoản mẫu, deployment hoặc route auth/teacher/admin.
- Chỉ dùng dữ liệu synthetic, không kết nối production và không commit secret hoặc .env.
- Không dùng LLM làm nguồn đáp án khi ứng dụng chạy.
- Ghi nhận AI hỗ trợ trong AI_USE.md; thành viên kiểm chứng và chịu trách nhiệm. Không dùng AI khi viva; agent không tự merge, phát hành hoặc tự chấp thuận kết quả.

Định hướng đánh giá: ưu tiên phân tích yêu cầu và thiết kế có lý do; MVP chạy được, test tự động và CI vẫn là các yêu cầu của kỳ thi.

## 4. Đối chiếu công việc M0

| Công việc | Kết quả | Bằng chứng |
|---|---|---|
| Đọc đề, tập trung Mục 0, 5 và 8 | Đã khảo sát và tổng hợp | Phạm vi, kiến trúc và giới hạn ghi tại Mục 3 |
| Chốt nhóm và chọn đúng một track | Hoàn thành theo xác nhận đại diện nhóm | Nhóm 57, hai thành viên, Track B |
| Đăng ký alias/mã nhóm với giảng viên | Hoàn thành theo xác nhận đại diện nhóm | Nhóm hai thành viên đã đăng ký với giảng viên |
| Fork đúng starter | Hoàn thành | Fork ndm2006/ktpmud-bkt-vuontoan-starter có nguồn từ starter chính thức |
| Nhận và sử dụng tag đã pin | Hoàn thành | bkt-2026-v1 phân giải về starter commit ở Mục 2; nhánh làm việc tạo từ commit đó |
| Bắt đầu từ README và tài liệu kiến trúc | Hoàn thành phần đọc tài liệu kickoff | N57-A xác nhận đã đọc cả hai tài liệu |
| Review hồ sơ kickoff và nhật ký AI | Hoàn thành theo xác nhận N57-A | Quyết định giữ/sửa và lý do được ghi trong AI_USE.md |

Bảng này xác nhận các đầu việc kickoff theo bằng chứng kỹ thuật và xác nhận của đại diện nhóm. Nghiệm thu tính năng và chấm điểm thực hiện ở các mốc tiếp theo của kỳ thi.

## 5. Kiểm tra kỹ thuật starter đã thực hiện

Nhóm dùng kết quả kiểm tra khởi đầu có AI hỗ trợ trên Linux, Node.js **24.22.1**, npm **11.9.0**, dùng cơ sở dữ liệu synthetic riêng:
- Clone đúng tag bkt-2026-v1.
- Chạy npm ci thành công.
- Khởi động starter.
- Trang / và /exercise.html trả HTTP 200.
- Đăng nhập bằng tài khoản demo thành công.
- API /api/lessons và /api/me/progress trả JSON.

Đây là kiểm tra khởi động và API cơ bản của starter. Chưa triển khai dạng bài ước lượng, chưa kiểm thử scoring mới và chưa bổ sung npm test hoặc CI. Đại diện nhóm đã đọc tài liệu; không ghi nhận thành viên tự chạy lại các phép kiểm tra nếu chưa có bằng chứng.

## 6. Hồ sơ được chấp thuận

- **docs/M0-KICKOFF.md**: thông tin nhóm, lựa chọn Track B, điểm xuất phát, phạm vi và kết quả M0.
- **AI_USE.md**: công cụ/model, mục đích, phạm vi, bằng chứng kiểm chứng, quyết định và người chịu trách nhiệm.

N57-A chấp thuận giữ bản tổng hợp yêu cầu, khảo sát kiến trúc và hồ sơ kickoff do AI hỗ trợ sau khi sửa theo xác nhận của mình; bỏ phần phân công công việc. Chi tiết lý do ghi trong AI_USE.md.

## 7. Mốc kế tiếp

| Mốc | Hạn | Đầu ra |
|---|---|---|
| M1 — Understand / Checkpoint 1 | Cuối 08/11/2026 | REQUIREMENTS.md, acceptance criteria, kế hoạch test và ADR đầu tiên; TA duyệt scope |
| M2 — Build / Checkpoint 2 | Cuối 15/11/2026 | Luồng chức năng mới chạy xuyên suốt, public tests đạt, demo nội bộ 5 phút |
| M3 — Harden | 16–19/11/2026 | Test, CI, kiểm tra security/privacy và tài liệu bàn giao |
| Freeze | 23:59 19/11/2026 | Chốt commit và tag/release candidate |
| Nộp bài | 20/11/2026 | Pull Request nộp bài, CI xanh |
| Demo/Viva | 21/11/2026 | Demo tối đa 7 phút, viva tối đa 8 phút |

Tối thiểu 12 câu synthetic, quy tắc chấm, lưu trạng thái hai bước, test và CI là yêu cầu phát triển của Track B; không phải sản phẩm phải hoàn thành trong M0.
