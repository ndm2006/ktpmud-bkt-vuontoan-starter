# Yêu cầu hiện hành — N57 / Track B

Theo ADR-002; hồ sơ PC-1 giữ trong Git và phần PC-1 của progress/PROGRESS.md. Nguồn: đề chính thức mục 8.3 và docs/architecture-reference.md.

## Scope

Type estimate trong luồng hiện có: Phòng Luyện Tập → lesson.html → API question-sets → lưu cả 12 ước lượng → submissions → attempts/progress/sao. Giữ 12 câu trên fork, gắn bài ôn nhân/chia 41, mở luyện tập tự do. Chọn khoảng cố định bao gồm hai đầu mút; cả hai bước đúng mới đạt 1 điểm/câu. Giữ hoàn thành 50%, sao theo tiến bộ cấp bài học. Không AI runtime, không sửa auth/session/tài khoản mẫu/deployment hoặc route giáo viên/admin.

## Traceability

| AC | Điều kiện nghiệm thu bản hiện hành | Bằng chứng |
|---|---|---|
| B-01 | Menu Phòng Luyện Tập dẫn đến lesson.html, API câu hỏi và submissions hiện hữu | E01 |
| B-02 | 12 câu/ID cố định, 6 nhân/6 chia hết; oracle độc lập | U01 |
| B-03 | Khoảng chứa đáp án, tất định, cả hai bước đúng mới đạt điểm | U01–U03; ADR-002 |
| B-04 | Trước nộp không trả đáp án, khoảng đúng hoặc cờ chấm trong đề/lưu/khôi phục | I01; publicQuestion allowlist |
| B-05 | Khóa ước lượng trước bước chính xác; lưu điểm/tiến độ/sao; refresh/restart phục hồi phần đã lưu | I03–I07; E01–E02 |
| B-06 | Phản hồi riêng ước lượng và tính đúng ở bốn tổ hợp | U03; E03 |
| B-07 | Không đổi auth, tài khoản mẫu, deployment, route auth/teacher/admin; bài cũ giữ hành vi | Diff phạm vi; I10 |
| B-08 | Test normal/boundary/invalid/scoring, thứ tự, ownership, concurrency, rollback | npm test |
| B-09 | npm ci + npm test từ source sạch, DB test tự tạo riêng | TEST_REPORT |
| B-10 | Workflow PR chạy npm ci, npm test, E2E; run đúng SHA | track-b.yml |
| B-11 | Synthetic/alias, không commit DB hoặc secret | Checklist; AI_USE |
| B-12 | Radio/input/button native, focus, label và lỗi; hoàn thành bằng bàn phím | E01–E03 |

## Contract nghiệp vụ

- Chọn đủ 12 khoảng mới lưu. Khoảng sai vẫn mở bước tính; chưa trả feedback ở bước khóa.
- Phần chính xác cho phép bỏ trống (tính sai); từ chối null/boolean/array/object/thập phân/âm/ngoài 0–999. Chuỗi số nguyên được trim và bỏ số 0 đầu. UI xác nhận trước khi nộp còn câu trống.
- Retry cùng requestId/cùng khoảng trả cùng lượt; thay khoảng với cùng key hoặc tạo thêm khi còn lượt đang làm trả 409.
- Nộp lại lượt đã chấm trả kết quả cũ, không cập nhật đáp số hoặc tăng attempt/sao.
- Refresh chỉ phục hồi phần đã lưu. Đáp số đang gõ chưa nộp không tự lưu; UI thông báo.
- Chỉ chủ lượt được đọc/nộp. Nội dung thay đổi giữa lượt trả 409, không ghi điểm; kết quả hoàn tất xem từ snapshot.
- Dữ liệu PC-1 giữ lại, không tự quy đổi thành điểm hai giai đoạn mới.
- Câu 6 chỉ có biểu thức `48 × 6`, đồng bộ với 11 câu khác theo yêu cầu đại diện nhóm. Migration thuần nhãn giữ ước lượng chưa nộp; kết quả cũ giữ lịch sử.
- N57 có hai thành viên theo ngoại lệ được GV chấp thuận, căn cứ xác nhận đại diện nhóm trong chat; không tự tạo thành viên để đủ quy mô khuyến nghị.
