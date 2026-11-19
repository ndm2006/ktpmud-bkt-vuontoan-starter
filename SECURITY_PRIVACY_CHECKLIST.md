# Checklist bảo mật và dữ liệu — N57 / ADR-002

| Mục | Hiện trạng và bằng chứng |
|---|---|
| Synthetic | Giữ tài khoản seed và 12 phép toán giả lập; hồ sơ dùng alias N57-A/N57-B |
| Ownership | Middleware auth giữ nguyên, SQL lọc user_id từ phiên, lượt tài khoản khác trả 404; test API |
| Không lộ đáp án | publicQuestion allowlist cho đề và run trước nộp; không phục vụ fixture/data seed qua static; test I01 |
| Input | Khoảng phải thuộc câu; đủ 12; số nguyên 0–999 hoặc bỏ trống; reject ép kiểu mất nghĩa; prepared SQL |
| State/retry | Unique request key và unique active run; transaction immediate bao attempt/progress/sao/closure; test concurrency/rollback |
| Cache | API phục hồi lượt có Cache-Control: no-store; không lưu thêm token phía client |
| Nội dung thay đổi | Từ chối lượt đang làm bằng 409; kết quả hoàn tất đọc snapshot, không chấm lại |
| Phạm vi | auth.js, core auth, data/seed.json, Dockerfile, DEPLOY và route auth/teacher/admin phải giữ nguyên so với nền; đối chiếu diff trước push |
| Tệp cục bộ | .gitignore loại DB/journal/env, test-results và playwright-report; không thêm credential vào code/log |
| AI runtime | Không có; đáp án tính khi seed và chấm bằng code/DB |
| Dependency | npm audit fix chỉ vá lockfile tương thích; body-parser 1.20.9, postcss-selector-parser 6.1.5; npm audit báo 0 cảnh báo tại lần kiểm tra |

Giới hạn: không coi audit dependency là chứng nhận toàn bộ bảo mật. Các vấn đề nền ngoài scope auth/deployment không được sửa trong đợt này. Không kết nối production hoặc dữ liệu thật. Kết quả PC-1 trước sửa giữ trong Git; không dùng bằng chứng cũ chứng nhận bản hiện hành.
