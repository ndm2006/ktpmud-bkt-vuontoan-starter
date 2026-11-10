# Yêu cầu Track B — Nhóm N57

Hồ sơ Checkpoint 1 bổ sung ngày **10/11/2026** theo [đính chính #25](https://github.com/fossbk-spec/ktpmud-project/issues/25). Đại diện nhóm xác nhận thiết kế nghiệp vụ và phân công dự kiến ngày 10/11. Trạng thái phạm vi: **chờ GV/TA duyệt**.

Căn cứ: [đề chính thức, mục 4 và 8](https://fossbk-spec.github.io/ktpmud-book/exams/KTPMUD_Hack_Marathon_2026_De_Thi_Chinh_Thuc_v1.0.0_20261103.html), [kiến trúc starter](docs/architecture-reference.md), tag `bkt-2026-v1`, commit `057a48205f50f0f30d6260be1a44b343a167a3e7`.

## Mục tiêu và phạm vi

Học sinh lớp 3 luyện nhận biết độ lớn của kết quả trước khi tính chính xác. Từ **Phòng Luyện Tập**, học sinh mở mục **Ước lượng trước khi tính đúng**, làm lần lượt các câu nhân/chia thuộc bảng 6 và nhận phản hồi cho hai kỹ năng riêng biệt. Bộ bài có 12 câu synthetic cố định. Sử dụng phiên đăng nhập hiện có.

- Học sinh chọn một trong ba khoảng. Server kiểm tra khoảng thuộc đúng câu và lưu lựa chọn. Nếu khoảng hợp lệ nhưng ước lượng sai, học sinh vẫn được chuyển bước.
- Học sinh nhập kết quả nguyên. Server chỉ chấp nhận sau khi bước ước lượng đã lưu. Sau lần nộp này, server trả hai kết quả đúng/sai và đáp số chính xác.
- Khi tải lại hoặc mở lại bài bằng cùng tài khoản, ứng dụng khôi phục bước đang làm và kết quả đã nộp từ SQLite. Một lượt gồm 12 câu, mỗi câu có một lần ghi cho từng bước. Không tính sao, không thay điểm hoặc mở khóa bài cũ.
- Giữ hành vi các dạng bài cũ, đăng nhập, session, tài khoản mẫu, route auth/teacher/admin và deployment. Chỉ dùng dữ liệu synthetic. Không dùng AI khi ứng dụng chấm và không kết nối hệ thống thật.

## Tiêu chí nghiệm thu

Các dòng dưới đây mô tả **kết quả cần kiểm chứng sau triển khai**. Mã ca kiểm thử tham chiếu [TEST_PLAN.md](TEST_PLAN.md).

| Mã | Điều kiện để đạt | Ca kiểm thử |
|---|---|---|
| B-01 | Học sinh đã đăng nhập đi từ menu Phòng Luyện Tập đến mục ước lượng ngay trong trang hiện có. Phiếu cũ vẫn dùng được. | T01, T12 |
| B-02 | Có 12 ID câu duy nhất, 6 phép nhân và 6 phép chia hết trong bảng 6. Cùng nguồn dữ liệu cho cùng nội dung, thứ tự và khoảng trên hai lần chạy sạch. | T02 |
| B-03 | Server xác định khoảng chứa đáp số với hai đầu mút bao gồm. Cùng câu và lựa chọn luôn cho cùng kết quả. Từ chối khoảng không thuộc câu và kết quả nhập ngoài miền. | T02, T03, T04, T05 |
| B-04 | Trước khi server chấp nhận bước tính chính xác, dữ liệu tải bài, dữ liệu khôi phục và phản hồi bước ước lượng không chứa đáp án, mã khoảng đúng hoặc cờ chấm. Fixture có đáp án không nằm trong tài nguyên frontend. | T06 |
| B-05 | Server từ chối nộp chính xác trước khi đã lưu ước lượng. SQLite lưu hai bước và kết quả theo tài khoản/câu. Refresh khôi phục cả câu đang làm lẫn câu đã chấm. | T05, T07, T08, T09 |
| B-06 | Sau khi nộp bước tính, giao diện hiện hai thông báo riêng. Hai kết quả độc lập, kể cả trường hợp ước lượng sai nhưng tính đúng hoặc ngược lại. | T04, T10 |
| B-07 | Diff xác nhận không đổi auth/session, tài khoản mẫu, deployment và route auth/teacher/admin. Phiếu cũ vẫn nộp được với hợp đồng hiện tại. | T11, T12 |
| B-08 | Test tự động có ca thông thường, ca biên, đầu vào không hợp lệ và chấm điểm, gồm nộp sai thứ tự và ghi lặp. | T03–T09 |
| B-09 | Checkout sạch, chạy `npm ci` rồi `npm test` thành công với DB test riêng và không cần hệ thống bên ngoài. | T13 |
| B-10 | Workflow trong fork chạy `npm ci` và `npm test` trên sự kiện Pull Request. Có link run gắn đúng commit. | T14 |
| B-11 | Dữ liệu bài, tài khoản kiểm thử và báo cáo công khai dùng synthetic hoặc alias. Diff không có dữ liệu cá nhân, token, DB cục bộ hay tệp môi trường. | T11 |
| B-12 | Chọn khoảng, nộp, nhập số và đọc phản hồi bằng bàn phím. Có nhãn, focus nhìn thấy và thông báo lỗi rõ. | T10 |

## Quyết định và bằng chứng bàn giao

[DECISIONS.md](DECISIONS.md) mô tả quy tắc khoảng, hợp đồng hai bước, lưu trạng thái và cách giữ luồng cũ. Để nghiệm thu ở Checkpoint 2, nhóm cần luồng chạy xuyên suốt, kết quả test công khai và demo nội bộ 5 phút. [Theo dõi tiến độ](progress/PROGRESS.md).
