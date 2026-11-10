# Phát triển cục bộ trên Windows

Với bản cài mới trên Windows x64, dùng Node.js 22 để khớp bản dựng sẵn
của `better-sqlite3@11.10.0` trong lockfile.

```powershell
npm.cmd ci
npm.cmd run dev
```

Mở [Vườn Toán](http://127.0.0.1:3000). Lệnh dev tự khởi động lại khi
module backend thay đổi. Trình duyệt tự tải lại toàn trang sau khi sửa
HTML, JS, CSS hoặc tài nguyên trong `public/`, và sau khi backend khởi động lại.
Tailwind được biên dịch tự động vào thư mục tạm khi sửa nội dung dùng để tạo CSS.
Chạy `npm.cmd run build:css` khi cần cập nhật CSS tĩnh dùng để triển khai.

Server dev chỉ lắng nghe trên máy cục bộ và mặc định lưu dữ liệu thử vào
`data/vuon-toan.dev.db`. Có thể chỉ định cổng hoặc DB khác bằng `PORT`
và `DB_PATH`. `npm.cmd start` vẫn dùng cấu hình chạy thông thường.

Chạy `npm.cmd test` để kiểm thử API với cơ sở dữ liệu tạm. Kiểm thử trên
trình duyệt với tài khoản mẫu ghi trong README, rồi kiểm tra `git status`
và xem diff trước khi commit.
