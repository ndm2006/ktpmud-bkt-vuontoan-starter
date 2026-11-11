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

1. Lấy URL run **Track B tests** gần nhất trên PR nội bộ của fork MVP. Ghi URL và SHA vào báo cáo kiểm thử.
2. Dùng [mẫu Track B](https://github.com/fossbk-spec/ktpmud-project/tree/main/submissions/_TEMPLATE_BKT_VUONTOAN) để tạo `submissions/hoang_mai_toan_<ma_nhom>/`. Đặt sáu tệp hồ sơ vào `artifacts/`, đặt kịch bản demo trong `slides/` và điền `submission.json` theo đăng ký môn học.
3. Ở PC-2, điền đủ `source-ref.json`. Dùng giá trị thật cho `starter_repo`, `starter_commit`, `fork_url`, SHA PC-2 cho `final_commit`, tên tag dự kiến cho `release_tag` và URL CI gần nhất cho `ci_run_url`. Điền nội dung thực tế vào các tài liệu đang làm.
4. Từ fork của kho môn học, dùng nhánh `submit/hoang_mai_toan-<ma_nhom>` mở Draft PR vào `fossbk-spec/ktpmud-project`, chỉ thêm thư mục của nhóm. Trước **11:30 ngày 18/11**, xác minh `validate` đạt. Ghi URL Draft PR vào mục 2.3 của báo cáo tiến độ và thêm dòng `Draft PR: <URL>` vào bình luận xác nhận PC-2. [Issue #18](https://github.com/fossbk-spec/ktpmud-project/issues/18) · [Đính chính #28](https://github.com/fossbk-spec/ktpmud-project/issues/28)
5. Trước **23:59 ngày 19/11**, chốt SHA 40 ký tự, gắn tag `bkt-2026-N57-rc1` và lấy URL CI của SHA freeze. Ngày **20/11**, cập nhật `source-ref.json` và tài liệu trong cùng Draft PR, chuyển sang Ready for review và xác minh `validate` đạt. [Đính chính #25](https://github.com/fossbk-spec/ktpmud-project/issues/25) · [Đính chính #28](https://github.com/fossbk-spec/ktpmud-project/issues/28)

Căn cứ: [đề chính thức, mục 6, 8, 11 và 12](https://fossbk-spec.github.io/ktpmud-book/exams/KTPMUD_Hack_Marathon_2026_De_Thi_Chinh_Thuc_v1.0.0_20261103.html).
