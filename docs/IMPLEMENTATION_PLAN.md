# Kế hoạch tối ưu hiện hành — N57 / Track B

Thay bản đề xuất dung sai số và lưu từng câu đã lập trước khi biết fork hiện có. Bắt đầu thay đổi 17/11/2026 theo yêu cầu của đại diện nhóm trong chat; chưa thay cho nghiệm thu của nhóm/GV.

## Nền đã xác minh

- Fork: https://github.com/ndm2006/ktpmud-bkt-vuontoan-starter
- Nhánh `track-b-work`, nền trước sửa `3236af604e372bb000ab7d483ae8d051d2435ed3`.
- Tag starter `bkt-2026-v1` trên fork trỏ đến `057a48205f50f0f30d6260be1a44b343a167a3e7`. SHA trong architecture-reference khác; dùng Git để xác minh nguồn thay vì suy từ tài liệu.
- Nhánh đã có MVP và hồ sơ PC-1. Giữ lịch sử đó; ADR-002 quy định bản hiện hành.

## Phạm vi

1. Giữ 12 fixture hiện có, 6 nhân/6 chia hết; chọn khoảng cố định, không dùng dung sai 20%.
2. Phòng Luyện Tập → lesson.html → API question-sets → khóa đủ 12 ước lượng → submissions → attempts/progress/sao.
3. Gắn bài ôn nhân/chia 41 vì có phép tính hai chữ số; luyện tập mở tự do, không sửa chuỗi khóa/mở khác.
4. Cả hai bước đúng mới đạt 1 điểm/câu. Phản hồi riêng từng bước, giữ ngưỡng hoàn thành 50% và công thức sao cấp bài học.
5. Phục hồi estimates đã lưu và kết quả đã nộp. Đáp số chưa nộp không tự lưu, UI thông báo rõ.
6. Một bảng lượt mới, module chấm thuần, seed bổ sung idempotent. Giữ bảng PC-1; không tự quy đổi dữ liệu cũ thành điểm mới.
7. Ghi attempt/progress/sao/đóng lượt trong cùng transaction; retry trả kết quả cũ. Ownership từ auth hiện có.
8. Sau seed, DB là nguồn chấm. Lưu snapshot; thay nội dung giữa lượt thì trả 409, không chấm bằng dữ liệu mới âm thầm. Kết quả hoàn tất xem từ snapshot.

## Kiểm chứng

- npm test: oracle độc lập, biên/invalid, không lộ đáp án, thứ tự, user isolation, restart/retry/concurrency, rollback, seed và bốn type cũ.
- npm run test:e2e: menu thật, keyboard, refresh, lỗi mạng, bốn tổ hợp feedback và mobile.
- CI PR: npm ci → npm test → cài Chromium → E2E; artifact khi lỗi.
- Cập nhật yêu cầu, ADR, test, checklist, AI_USE và phần PC-2; không sửa nội dung PC-1.
- Commit/push nhánh được chỉ định. Không tự merge, tạo tag/release freeze hoặc xác nhận nhóm đã nghiệm thu.

## Giới hạn

- Teacher analytics cũ chẩn đoán lỗi tính chính xác, không bao phủ lỗi ước lượng. Điểm trung bình dùng điểm cả hai bước.
- Không có thử sư phạm với trẻ thật hoặc kiểm tra screen reader trực tiếp. Test keyboard không chứng nhận toàn bộ accessibility.
- Draft PR hồ sơ/check validate là quy trình riêng. Comment PC-2 và phát hành cuối do nhóm thực hiện theo đề.
