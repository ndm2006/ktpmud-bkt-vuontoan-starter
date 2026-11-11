# PC-1 — Demo MVP Track B — Nhóm N57

**Bản demo:** nhánh `track-b-work`, giao diện tại commit `0bc0176`. **Mục tiêu:** học sinh lớp 3 tập nhận biết độ lớn của kết quả trước khi tính chính xác. **Phạm vi CP1:** chờ GV/TA xác nhận theo [đính chính #25](https://github.com/fossbk-spec/ktpmud-project/issues/25).

## Chạy và trình bày

Từ thư mục gốc, chạy `npm ci` rồi `npm run dev`. Trên Windows x64, dùng Node.js 22 với phiên bản SQLite khóa trong repo. Xem [hướng dẫn môi trường phát triển](DEVELOPMENT.md). Mở [Phòng Luyện Tập](http://127.0.0.1:3000/exercise.html) và đăng nhập bằng tài khoản học sinh mẫu trong [README](../README.md). Để bắt đầu từ câu 1, chọn một tài khoản mẫu chưa làm bài hoặc dùng DB dev riêng qua `DB_PATH`.

| Thời lượng | Thao tác trình bày | Điều giảng viên có thể kiểm chứng |
|---|---|---|
| 0:00–0:30 | Từ menu vào **Phòng Luyện Tập**. Chỉ thanh **Lộ trình Chủ đề 2**, **Mục lục SGK** và hai thẻ **Phiếu bài tập**, **Ước lượng trước khi tính đúng**. | Ước lượng là một hoạt động trong trang luyện tập hiện có. Phiếu bài tập mở mặc định. |
| 0:30–1:30 | Chọn **Ước lượng trước khi tính đúng**. Ở câu `6 × 7`, mở **Gợi ý của Ong Vàng**, chọn khoảng **60–88**, rồi bấm **Tiếp tục**. Tải lại trang trước khi nhập đáp số. | Một lựa chọn hợp lệ được lưu và mở bước tính. Tải lại vẫn hiện bước nhập đáp số và khoảng đã chọn. |
| 1:30–2:15 | Nhập **42**, bấm **Nộp đáp số**, rồi mở **Xem cách nhẩm**. | Ước lượng chưa hợp lý, khoảng đúng là **31–59**; đáp số **42** được chấm đúng. Lời giải dùng hai mốc dễ nhẩm. |
| 2:15–3:00 | Bấm **Câu tiếp theo**, mở **Xem lại các câu đã làm**, chọn **Câu 1**. Bấm **Về phòng luyện tập** để quay lại phiếu. | Câu đã chọn có dấu nhận biết và nội dung tương ứng. Học sinh có thể đổi hoạt động và tiếp tục sau. |

Nếu có thời gian, dùng tài khoản mẫu đã hoàn thành để mở tổng kết và đối chiếu hai số đếm trên 12 câu. Tiến độ mỗi tài khoản gắn với DB đang chạy, nên có thể chuẩn bị một tài khoản mới cho luồng chính và một tài khoản đã làm xong để xem tổng kết.

## Cách nhóm đi từ yêu cầu đến bằng chứng

1. **Chốt bài toán.** Chọn khoảng là bước bắt buộc trước khi tính. Dùng 12 câu tổng hợp, chia ba chặng để dễ kiểm tra và lặp lại demo. Xem [phạm vi và B-01–B-12](../REQUIREMENTS.md).
2. **Giải thích quyết định.** Khoảng cố định giúp học sinh chọn rõ ràng và nhóm kiểm thử được hai đầu mút. Express chấm hai kết quả độc lập, SQLite lưu theo tài khoản và câu. Kết quả ước lượng được lưu riêng với phiếu và sao. Xem [ADR-001](../DECISIONS.md).
3. **Đối chiếu MVP.** Chạy `npm test` trong checkout sạch. Khi workspace có thêm bản sao giải nén, dùng `node --test test/estimation-practice.test.js` để chỉ chạy bộ test của checkout này. Dùng [ma trận T01–T14](../TEST_PLAN.md) và [bảng tiến độ](../progress/PROGRESS.md#11-tiến-độ-theo-acceptance-criteria) để phân biệt bằng chứng tự động, kiểm tra giao diện và phần còn thiếu.
4. **Xin ý kiến giảng viên.** Xác nhận phạm vi CP1 bổ sung, kiểm tra độ khó của các mốc và cách giải thích cho lớp 3. Ghi phản hồi vào [báo cáo tiến độ](../progress/PROGRESS.md#12-sửa-đổi-bắt-buộc-từ-checkpoint-1), kèm đầu việc và bằng chứng kiểm tra lại.

Giảng viên đọc `progress/PROGRESS.md` tại đúng commit nhóm khai báo. Theo [Issue #17](https://github.com/fossbk-spec/ktpmud-project/issues/17), nhóm đăng một bình luận xác nhận trong khung 9:30–11:30 ngày 11/11/2026, dùng đúng ba dòng dưới đây và thay dòng cuối bằng SHA đầy đủ đã có trên fork. Bằng chứng và câu hỏi dành cho GV nằm trong báo cáo tiến độ.

```text
Nhóm: 57 · Track: B
Fork: https://github.com/ndm2006/ktpmud-bkt-vuontoan-starter
Commit PC-1: <SHA 40 ký tự>
```

Nhóm chọn luồng demo này để trình bày cách học sinh chọn khoảng, tính và xem kết quả. N57-A đã kiểm tra MVP và hồ sơ. N57-B đã kiểm thử và đồng ý chốt bố trí giao diện. Xem [nhật ký AI của nhóm](../AI_USE.md).
