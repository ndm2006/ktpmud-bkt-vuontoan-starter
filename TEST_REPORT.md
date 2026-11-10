# Báo cáo kiểm thử — Track B — N57

**MVP đối chiếu:** giao diện tại `0bc0176` trên nhánh `track-b-work`. **Phạm vi:** ước lượng, tính chính xác, khôi phục tiến độ và hồi quy phiếu Bài 9–10. Xem [kế hoạch T01–T14](TEST_PLAN.md) và [tiêu chí B-01–B-12](REQUIREMENTS.md).

## Kết quả có bằng chứng

| Kiểm tra | Môi trường và cách tái hiện | Kết quả |
|---|---|---|
| Bộ kiểm thử MVP | Windows build 19045, Node.js 24.22.1, npm 12.2.1, SQLite đã cài trong workspace. Chạy `node --test test/estimation-practice.test.js`. Mỗi lượt tạo DB synthetic tạm. | **8/8 đạt**. |
| Checkout sạch | Windows x64 build 19045, Node.js 22.23.4, npm 10.9.9, bản xuất Git tại `0408e96`. Chạy `npm ci` rồi `npm test`. | Cài thành công từ lockfile, **8/8 đạt**. `npm audit` ghi nhận hai cảnh báo, xem [checklist](SECURITY_PRIVACY_CHECKLIST.md). |
| Luồng học sinh | Trình duyệt tích hợp, localhost, tài khoản học sinh mẫu. Xem [kịch bản](docs/PC1-DEMO.md). | Từ Phòng Luyện Tập mở được hai hoạt động; lưu khoảng, mở gợi ý, tính đúng và đọc giải thích. Đổi qua lại giữ được khoảng đã lưu và lựa chọn trên phiếu trong cùng trang. |
| Bàn phím, T10 | Trình duyệt tích hợp, câu `48 × 6`. Dùng Tab, phím mũi tên và Enter, nhập `a` rồi sửa thành `288`. | Chọn được khoảng 240–299. Focus chuyển đến ô đáp số. Giao diện báo lỗi dễ hiểu, sau đó chấm đúng cả hai bước và chuyển focus đến tiêu đề kết quả. |
| CI trên PR | [Workflow Track B](.github/workflows/track-b.yml) dùng Ubuntu và Node.js 22, chạy `npm ci` rồi `npm test`. | Đã có cấu hình. Chờ run trên PR nội bộ của fork để xác nhận B-10 và ghi URL. |

## Đối chiếu các ca tự động

| Ca trong [bộ test](test/estimation-practice.test.js) | Bằng chứng |
|---|---|
| Bộ câu và hai mốc | 12 câu cố định, 6 nhân và 6 chia hết; mọi số nguyên giữa hai mốc sau phép tính cùng thuộc một khoảng. |
| Tải bài | Có ba chặng và kiểm tra xác thực; dữ liệu trước khi nộp không chứa lời giải hoặc cờ chấm. |
| Đầu vào lỗi | Từ chối nộp sai thứ tự, ID câu/khoảng lạ và đáp số sai định dạng. |
| Ước lượng sai | Vẫn mở bước tính, chưa lộ lời giải và giữ tiến độ phiếu cũ. |
| Hai phép chấm | Chấm ước lượng và tính độc lập, kiểm tra biên nhập cho phép chia. |
| Nộp đồng thời và nộp lại | Giữ lựa chọn và đáp số đã lưu. |
| Khởi động lại server | Khôi phục cả câu đang dở và câu đã hoàn thành. |
| Phiếu cũ | Vẫn lấy câu và chấm qua hợp đồng hiện có. |

## Giới hạn

- Ca hồi quy bao phủ phiếu Bài 9–10. Chưa xác nhận toàn bộ dạng bài cũ, vai trò giáo viên hoặc các thiết bị.
- Ca bàn phím bao phủ luồng chính tại một câu, chưa kiểm tra bằng trình đọc màn hình hoặc trên nhiều thiết bị.
- Chưa có thử nghiệm sư phạm với học sinh thật. Các nhận xét về độ khó của ba chặng là giả thuyết thiết kế.
- Ghi link CI và SHA cụ thể sau khi có run thành công. Không dùng kết quả cục bộ thay cho bằng chứng CI.
