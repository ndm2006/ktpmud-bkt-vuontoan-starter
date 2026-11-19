# Quyết định thiết kế — Track B — Nhóm N57

**Hiện hành: ADR-002 ở cuối tệp. ADR-001 mô tả PC-1, đã được thay thế ở các nội dung xung đột.**

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
- Chia ba chặng, mỗi chặng bốn câu. Hai câu đầu dùng bảng 6 để làm quen, mọi câu có gợi ý tùy chọn ở bước ước lượng. Server chỉ trả giải thích cách tính hai mốc sau khi nộp đáp số. Học sinh mở **Xem cách nhẩm** khi cần. Không trừ lượt hay giới hạn thời gian.

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

## ADR-002 — Khóa cả phần ước lượng, tích hợp chấm và tiến độ hiện hữu

Trạng thái: triển khai theo yêu cầu đại diện nhóm trong chat từ 17/11/2026, chưa thay cho nghiệm thu nhóm/GV. Nền trước sửa: `3236af604e372bb000ab7d483ae8d051d2435ed3`.

### Lựa chọn

Giữ 12 fixture và phương pháp dùng mốc dễ nhẩm của PC-1. Chọn khoảng cố định thay vì dung sai 20% hoặc tự nhập hai đầu khoảng. Khoảng đóng chứa đáp số chính xác là hợp lý. Các khoảng không chồng lấn, một đáp số thuộc đúng một khoảng; oracle trong test viết độc lập. Độ phù hợp sư phạm vẫn cần nhóm/GV review, chưa có thử nghiệm với học sinh thật.

Chọn hai giai đoạn cả bộ thay vì từng câu: ít request và trạng thái hơn, đổi lại phải chọn hết 12 khoảng trước khi mở phần chính xác. Server buộc thứ tự, không chỉ disable UI.

Mỗi câu 1 điểm khi cả hai bước đúng. Partial credit 50/50 là phương án khả thi nhưng cho phép hoàn thành ở 50% dù sai toàn bộ một kỹ năng. Vì vậy giữ điểm toàn phần và phản hồi riêng hai kỹ năng. 6/12 câu đạt → 50%, 9/12 → 75%, 12/12 → 100%.

Gắn bài 41 vì bộ hiện có nhân/chia hai chữ số. Mở tự do từ Phòng Luyện Tập là chủ ý cho ôn tập, không thay chuỗi khóa/mở cũ. Sao và best_score vẫn ở cấp bài học, không ở cấp bộ đề.

### Contract API

| Route | Hành vi |
|---|---|
| GET /api/question-sets/uoc-luong-nhan-chia/questions | Câu hỏi/ranges/hint công khai qua allowlist; không đáp án hoặc cờ chấm |
| POST /api/estimation-practice/estimates | setId, requestId, estimates đủ 12; khóa toàn bộ và trả run trạng thái exact |
| GET /api/estimation-practice?setId=... | Lượt mới nhất của tài khoản hiện tại hoặc null |
| GET /api/estimation-practice/runs/:id | Chủ lượt phục hồi theo ID; tài khoản khác nhận 404 |
| POST /api/submissions | setId, runId, answers; chỉ nhận sau khóa, không nhận thay đổi estimates |

Retry lưu cùng key/cùng khoảng trả cùng lượt; cùng key khác dữ liệu trả 409. Mỗi tài khoản tối đa một lượt chưa nộp của bộ này. Nộp lại lượt đã chấm trả kết quả cũ kể cả payload đáp số thay đổi; không ghi đè hay cộng thêm attempt/sao. Muốn làm lại phải tạo lượt mới sau khi đã hoàn tất.

### Dữ liệu và transaction

Bảng estimation_runs giữ user/set/key, estimates, snapshot câu hỏi/metadata, attempt_id và result_json. Unique partial index ngăn hai lượt đang làm; transaction immediate bao toàn bộ đọc/chấm/attempt/progress/sao/đóng lượt. Ghi lỗi ở bất kỳ bước nào rollback toàn bộ. duration_sec do server tính từ lúc khóa đến nộp.

Fixture chỉ dùng seed, sau đó DB là nguồn chấm. Snapshot cố định nội dung của lượt; nếu câu hỏi hoặc metadata thay đổi giữa lượt, trả 409 thay vì chấm bằng nội dung khác. Bản hoàn tất vẫn xem được bằng snapshot. Không đặt FK set_id để giữ hành vi route giáo viên xóa bộ đề. MVP chưa có UI hủy lượt lỗi thời; cần thầy cô hỗ trợ hoặc phục hồi nội dung khi có thay đổi giữa lượt.

Seed bổ sung INSERT OR IGNORE chạy cả DB sạch/cũ; không xóa users/progress/attempts. Giữ bảng PC-1 estimation_answers và không quy đổi kết quả từng câu cũ thành điểm lượt mới.

### Tương thích và giới hạn

attempts.answers_json giữ đáp số chính xác dạng chuỗi. correct_count/score_percent phản ánh câu đúng cả hai bước. Teacher analytics cũ chỉ chẩn đoán lỗi bước chính xác, không phản ánh đầy đủ lỗi ước lượng; không tuyên bố báo cáo đầy đủ cho dạng mới và không sửa route giáo viên.

Frontend không giữ đáp án trước nộp hoặc thêm token. Refresh phục hồi ước lượng đã khóa/kết quả, không tự lưu số đang gõ chưa nộp. UI nói rõ. Keyboard dùng radio/label/fieldset native, focus và lỗi dễ hiểu; không thay chứng nhận screen reader/sư phạm.

totalStars trong result snapshot là tại thời điểm nộp, không phải tổng hiện tại sau các hoạt động khác. Hai endpoint từng câu PC-1 được thay bằng contract mới; dữ liệu PC-1 vẫn trong DB/Git, giao diện hiện hành không đọc bảng cũ.

### Chỉnh cuối trước freeze

- requestId dùng randomUUID nếu có, fallback getRandomValues cho HTTP LAN; đây là key chống ghi trùng, không thay token đăng nhập hoặc quyền sở hữu.
- Chặn metadata sao âm/thập phân, kind khác exercise hoặc lesson không tồn tại trước khi khóa ước lượng; không sửa route giáo viên.
- Theo yêu cầu đại diện nhóm, câu 6 chỉ còn `48 × 6`. Seed migration chỉ thay đúng nhãn cũ đã biết trong câu hỏi và snapshot CHƯA nộp; không đổi phép tính, đáp án, khoảng, ước lượng hoặc điểm. Đây là ngoại lệ thuần nhãn cho phép tiếp tục lượt đang làm; các thay đổi nội dung khác vẫn bị từ chối 409. Không ghi lại snapshot kết quả đã nộp.
