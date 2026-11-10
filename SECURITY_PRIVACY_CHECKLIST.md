# Checklist bảo mật và quyền riêng tư — Track B — N57

Phạm vi rà soát là phần mở rộng ước lượng và gói bàn giao MVP. Các mục dưới đây dựa trên mã nguồn và [báo cáo kiểm thử](TEST_REPORT.md).

| Mục | Kết quả rà soát | Bằng chứng |
|---|---|---|
| Dữ liệu demo | Bộ câu tổng hợp và tài khoản mẫu của starter. Báo cáo công khai dùng alias N57-A và N57-B. | [Fixture](server/estimation-questions.js), [phân công](CONTRIBUTIONS.md) |
| Xác thực và phân quyền | API ước lượng dùng middleware hiện có. Truy vấn tiến độ lấy chủ sở hữu từ phiên đã xác thực. | [Route và truy vấn theo người dùng](server/estimation-practice.js), [ca kiểm thử](test/estimation-practice.test.js) |
| Chống lộ đáp án | Server chỉ trả đáp số và giải thích của câu đã nộp bước tính. Bộ câu nằm phía server. | [Hợp đồng API](DECISIONS.md), [test tải bài và lưu khoảng](test/estimation-practice.test.js) |
| Kiểm tra đầu vào và dữ liệu lưu | Server kiểm tra ID và miền số nguyên. SQL dùng tham số. Transaction và khóa theo tài khoản/câu giữ kết quả nhất quán khi gửi lại. | [Server](server/estimation-practice.js), [schema](server/db.js) |
| Giới hạn phạm vi | Diff với tag starter giữ tệp xác thực, tài khoản mẫu và tệp cấu hình deployment. Bài ước lượng lưu riêng với điểm và sao. | [Kiến trúc starter](docs/architecture-reference.md), [ADR](DECISIONS.md) |
| Secret và tệp cục bộ | `.gitignore` loại DB, journal SQLite, `.env` và các mẫu tệp client secret. Kiểm tra lại danh sách tệp và diff của SHA freeze trước khi đưa lên kho môn học. | [.gitignore](.gitignore), [quy trình nộp](docs/SUBMISSION.md) |
| AI runtime | Phép tính và kiểm tra khoảng thực hiện bằng JavaScript tất định. | [Bộ chấm](server/estimation-practice.js), [nhật ký AI](AI_USE.md) |
| Dependency | `npm audit` trên bản cài sạch ghi nhận một cảnh báo cao ở `body-parser` và một cảnh báo vừa ở `postcss-selector-parser`. Phiên bản dependency của MVP được giữ để đối chiếu hồ sơ. | [Cảnh báo body-parser](https://github.com/advisories/GHSA-27r3-jxmh-p828), [cảnh báo selector parser](https://github.com/advisories/GHSA-rj75-hqrm-r3gf) |

Rà soát này áp dụng cho demo cục bộ và dữ liệu mẫu. Việc quét tự động toàn bộ SHA freeze và kiểm tra tệp cuối thuộc bước chốt nộp.
