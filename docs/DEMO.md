# Demo hiện hành — N57 — tối đa 7 phút

1. 0:00–1:00: scope, luồng hai giai đoạn và lý do chọn khoảng cố định/điểm toàn phần.
2. 1:00–3:00: đăng nhập tài khoản mẫu; menu Phòng Luyện Tập → bộ ước lượng; chọn khoảng 12 câu, lưu/khóa. Dùng Tab/Space/Arrow/Enter cho một phần thao tác. Refresh để thấy ước lượng đã lưu. Nhập đáp số; ghi nhớ số chưa nộp không tự lưu.
3. 3:00–4:30: nộp và xem feedback riêng hai bước, tổng điểm, sao; refresh giữ kết quả. Làm lượt mới; không thay đổi kết quả cũ. Sao chỉ tăng khi vượt best_score bài 41.
4. 4:30–5:30: chạy npm test; chỉ ra test thứ tự/ownership, retry/concurrency và rollback.
5. 5:30–6:30: npm run test:e2e hoặc báo cáo đã chạy; trình bày giới hạn teacher analytics, screen reader và sư phạm.
6. 6:30–7:00: CI đúng SHA, yêu cầu còn cần nhóm/GV xác nhận, bàn giao.

Oracle để chuẩn bị demo (chỉ trong tài liệu phía repo, không phục vụ qua frontend):

| Câu | Phép tính | Khoảng | Đáp số |
|---|---|---|---|
| 1 | 6 × 7 | 31–59 | 42 |
| 2 | 42 ÷ 6 | 6–9 | 7 |
| 3 | 23 × 4 | 80–119 | 92 |
| 4 | 56 ÷ 4 | 10–19 | 14 |
| 5 | 37 × 3 | 90–119 | 111 |
| 6 | 48 × 6 | 240–299 | 288 |
| 7 | 78 ÷ 3 | 20–29 | 26 |
| 8 | 72 ÷ 2 | 30–39 | 36 |
| 9 | 64 × 5 | 300–349 | 320 |
| 10 | 76 × 4 | 280–319 | 304 |
| 11 | 65 ÷ 5 | 10–19 | 13 |
| 12 | 96 ÷ 3 | 30–39 | 32 |

docs/PC1-DEMO.md là kịch bản lịch sử của thiết kế cũ. Chuẩn bị vấn đáp không AI: vì sao chọn hai giai đoạn, điều kiện một câu có điểm, snapshot, transaction, allowlist, quyền sở hữu và giới hạn tích hợp.
