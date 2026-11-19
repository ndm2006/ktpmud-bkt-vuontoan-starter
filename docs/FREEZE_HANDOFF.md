# Chốt freeze 19/11/2026 — N57

Hạn: 23:59 ngày 19/11/2026, giờ Việt Nam. Đính chính #28 còn yêu cầu Draft PR hồ sơ/check validate trước 11:30 ngày 18/11; code CI xanh không thay thế check đó. Ngày 20/11 chuyển cùng Draft PR sang Ready for review. Nhóm tự thực hiện vấn đáp và xác nhận theo quy định.

## Ứng viên source

- Nhánh: track-b-work, fork ndm2006/ktpmud-bkt-vuontoan-starter.
- Đọc FINAL_REVIEW.md, TEST_REPORT.md, REQUIREMENTS.md và ADR-002.
- Kiểm tra CI đúng SHA gồm npm ci, npm test, E2E. Node 22 cho công cụ phát triển.
- B-01…B-12 có bảng đối chiếu; không viết “GV đã nghiệm thu” từ kết quả máy chạy.

## Gói hồ sơ tái lập

Sau khi commit source và CI thành công, chạy:

```text
npm run prepare:submission -- --commit SHA_40_KY_TU --ci-url URL_RUN_DA_DAT --date 2026-11-17
```

Thay ngày bằng ngày thực tế chuẩn bị/nộp. Công cụ kiểm tra CI phải thành công cho đúng SHA và sinh `out/submissions/hoang_mai_toan_n57/` từ Git, không dùng file chưa commit. Thư mục out bị ignore để source-ref không tự tham chiếu chính commit chứa nó. Bản chưa có tag được ghi rõ candidate, không giả tag đã tồn tại.

Trong gói: submission.json, README, source-ref.json, sáu artifact bắt buộc, báo cáo review thêm và demo/ảnh. Liên kết tương đối được đổi sang source GitHub của đúng SHA. Manifest dùng alias N57-A/N57-B theo đặc tả BKT, không ghi họ tên/MSSV. Ngoại lệ nhóm hai người được ghi là xác nhận của đại diện nhóm, không giả mạo bằng chứng GV.

Validator chính thức nằm tại `fossbk-spec/ktpmud-project/scripts/validate_submission.py`; bản đã đọc trong đợt review thuộc commit `2c45d5fe2ea6820740017b1e3c5db6dd28c2b967`. Chạy validator đó trên gói trước khi mở PR; chỉ thay đúng thư mục submissions/hoang_mai_toan_n57 trong kho môn học.

## Sau khi nhóm duyệt ứng viên

1. Chốt SHA có CI xanh, tạo tag bkt-2026-N57-rc1 trỏ đúng SHA đó. Không di chuyển tag đã công bố.
2. Chạy prepare:submission với cùng SHA/CI URL và thêm `--require-tag` để kiểm tra tag có thật.
3. Mở/cập nhật Draft PR vào fossbk-spec/ktpmud-project từ fork kho môn học. Chờ check validate; nếu workflow cần GV approve, ghi đúng trạng thái, không gọi là đã đạt.
4. Nhóm xác nhận PC-2 đúng khung giờ bằng SHA và URL Draft PR; không giả lập ngày/giờ hoặc đăng thay nếu chưa được yêu cầu.
5. Ngày 20/11 nhóm chuyển Ready for review, ngày 21/11 demo ≤7 phút/viva ≤8 phút.

Nguồn: đề chính thức mục 5.2, 6, 8, 11, 12; Progress Check v1.0.6 và erratum #28. Không có thao tác tự merge, phát hành hoặc nộp được ẩn trong script chuẩn bị.
