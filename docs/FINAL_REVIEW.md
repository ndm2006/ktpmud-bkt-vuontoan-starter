# Rà soát cuối và ứng viên freeze — N57 / Track B

Đợt kiểm chứng tại Codex bắt đầu 17/11/2026, trước hạn freeze 23:59 ngày 19/11/2026 (giờ Việt Nam). Đây là bằng chứng kiểm thử và đề xuất bàn giao, không thay quyền review/nghiệm thu của nhóm hoặc GV.

## Kiểm chứng thực tế

- Baseline hiện hành chạy lại: 12/12 unit/API và 3/3 E2E đạt.
- Kiểm thử bằng trình duyệt tích hợp Codex, DB synthetic tạm, tài khoản hocsinh90 trên localhost:3100; đi từ menu Phòng Luyện Tập, không dùng URL demo rời.
- Lưu thiếu câu: lỗi rõ và focus về radio đầu tiên chưa trả lời. Chọn đủ 12: khóa, mở phần chính xác. Refresh: phục hồi 12 ước lượng đã khóa.
- Nhập ký tự sai: báo lỗi/focus. Ca bốn tổ hợp có 10/12 ước lượng hợp lý và 10/12 kết quả chính xác, giao nhau 9/12 → 75%; lượt đầu +30 sao. Refresh giữ kết quả. Lượt sau cùng 75% không cộng lại sao.
- Câu 6 sau yêu cầu của đại diện nhóm chỉ còn `48 × 6`, kể cả DB đã có và lượt chưa nộp. Kết quả đã nộp giữ snapshot lịch sử.
- Sau sửa cuối: 14/14 unit/API và 4/4 Chromium E2E đạt trên Windows/Node 22. Các run CI mới cần khớp commit thực tế, không dùng run cũ thay chứng nhận code mới.
- [Ảnh tổng kết Codex](../artifacts/review/codex-live-result.jpg) và [ảnh toàn trang](../artifacts/review/codex-live-result-full.jpg).

## Đối chiếu bảy tiêu chí phản biện

| Tiêu chí | Kết quả và căn cứ | Nhận xét |
|---|---|---|
| 1. Đáp ứng đề | Một type estimate, 12 fixture, luồng lesson/question-sets/submissions, server chấm/lưu, không lộ đáp án, feedback và keyboard | Đối chiếu đủ B-01…B-12 trong REQUIREMENTS; hồ sơ nộp/validate là lớp khác với test sản phẩm |
| 2. Thời gian/nguồn lực | Tái sử dụng bộ câu, không đổi framework, triển khai đã có test thực chạy thay vì ước lượng thời gian | Nhóm có hai người, ngoại lệ được GV chấp thuận theo xác nhận của đại diện nhóm trong chat; không tự tạo thành viên |
| 3. Scope | Một bộ 12 câu, khóa cả phần ước lượng; không CRUD giáo viên/game/deploy | Phù hợp phạm vi thu hẹp. Không thêm lịch sử nâng cao, auto-save từng phím hoặc hủy lượt tổng quát trước freeze |
| 4. Thiếu sót/mâu thuẫn | Bỏ dung sai 20% thiếu căn cứ; mỗi câu chỉ có điểm khi cả hai bước đúng; retry trả kết quả đã chốt | Tránh hoàn thành bài khi sai hết một kỹ năng. Khoảng là nhận biết độ lớn bằng mốc dễ nhẩm; chưa có thử nghiệm sư phạm với trẻ |
| 5. Độ phức tạp | Một bảng lượt, seed bổ sung, module chấm thuần, hai giai đoạn | Snapshot/transaction/unique index có ca lỗi cụ thể chứng minh nhu cầu; không xây framework version/migration tổng quát |
| 6. Nguy cơ triển khai | Ownership, khóa thứ tự, concurrency, rollback, không cộng sao trùng; nội dung đổi giữa lượt bị từ chối | Đã sửa lỗi randomUUID không có ở HTTP LAN; thêm chặn metadata điểm/sao sai trước khi khóa. Luồng stale nội dung cần thầy cô hỗ trợ, công bố rõ |
| 7. Kiểm thử/nghiệm thu | Oracle độc lập, 14 unit/API, 4 E2E, UI Codex thật, CI PR | Không coi “CI xanh” là GV nghiệm thu, cũng không coi keyboard test là chứng nhận screen reader |

## Lỗi/điểm cần sửa đã xử lý

| Vấn đề | Loại bằng chứng | Mức độ | Cách sửa / tác động |
|---|---|---|---|
| randomUUID không có làm renderer không khởi tạo | Test tái hiện thất bại trước sửa, đạt sau sửa | Cao đối với HTTP LAN | Dùng getRandomValues tạo request key khi thiếu randomUUID; không sửa auth/session |
| Metadata sao âm/thập phân, kind hoặc lesson không hợp lệ | Integration test | Trung bình | Từ chối 409 trước tạo run/ghi điểm; không sửa route teacher |
| Câu 6 có lời văn khác 11 câu còn lại | Quan sát Codex và yêu cầu trực tiếp | Thấp | Chỉ còn biểu thức; migration đúng nhãn cũ, giữ ước lượng và kết quả cũ |
| Bộ test giả lập FK không thể ghi vào DB | Lỗi thiết lập test, không phải lỗi ứng dụng | Thấp | Bỏ case bất khả thi vì SQLite FK đã chặn; giữ case metadata có thể thực sự tồn tại |

## Giới hạn còn lại và lý do không mở rộng trước freeze

1. Teacher analytics chỉ chẩn đoán lỗi bước chính xác; điểm trung bình/correct_count dùng câu đúng cả hai bước. Không sửa route ngoài scope; không gọi báo cáo này đầy đủ cho lỗi ước lượng.
2. Các số đang gõ chưa nộp không tự lưu. UI nói rõ; B-05 được chứng minh cho phần đã lưu trên server.
3. Nếu sửa/xóa nội dung chấm trong khi đang làm, server trả 409 thay vì chấm sai phiên bản; chưa có UI hủy lượt lỗi thời. Bộ fixture cần giữ ổn định trong kỳ demo. Migration câu 6 là ngoại lệ thuần nhãn đã được test không đổi điểm.
4. Chưa thử screen reader hoặc khảo sát sư phạm với học sinh thật. Không dùng dữ liệu thật để lấp khoảng trống này.

## Điều kiện chốt

Code và bằng chứng phải có CI xanh của đúng SHA. Gói nộp được sinh từ chính commit đó, có sáu artifact bắt buộc, source-ref đủ giá trị, demo 7 phút, alias nhóm và ngoại lệ hai người theo xác nhận đã nhận. Validator chính thức chỉ kiểm tra cấu trúc/secret pattern, không chứng nhận chất lượng nội dung hoặc phê duyệt ngoại lệ nhóm.

Trước khi phát hành tag `bkt-2026-N57-rc1` hoặc mở Draft PR hồ sơ vào kho môn học, đại diện nhóm cần duyệt ứng viên và xác nhận phạm vi hành động. Không tự merge hoặc tự xác nhận bài đã đúng thay nhóm. PC-2/comment đúng khung giờ và Demo/Viva vẫn do nhóm thực hiện.
