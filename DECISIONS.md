# Quyết định thiết kế — Track B — Nhóm N57

## ADR-001 — Khoảng chọn trước, kết quả chính xác sau

- Ngày: **10/11/2026**.
- Trạng thái: đại diện nhóm đã chốt luồng hai bước, chấm và lưu trên server, tích hợp Phòng Luyện Tập. Chi tiết triển khai dưới đây là phương án kỹ thuật cho CP1, chờ nhóm kiểm chứng trong M2.
- Căn cứ: [kiến trúc starter](docs/architecture-reference.md), [tiêu chí B-01–B-12](REQUIREMENTS.md).

### Bối cảnh và lựa chọn

`public/assets/js/pages/exercise.js` gửi phiếu cũ `phieu-bai-9-10` đến `POST /api/submissions`. Handler trong `server/api.js` chấm chuỗi và cập nhật `attempts`, `progress`, sao. Handler cũng trả đáp án khi nộp. Dạng mới cần hai lần nộp, trạng thái giữa hai lần và ranh giới lộ đáp án khác.

| Phương án | Đánh đổi |
|---|---|
| Nhập số ước lượng rồi chấm bằng ngưỡng sai số | Cần giải thích ngưỡng cho từng miền kết quả, dễ gây khó hiểu với đáp số nhỏ. |
| Chọn khoảng cố định, lưu trên server, rồi nhập đáp số | Ranh giới rõ cho học sinh, test được hai đầu mút và tách hai kỹ năng. Cần lưu trạng thái và chống nộp sai thứ tự. **Chọn.** |

Phương án tích hợp là một mục trong `public/exercise.html`, điều khiển bằng JS của trang hoặc module riêng được trang tải. Fixture và route dạng mới tách khỏi bộ câu hỏi cũ. Cách này tránh đưa đáp án mới qua hợp đồng trả đáp án của `/api/submissions`, tránh sửa loại câu hỏi cũ và giữ nguyên quy tắc sao/mở khóa. Hệ quả: kết quả được xem trong phần ước lượng, chưa xuất hiện trên bảng xếp hạng.

### Quy tắc tạo và chấm

- Dùng bộ phép tính cố định thuộc bảng 6, theo hai bài đã có trong starter. Fixture chỉ chứa ID, phép toán và toán hạng. Tính đáp số bằng phép toán số nguyên ở server. Phép chia luôn chia hết.
- Phép nhân dùng các khoảng **1–20**, **21–40**, **41–60**. Phép chia dùng **1–3**, **4–7**, **8–10**. Hiển thị cả ba khoảng theo thứ tự tăng dần. Vị trí đúng thay đổi theo câu. Ranh giới đều bao gồm hai đầu. Ví dụ `42 ÷ 6 = 7` nằm trong `4–7`, còn `48 ÷ 6 = 8` nằm trong `8–10`.
- Ước lượng đúng khi khoảng được chọn chứa đáp số. Kết quả chính xác đúng khi số đã nhập bằng đáp số. Mỗi câu có hai cờ độc lập. Tổng kết đếm số ước lượng hợp lý và số phép tính đúng riêng, mỗi số trên 12.
- Bước tính chấp nhận số nguyên trong 1–60 với phép nhân hoặc 1–10 với phép chia. UI chuyển chuỗi chữ số sau khi trim thành số. API yêu cầu số nguyên JSON và từ chối kiểu sai, thiếu giá trị, số thập phân hoặc ngoài miền. Chọn sai khoảng hợp lệ là kết quả chấm, còn ID khoảng không tồn tại là lỗi đầu vào.

| ID | Phép tính | Đáp số | Khoảng đúng |
|---|---|---:|---|
| m01 | 6 × 2 | 12 | 1–20 |
| m02 | 6 × 3 | 18 | 1–20 |
| m03 | 6 × 4 | 24 | 21–40 |
| m04 | 6 × 6 | 36 | 21–40 |
| m05 | 6 × 7 | 42 | 41–60 |
| m06 | 6 × 9 | 54 | 41–60 |
| d01 | 12 ÷ 6 | 2 | 1–3 |
| d02 | 18 ÷ 6 | 3 | 1–3 |
| d03 | 24 ÷ 6 | 4 | 4–7 |
| d04 | 42 ÷ 6 | 7 | 4–7 |
| d05 | 48 ÷ 6 | 8 | 8–10 |
| d06 | 60 ÷ 6 | 10 | 8–10 |

Bảng trên là đặc tả và dữ liệu chuẩn để nhóm kiểm chứng, nằm ngoài thư mục tài nguyên do ứng dụng phục vụ. Fixture chạy thực tế sẽ nằm phía server.

### Hợp đồng API và lưu trạng thái dự kiến

Các route dưới dùng `requireAuth` hiện có, lấy chủ sở hữu từ `req.user.id`. Chỉ chấp nhận ID câu và khoảng có trong fixture. Đường dẫn tính từ gốc `/api`.

| Route | Đầu vào | Kết quả |
|---|---|---|
| `GET /estimation-practice` | Phiên hiện tại | Danh sách câu theo thứ tự, khoảng để chọn và trạng thái riêng của tài khoản. Câu chưa hoàn thành chỉ có trạng thái và lựa chọn đã lưu nếu có. |
| `POST /estimation-practice/:questionId/estimate` | `{ rangeId }` | Lưu khoảng, trả trạng thái mở bước tính. Không trả dữ liệu chấm. |
| `POST /estimation-practice/:questionId/exact` | `{ answer }` | Chỉ ghi sau khi có ước lượng, trả hai cờ đúng/sai và đáp số sau khi lưu thành công. |

Thêm bảng `estimation_answers` bằng migration tạo bảng nếu chưa có. Khóa `(user_id, question_id)`, lưu mã khoảng, đáp số đã nhập, hai cờ chấm và thời điểm hoàn thành. Trạng thái suy ra từ bản ghi: chưa có hàng → chọn khoảng, có khoảng nhưng chưa có đáp số → nhập chính xác, có đáp số → đã chấm. Ràng buộc khóa và cập nhật có điều kiện trong transaction ngăn ghi đè khi gửi đồng thời. Gửi lại cùng giá trị trả cùng trạng thái, gửi giá trị khác sau khi đã lưu trả lỗi xung đột. Khi nhập sai định dạng, giữ trạng thái để học sinh sửa. GET trả phản hồi đã chấm chỉ cho tài khoản sở hữu và chỉ sau khi bước cuối đã lưu.

Trong giao diện, các câu được trình bày theo thứ tự fixture. Server buộc thứ tự **hai bước trong từng câu**. UI hiển thị lỗi bằng thông báo có thể đọc bằng công nghệ hỗ trợ và focus chuyển tới ô nhập sau bước chọn khoảng. Nút, radio và input dùng hành vi bàn phím chuẩn.

### Hệ quả và giới hạn

- Bài có một lượt đã lưu cho mỗi tài khoản. Chế độ làm lại, lịch sử nhiều lượt, bảng xếp hạng và bổ sung nội dung SGK nằm ngoài lát cắt này.
- Cấu hình fixture giữ ổn định ID, thứ tự và nghĩa trong thời gian của bài. Nếu thay câu về sau, dùng ID mới để tránh đọc sai kết quả cũ.
- Lưu tách bảng bảo toàn `attempts`, `progress` và sao của phiếu cũ. Phải kiểm tra chạy với DB mới và DB starter đã tồn tại.
- Không dùng LLM lúc sinh/chấm đáp án runtime. Test theo [kế hoạch kiểm thử](TEST_PLAN.md).
