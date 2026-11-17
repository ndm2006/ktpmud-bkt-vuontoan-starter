# Kế hoạch kiểm thử hiện hành — N57 / ADR-002

Test: test/estimation-practice.test.js và e2e/estimation.spec.js. Bằng chứng PC-1 thuộc thiết kế cũ còn trong lịch sử Git.

| Mã | Điều kiện pass |
|---|---|
| U01 | 12 fixture, 6 nhân/6 chia; đáp số/khoảng đúng đối chiếu oracle viết độc lập; min/max và ngay ngoài khoảng |
| U02 | Chuẩn hóa số nguyên 0…999; từ chối ép kiểu mất nghĩa, thập phân, exponent, ký tự |
| U03 | Bốn tổ hợp hai bước; cả hai đúng mới có điểm; estimate-only/exact-only đều 0%; 1/12=8%, 9/12=75% |
| I01 | Auth và allowlist; không lộ đáp án/khoảng đúng/cờ chấm trước nộp |
| I02 | Thiếu ước lượng, ID/range lạ, payload sai không tạo lượt; nộp trước khóa bị từ chối |
| I03 | Khóa đủ 12; retry key nhất quán; không ghi đè; cách ly user; restart phục hồi |
| I04 | Nộp đồng thời chỉ một attempt; điểm/tiến độ/sao được ghi; retry/restart giữ kết quả |
| I05 | Lượt hoàn hảo sau không cộng lại sao; 6 câu đúng trọn vẹn đạt 50% |
| I06 | Inject lỗi progress: rollback attempt/sao/đóng lượt; retry sau bỏ lỗi thành công |
| I07 | Nội dung thay đổi từ lúc khóa: 409, không ghi kết quả sai phiên bản |
| I08 | Seed hai lần trên DB cũ không thêm câu trùng hoặc đổi users/attempts/progress; bảng PC-1 còn |
| I10 | compare/input/paint/multiple-choice cũ giữ trim/lowercase, điểm và sao |
| E01 | Menu thật → 12 câu bằng Space/Arrow/Tab → khóa → refresh → đáp số bằng bàn phím → nộp → focus kết quả → refresh → lượt mới |
| E02 | Lỗi mạng khi khóa giữ lựa chọn; nhập sai có lỗi/focus; mất response sau commit → refresh thấy kết quả; retry không tăng attempt |
| E03 | Mobile 390×844 dùng menu mobile, feedback bốn tổ hợp, không tràn ngang |

Lệnh: npm ci; npm test; npx playwright install chromium; npm run test:e2e. Dùng Node 22 cho bộ công cụ phát triển/E2E. API/E2E tự tạo DB riêng ngoài repo. E2E chặn tài nguyên Internet để kiểm tra CSS tĩnh và logic không phụ thuộc CDN.

CI Node 22/Ubuntu chạy trên PR. Kết quả cục bộ không được gọi là run CI GitHub. Keyboard tự động không thay cho kiểm tra screen reader hoặc thử sư phạm.
