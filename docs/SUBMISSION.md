# Hồ sơ nộp Track B — Nhóm N57

- Starter: `fossbk-spec/ktpmud-bkt-vuontoan-starter`, tag `bkt-2026-v1`, SHA `057a48205f50f0f30d6260be1a44b343a167a3e7`.
- Fork: [ndm2006/ktpmud-bkt-vuontoan-starter](https://github.com/ndm2006/ktpmud-bkt-vuontoan-starter), nhánh làm việc `track-b-work`.
- Bản sản phẩm: [Ước lượng trước khi tính đúng](PC1-DEMO.md), tích hợp trong Phòng Luyện Tập.
- N57-A đã kiểm tra MVP và hồ sơ tại `5abd6d3`. N57-B đã kiểm thử và đồng ý chốt bố trí giao diện. Xác nhận của hai thành viên được ghi ở `d34b035`. [Đóng góp](../CONTRIBUTIONS.md) · [CI đạt trên bản MVP](https://github.com/ndm2006/ktpmud-bkt-vuontoan-starter/actions/runs/42865197833).

| Giảng viên cần xem | Tệp trong fork |
|---|---|
| Chạy và test | [README](../README.md), [môi trường phát triển](DEVELOPMENT.md) |
| Phạm vi và tiêu chí | [REQUIREMENTS.md](../REQUIREMENTS.md), [TEST_PLAN.md](../TEST_PLAN.md) |
| Thiết kế và lựa chọn | [DECISIONS.md](../DECISIONS.md) |
| Kiểm thử và giới hạn | [TEST_REPORT.md](../TEST_REPORT.md), [workflow CI](../.github/workflows/track-b.yml) |
| Bảo mật, AI và đóng góp | [SECURITY_PRIVACY_CHECKLIST.md](../SECURITY_PRIVACY_CHECKLIST.md), [AI_USE.md](../AI_USE.md), [CONTRIBUTIONS.md](../CONTRIBUTIONS.md) |
| Demo và tiến độ | [Kịch bản demo](PC1-DEMO.md), [PROGRESS.md](../progress/PROGRESS.md) |

## Từ fork đến bài nộp cuối

1. Mở PR trong fork và lấy URL run **Track B tests** thành công, xác nhận run khớp với bản chốt. Ghi link vào báo cáo kiểm thử. Nếu bổ sung tài liệu sau run, kiểm tra CI lại trên bản định chốt.
2. Chốt SHA 40 ký tự của bản đã kiểm chứng trên fork và gắn tag `bkt-2026-N57-rc1` trước Freeze. Xác nhận mã nhóm nộp và tag theo đăng ký của nhóm trước khi tạo.
3. Dùng [mẫu Track B](https://github.com/fossbk-spec/ktpmud-project/tree/main/submissions/_TEMPLATE_BKT_VUONTOAN) trong kho môn học để tạo đúng thư mục `submissions/hoang_mai_toan_<ma_nhom>/`. Đặt sáu tệp yêu cầu, ADR, báo cáo test, checklist, nhật ký AI và đóng góp vào `artifacts/`. Đặt kịch bản demo trong `slides/`. Điền `submission.json` theo đăng ký chính thức và quy định công khai của môn học.
4. Điền `source-ref.json` theo mẫu với `starter_repo`, `starter_commit`, `fork_url`, `final_commit`, `release_tag` và `ci_run_url`. Ba giá trị cuối lấy từ SHA, tag và run thực tế. Chưa có đủ bằng chứng để chốt tệp này.
5. Gửi một PR vào `fossbk-spec/ktpmud-project`, chỉ đổi thư mục bài nộp của nhóm. Kiểm tra CI `validate`. PC-1 và PC-2 dùng báo cáo tiến độ và issue xác nhận tương ứng, theo [đính chính #25](https://github.com/fossbk-spec/ktpmud-project/issues/25).

Căn cứ: [đề chính thức, mục 6, 8, 11 và 12](https://fossbk-spec.github.io/ktpmud-book/exams/KTPMUD_Hack_Marathon_2026_De_Thi_Chinh_Thuc_v1.0.0_20261103.html).
