# M0 — Kickoff — Nhóm 57

Ngày: 04/11/2026. Track duy nhất: B — Vườn Toán Lớp 3: Ước lượng trước khi tính đúng.

## Nguồn gốc

- Starter: https://github.com/fossbk-spec/ktpmud-bkt-vuontoan-starter
- Fork: https://github.com/ndm2006/ktpmud-bkt-vuontoan-starter
- Tag gốc: `bkt-2026-v1`.
- Starter commit: `057a48205f50f0f30d6260be1a44b343a167a3e7`.
- Nhánh phát triển: `track-b-work`, tạo trực tiếp từ starter commit.
- Tài liệu đã khảo sát: README.md, docs/architecture-reference.md và đề chính thức (Mục 0, 5, 8).

## Phạm vi

Mở rộng một dạng bài nhân/chia trong luồng hiện có: nộp ước lượng trước, tính chính xác sau. Server chấm tất định và lưu trạng thái. Không dùng LLM làm nguồn đáp án runtime. Không viết lại hệ thống.

Giữ hành vi bốn type cũ. Không sửa auth/session, tài khoản mẫu, deployment hoặc route auth/teacher/admin. Chỉ dùng dữ liệu synthetic; không kết nối production; không commit secret hoặc .env.

## Nhóm và trạng thái

- Mã nhóm từ báo cáo học phần: 57. Alias làm việc: N57.
- Hai mã thành viên dùng trong hồ sơ công khai: N57-A, N57-B. Ánh xạ tên/MSSV giữ riêng, không đưa lên repo.
- Chưa có xác nhận chính thức việc nhóm hai người hợp lệ: thông báo lớp ghi tối đa 3, trang đề v1.0.2 ghi 3–5. Cần giảng viên/TA làm rõ.
- Chưa xác nhận đã đăng ký alias qua kênh lớp; tài liệu này không phải bằng chứng đăng ký được chấp thuận.
- Phân công đề xuất để review: N57-A phân tích yêu cầu, quy tắc chấm, API/DB; N57-B frontend, tích hợp, accessibility/QA; review chéo và cùng chịu trách nhiệm hiểu hệ thống. Chưa ghi nhận đóng góp triển khai cá nhân khi chưa có bằng chứng.

## Kế hoạch M1 (05–08/11)

1. REQUIREMENTS.md: scope và acceptance criteria truy vết B-01–B-12.
2. Kế hoạch test normal/boundary/invalid/scoring, kiểm tra không lộ đáp án và hồi quy type cũ.
3. ADR đầu tiên: biểu diễn ước lượng, quy tắc chấm, lưu hai bước, cách tích hợp API/DB/UI. Các lựa chọn chưa chốt.
4. Tối thiểu 12 câu synthetic tái lập được; xác định policy điểm/sao và nộp lại.

Checkpoint 1: cuối 08/11; Checkpoint 2: cuối 15/11; freeze 23:59 19/11; nộp 20/11; demo/viva 21/11.

## Bằng chứng kỹ thuật khởi đầu

Trợ lý đã clone tag, chạy npm ci và khởi động starter trên Linux / Node 24.22.1 / npm 11.9.0 với DB synthetic riêng. Trang / và /exercise.html trả 200; đăng nhập demo và API lessons/progress hoạt động. Đây chỉ là smoke check starter, chưa chứng minh tính năng mới, chưa có test/CI bổ sung.

Tài liệu do AI hỗ trợ soạn; CHỜ thành viên review. Không tự merge, phát hành hoặc xác nhận sản phẩm đã đạt yêu cầu.
