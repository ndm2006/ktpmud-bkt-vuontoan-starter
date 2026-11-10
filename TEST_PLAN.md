# Kế hoạch kiểm thử CP1 — N57 — Track B

Ngày **10/11/2026**. Bản kế hoạch này thiết kế tiêu chí và dữ liệu kiểm thử. Kết quả thực thi sẽ được ghi theo commit khi có triển khai. Quy tắc chi tiết nằm trong [ADR-001](DECISIONS.md) và [yêu cầu](REQUIREMENTS.md).

## Phạm vi, môi trường và cách ghi kết quả

- Chạy unit test cho phép toán, khoảng và hợp đồng dữ liệu. Dùng `node:test` để có lệnh `npm test` phù hợp stack hiện có.
- Test HTTP tích hợp với Express và SQLite thật trong thư mục tạm qua `DB_PATH`. Chạy trên cổng riêng, dùng tài khoản synthetic sẵn có hoặc fixture test. Dọn DB sau khi kết thúc. Chạy cả DB khởi tạo mới và DB starter đã có dữ liệu.
- Dùng trình duyệt cho điều hướng, refresh và bàn phím. Thực hiện hồi quy luồng cũ trước khi demo.
- PR trong chính fork phải chạy `npm ci` rồi `npm test` trên Node đã khai báo trong CI. Ghi commit SHA, môi trường, lệnh, pass/fail và link run. Smoke check M0 chỉ là bằng chứng starter khởi động.
- Quy tắc đánh dấu đạt: tất cả ca bắt buộc của tiêu chí có kết quả đúng và bằng chứng. Ca thất bại hoặc chưa chạy phải được ghi rõ.

## Ma trận kiểm thử

| ID | Loại | Thao tác / đầu vào | Kết quả mong đợi | AC |
|---|---|---|---|---|
| T01 | UI | Đăng nhập demo, mở Phòng Luyện Tập từ menu, vào mục ước lượng. | Dạng bài xuất hiện trong trang luyện tập hiện có, mở câu đầu. | B-01 |
| T02 | Unit / dữ liệu | Đọc fixture hai lần từ khởi tạo sạch. Kiểm đếm ID và đối chiếu bảng ADR. | 12 ID duy nhất, 6 nhân và 6 chia hết. Cùng thứ tự, đáp số và khoảng. | B-02, B-03 |
| T03 | Unit / biên | Kiểm tra các cặp 20/21, 40/41 trên hàm khoảng và 3/4, 7/8, 10 trên miền chia. | 20 và 40 thuộc khoảng phía dưới. 21 và 41 thuộc khoảng phía trên. 3/4 và 7/8 phân vào hai khoảng liền nhau. 10 thuộc 8–10. | B-03, B-08 |
| T04 | Unit / chấm điểm | Câu 42 ÷ 6, thử khoảng đúng/sai với đáp số 7/8. | Bốn tổ hợp cờ đúng/sai độc lập. Khoảng hợp lệ nhưng sai vẫn mở bước tính. | B-03, B-06, B-08 |
| T05 | HTTP / lỗi | Gửi bước tính trước, ID câu/khoảng lạ, thiếu answer, chuỗi, số lẻ, số ngoài miền. | Lỗi 4xx rõ nghĩa. Trạng thái và dữ liệu lưu không bị thay đổi bởi yêu cầu lỗi. | B-03, B-05, B-08 |
| T06 | HTTP / lộ đáp án | Kiểm tra tải bài, phản hồi bước ước lượng, khôi phục và yêu cầu nộp sai thứ tự. Kiểm tra URL tệp fixture. | Không có đáp số, mã khoảng đúng hay cờ chấm trước bước tính hợp lệ. Fixture server không tải qua web. | B-04 |
| T07 | HTTP + UI / lưu | Lưu ước lượng, refresh, nhập đáp số, refresh lần nữa. Khởi động lại server cùng DB. | Lần đầu hiện bước tính và khoảng đã chọn. Lần sau hiện hai kết quả đã chấm. Restart vẫn khôi phục. | B-05, B-08 |
| T08 | HTTP / gửi lặp | Gửi lại cùng giá trị, gửi giá trị khác, gửi song song hai nộp hợp lệ cho cùng câu. | Một hàng/câu/tài khoản. Gửi lặp cùng giá trị ổn định. Yêu cầu khác không ghi đè. | B-05, B-08 |
| T09 | HTTP / cách ly | Học sinh synthetic A đã nộp, truy cập bằng B và khi không đăng nhập. | B nhận trạng thái của B. Không đăng nhập bị từ chối. | B-05, B-08 |
| T10 | UI / bàn phím | Tab tới radio, chọn bằng phím, nộp, nhập sai định dạng rồi sửa, đọc kết quả. | Focus rõ, thứ tự hợp lý, báo lỗi có thể đọc. Sau khi nộp, hai phản hồi có nhãn riêng. | B-06, B-12 |
| T11 | Review diff | So sánh với starter tag, kiểm tra đường dẫn auth/deploy, route bị khóa, seed tài khoản và các tệp mới. | Không sửa vùng cấm. Tệp thêm dùng dữ liệu synthetic/alias và không chứa PII, secret, DB hay cấu hình môi trường. | B-07, B-11 |
| T12 | HTTP / hồi quy | Nộp phiếu cũ theo `POST /api/submissions`, thử câu input, compare, paint và multiple-choice hiện có. | Hợp đồng và cách chấm cũ giữ nguyên. Tiến độ và sao cũ vẫn cập nhật theo quy tắc starter. | B-01, B-07 |
| T13 | Tích hợp | Checkout sạch, `npm ci`, `npm test`. Khởi động bằng DB starter đã tồn tại. | Test tự động qua, tạo bảng mới an toàn, các bảng và kết quả cũ đọc được. | B-09 |
| T14 | CI | Mở PR trong fork, kiểm tra Actions ở SHA cần xác nhận. | Run thực thi cả `npm ci` và `npm test` và trả kết quả xanh. | B-10 |

**Ưu tiên M2:** T02–T09 cho server, T01/T10 cho demo, T12–T14 cho hồi quy và tái lập. Báo cáo lỗi theo AC và mã test, không chuyển một tiêu chí thành đạt dựa trên tài liệu thiết kế.
