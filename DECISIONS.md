# Quyết định thiết kế — Track B — Nhóm N57

## ADR-001 — Khoảng chọn trước, kết quả chính xác sau

- Ngày: **10/11/2026**.
- Trạng thái: đại diện nhóm đã chốt luồng hai bước, chấm và lưu trên server, tích hợp Phòng Luyện Tập. Bản triển khai PC-1 cụ thể hóa bộ câu, gợi ý và luồng luyện tập. Phạm vi vẫn chờ phản hồi GV/TA.
- Căn cứ: [kiến trúc starter](docs/architecture-reference.md), [tiêu chí B-01–B-12](REQUIREMENTS.md).

### Bối cảnh và lựa chọn

`public/assets/js/pages/exercise.js` gửi phiếu cũ `phieu-bai-9-10` đến `POST /api/submissions`. Handler trong `server/api.js` chấm chuỗi và cập nhật `attempts`, `progress`, sao. Handler cũng trả đáp án khi nộp. Dạng mới cần hai lần nộp, trạng thái giữa hai lần và ranh giới lộ đáp án khác.

| Phương án | Đánh đổi |
|---|---|
| Nhập số ước lượng rồi chấm bằng ngưỡng sai số | Cần giải thích ngưỡng cho từng miền kết quả, dễ gây khó hiểu với đáp số nhỏ. |
| Chọn khoảng cố định, lưu trên server, rồi nhập đáp số | Ranh giới rõ cho học sinh, test được hai đầu mút và tách hai kỹ năng. Cần lưu trạng thái và chống nộp sai thứ tự. **Chọn.** |

Phương án tích hợp là một mục trong `public/exercise.html`, điều khiển bằng JS của trang hoặc module riêng được trang tải. Fixture và route dạng mới tách khỏi bộ câu hỏi cũ. Cách này tránh đưa đáp án mới qua hợp đồng trả đáp án của `/api/submissions`, tránh sửa loại câu hỏi cũ và giữ nguyên quy tắc sao/mở khóa. Hệ quả: kết quả được xem trong phần ước lượng, chưa xuất hiện trên bảng xếp hạng.

### Quy tắc tạo và chấm

- Dùng 12 phép tính synthetic cố định, 6 nhân và 6 chia hết. Hai câu bảng 6 làm quen thao tác, 10 câu tiếp theo cho phép ước lượng bằng mốc dễ nhẩm trước khi đặt tính. Phiên bản đầu cố định ID và thứ tự để kiểm thử, trình diễn và khôi phục tiến độ tái lập được.
- Mỗi câu có ba khoảng riêng, bao gồm cả hai đầu mút. Chọn mốc thấp và cao dễ tính sao cho mọi kết quả nguyên nằm giữa hai mốc sau phép toán đều thuộc duy nhất một khoảng. Phép nhân ưu tiên mốc tròn chục, phép chia dùng số chia hết dễ nhẩm.
- Ước lượng đúng khi khoảng đã chọn chứa đáp số. Tính chính xác đúng khi số đã nhập bằng đáp số. Hai kết quả độc lập. Tổng kết đếm riêng số ước lượng hợp lý và số tính đúng trên 12.
- Bước tính chấp nhận số nguyên JSON trong 1–999 với phép nhân hoặc 1–99 với phép chia. Miền nhập rộng hơn miền đáp án để các sai sót thường gặp vẫn được chấm và giải thích. ID khoảng lạ, số lẻ và số ngoài miền trả lỗi để sửa.
- Chia ba chặng, mỗi chặng bốn câu. Hai câu đầu có hướng dẫn chung, mọi câu có gợi ý tùy chọn ở bước ước lượng. Giải thích cụ thể cách tính hai mốc chỉ trả sau khi nộp đáp số và tự mở khi ước lượng sai. Không trừ lượt hay giới hạn thời gian.

| ID | Chặng | Phép tính | Mốc trước khi tính | Đáp số | Khoảng đúng |
|---|---:|---|---|---:|---|
| est-01 | 1 | 6 × 7 | 5 và 10, nhân với 6 | 42 | 31–59 |
| est-02 | 1 | 42 ÷ 6 | 30 và 60 | 7 | 6–9 |
| est-03 | 1 | 23 × 4 | 20 và 30 | 92 | 80–119 |
| est-04 | 1 | 56 ÷ 4 | 40 và 80 | 14 | 10–19 |
| est-05 | 2 | 37 × 3 | 30 và 40 | 111 | 90–119 |
| est-06 | 2 | 48 × 6 | 40 và 50 | 288 | 240–299 |
| est-07 | 2 | 78 ÷ 3 | 60 và 90 | 26 | 20–29 |
| est-08 | 2 | 72 ÷ 2 | 60 và 80 | 36 | 30–39 |
| est-09 | 3 | 64 × 5 | 60 và 70 | 320 | 300–349 |
| est-10 | 3 | 76 × 4 | 70 và 80 | 304 | 280–319 |
| est-11 | 3 | 65 ÷ 5 | 50 và 100 | 13 | 10–19 |
| est-12 | 3 | 96 ÷ 3 | 90 và 120 | 32 | 30–39 |

Dữ liệu chạy nằm trong [server/estimation-questions.js](server/estimation-questions.js). Việc hai mốc xác định đúng một khoảng được kiểm thử bằng số nguyên. Độ khó giữa các chặng là giả thuyết thiết kế, chưa có dữ liệu thử với học sinh.

### Hợp đồng API và lưu trạng thái

Các route dưới dùng `requireAuth` hiện có, lấy chủ sở hữu từ `req.user.id`. Chỉ chấp nhận ID câu và khoảng có trong fixture. Đường dẫn tính từ gốc `/api`.

| Route | Đầu vào | Kết quả |
|---|---|---|
| `GET /estimation-practice` | Phiên hiện tại | Danh sách câu, chặng, khoảng để chọn, gợi ý nhẹ và trạng thái riêng của tài khoản. Câu chưa hoàn thành chỉ có trạng thái và lựa chọn đã lưu nếu có. |
| `POST /estimation-practice/:questionId/estimate` | `{ rangeId }` | Lưu khoảng, trả trạng thái mở bước tính. Không trả dữ liệu chấm. |
| `POST /estimation-practice/:questionId/exact` | `{ answer }` | Chỉ ghi sau khi có ước lượng, trả hai cờ đúng/sai, đáp số và giải thích mốc sau khi lưu thành công. |

Thêm bảng `estimation_answers` bằng migration tạo bảng nếu chưa có. Khóa `(user_id, question_id)`, lưu mã khoảng, đáp số đã nhập, hai cờ chấm và thời điểm hoàn thành. Trạng thái suy ra từ bản ghi: chưa có hàng → chọn khoảng, có khoảng nhưng chưa có đáp số → nhập chính xác, có đáp số → đã chấm. Ràng buộc khóa và cập nhật có điều kiện trong transaction ngăn ghi đè khi gửi đồng thời. Gửi lại cùng giá trị trả cùng trạng thái, gửi giá trị khác sau khi đã lưu trả lỗi xung đột. Khi nhập sai định dạng, giữ trạng thái để học sinh sửa. GET trả phản hồi đã chấm chỉ cho tài khoản sở hữu và chỉ sau khi bước cuối đã lưu.

Trong giao diện, các câu được trình bày theo thứ tự fixture. Học sinh có thể nghỉ, mở lại bài và xem các câu đã nộp. Server buộc thứ tự **hai bước trong từng câu**. UI hiển thị lỗi bằng thông báo có thể đọc bằng công nghệ hỗ trợ và focus chuyển tới ô nhập sau bước chọn khoảng. Nút, radio và input dùng hành vi bàn phím chuẩn.

### Hệ quả và giới hạn

- Bài có một lượt đã lưu cho mỗi tài khoản. Chế độ làm lại, lịch sử nhiều lượt, bảng xếp hạng và bổ sung nội dung SGK nằm ngoài lát cắt này.
- Cấu hình fixture giữ ổn định ID, thứ tự và nghĩa trong thời gian của bài. Nếu thay câu về sau, dùng ID mới để tránh đọc sai kết quả cũ.
- Lưu tách bảng bảo toàn `attempts`, `progress` và sao của phiếu cũ. Phải kiểm tra chạy với DB mới và DB starter đã tồn tại.
- Không dùng LLM lúc sinh/chấm đáp án runtime. Test theo [kế hoạch kiểm thử](TEST_PLAN.md).
