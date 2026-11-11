> **Đây là bản sao đóng băng (starter) dùng cho Bài kiểm tra Hackathon (BKT-2 /
> Track B) môn Kỹ thuật Phần mềm Ứng dụng (KTPMUD) — KHÔNG phải ứng dụng thật
> đang vận hành, không kết nối tới dữ liệu/CSDL production thật.** Toàn bộ tên
> người và ảnh thật trong bản gốc đã được thay bằng dữ liệu hư cấu trước khi
> công khai repo này. Sinh viên làm việc trên fork của repo NÀY, nộp bài qua
> `ktpmud-project` theo đúng hướng dẫn `nop_bai.md` của KTPMUD — không PR vào
> ứng dụng Vườn Toán thật.

---

# Phần mở rộng của nhóm N57 — Track B

Nhóm bổ sung bài **Ước lượng trước khi tính đúng** ngay trong Phòng Luyện Tập. Học sinh làm 12 câu nhân và chia qua ba chặng, chọn khoảng rồi nhập đáp số. Server lưu từng bước theo tài khoản để học sinh có thể tiếp tục sau khi quay lại. Bài có gợi ý, phản hồi riêng cho hai bước và chức năng xem lại câu đã làm.

Để demo, đăng nhập bằng tài khoản học sinh mẫu, vào **Phòng Luyện Tập** và chọn **Ước lượng trước khi tính đúng**. [Kịch bản PC-1](docs/PC1-DEMO.md)

Bộ test logic và API đạt **8/8** trên bản checkout sạch. Báo cáo ghi riêng các luồng đã thử trên trình duyệt và các ca dự kiến bổ sung trước CP2. [Báo cáo kiểm thử](TEST_REPORT.md) · [Tiến độ](progress/PROGRESS.md) · [Đóng góp](CONTRIBUTIONS.md)

---

# 🌱 Vườn Toán Lớp 3 — Trường Tiểu học Hoàng Mai

Web học Toán lớp 3 gồm giao diện học sinh (bài học, luyện tập, kiểm tra, trò chơi, bảng xếp hạng)
và khu vực giáo viên (theo dõi lớp, cấp tài khoản). Đợt 1 đã nối **backend thật**:
đăng nhập/đăng xuất, chấm điểm trên server, lưu điểm & tiến độ vào cơ sở dữ liệu SQLite.

## 1. Cách chạy

Yêu cầu: máy có **Node.js 18+**. Trên **Windows x64**, dùng **Node.js 22** để nhận bản dựng sẵn của `better-sqlite3@11.10.0` đã khóa trong repo.

```bash
npm ci          # cài đúng phiên bản từ package-lock.json
npm start       # mở http://localhost:3000
```

Lần chạy đầu, server tự tạo `data/vuon-toan.db` và nạp dữ liệu mẫu từ `data/seed.json`.

**Windows báo `Could not locate the bindings file`:** npm 12 chỉ chạy script cài đặt cho gói đã được cho phép. Repo cho phép riêng `better-sqlite3@11.10.0`. Phiên bản này có tệp dựng sẵn cho Node 22 trên Windows x64, còn Node 24 phải biên dịch tại máy nếu dùng đúng phiên bản khóa.

Để chạy đúng phiên bản repo trên Windows mà không cần đổi Node toàn máy, tải và giải nén [Node.js 22 Windows x64 ZIP](https://nodejs.org/dist/latest-v22.x/), rồi mở CMD trong thư mục dự án. Thay đường dẫn dưới đây bằng **thư mục chứa `node.exe`** đã giải nén:

```cmd
set "PATH=C:\duong-dan\den\node-v22.x-win-x64;%PATH%"
node -v
npm ci
npm start
```

`node -v` cần hiện `v22.x.x`. Thay đổi PATH chỉ có hiệu lực trong cửa sổ CMD hiện tại.

### Tài khoản mẫu

| Vai trò | Tên đăng nhập | Mật khẩu | Ghi chú |
|---|---|---|---|
| Học sinh | `hocsinh01` … `hocsinh99` | `123456` | 99 tài khoản giả lập lớp 3A2, dùng cho test/demo hackathon — không phải học sinh thật |
| Giáo viên | `giaovien01` | `123456` | Vào thẳng Góc Giáo Viên |

> Khi đưa lên Internet thật: đổi mật khẩu các tài khoản mẫu, và đặt biến môi trường
> `SESSION_SECRET` bằng một chuỗi bí mật dài trước khi chạy `npm start`.

### Demo Track B — Ước lượng trước khi tính đúng

Từ checkout sạch, chạy `npm ci`, `npm test` rồi `npm start`. Mở http://localhost:3000, đăng nhập bằng tài khoản học sinh mẫu ở trên và chọn **Phòng Luyện Tập** → **Ước lượng trước khi tính đúng**. Có thể mở trực tiếp http://localhost:3000/exercise.html#uoc-luong sau khi đăng nhập. Trên Windows x64, dùng Node.js 22 như trong [hướng dẫn phát triển](docs/DEVELOPMENT.md).

1. Ở câu đầu `6 × 7`, mở **Gợi ý của Ong Vàng**. Chọn **60–88** và bấm **Tiếp tục**.
2. Tải lại trang, nhập **42** rồi chọn **Nộp đáp số**. Kết quả cho thấy khoảng chưa hợp lý và đáp số đúng. Mở **Xem cách nhẩm** để đọc lời giải.
3. Bấm **Về phòng luyện tập** rồi mở lại thẻ ước lượng để tiếp tục. Sau 12 câu, tổng kết đếm riêng số ước lượng hợp lý và số tính đúng.

Test tự tạo DB tạm. Để demo từ câu 1, dùng tài khoản mẫu chưa làm bài hoặc chạy dev với một DB riêng. Kết quả ước lượng được lưu riêng với điểm và sao của phiếu cũ.

**Dành cho giảng viên:** [Hồ sơ nộp Track B](docs/SUBMISSION.md) dẫn đến yêu cầu, ADR, báo cáo test, checklist, nhật ký AI và đóng góp. Có thể kiểm chứng MVP theo [kịch bản demo](docs/PC1-DEMO.md) và [báo cáo tiến độ](progress/PROGRESS.md).

## 2. Cấu trúc thư mục

```
vuon-toan-lop-3/
├─ public/                    # Giao diện (server phục vụ thư mục này)
│  ├─ *.html                  # Mỗi trang 1 file, CHỈ chứa nội dung trang
│  └─ assets/
│     ├─ css/app.css          # CSS nền dùng chung (trước đây lặp trong 11 file)
│     └─ js/
│        ├─ tailwind.config.js  # Cấu hình Tailwind dùng chung 1 chỗ duy nhất
│        ├─ core/  (api.js = gọi API, app.js = đăng nhập + nối link, game-score.js = lưu điểm game)
│        ├─ components/ (navbar.js, sidebar.js=bản đồ link, footer.js dùng chung)
│        └─ pages/  (logic riêng từng trang: login.js, exercise.js, exam.js,...)
├─ public/lesson.html       # Trang làm bài chung cho bộ đề giáo viên tự tạo
├─ server/
│  ├─ index.js   # Điểm vào: API /api/* + phục vụ giao diện
│  ├─ db.js      # Tạo bảng + nạp dữ liệu mẫu vào SQLite
│  ├─ auth.js    # Cookie đăng nhập httpOnly, băm mật khẩu bcrypt
│  └─ api.js     # Toàn bộ API (đăng nhập, bài học, nộp bài, giáo viên...)
├─ data/
│  ├─ seed.json      # DỮ LIỆU GỐC: tài khoản mẫu, bài học, câu hỏi
│  └─ vuon-toan.db   # CSDL SQLite (tự sinh khi chạy; sao lưu = chép file này)
├─ tools/build-from-original.py  # Dựng lại giao diện từ bản gốc khi cần
├─ original-backup/  # NGUYÊN BẢN code cũ trước khi sửa (để đối chiếu/khôi phục)
└─ HUONG-DAN-THEM-BAI.md  # Cách thêm bài học/câu hỏi mới
```

## 3. API chính

| Method | Đường dẫn | Mô tả |
|---|---|---|
| POST | `/api/auth/login` · `/api/auth/logout` | Đăng nhập (cookie httpOnly) / đăng xuất |
| GET | `/api/auth/me` | Thông tin người đang đăng nhập |
| GET | `/api/lessons`, `/api/me/progress` | Bài học kèm tiến độ, khóa/mở theo thứ tự |
| GET | `/api/question-sets/:id/questions` | Câu hỏi — **không kèm đáp án** |
| POST | `/api/submissions` | Nộp bài; server chấm, lưu điểm, cộng sao theo tiến bộ |
| GET | `/api/leaderboard` | Bảng xếp hạng tính từ sao thật trong DB |
| GET/POST | `/api/teacher/students` | Giáo viên xem / cấp tài khoản học sinh |
| POST | `/api/teacher/students/:id/reset-password` | Giáo viên đặt lại mật khẩu |

## 4. Đã làm ở Đợt 1 (cốt lõi)

- Tách cấu hình Tailwind + CSS + JS dùng chung (trước: sao chép vào cả 11 file HTML);
  sửa tên file sai chính tả (`excersise→exercise`, `leadboard→leaderboard`, `schudule→schedule`).
- Nối lại toàn bộ link menu từng là `href="#"` sang trang thật.
- Backend Node.js + Express + SQLite; mật khẩu băm bcrypt; phân quyền học sinh/giáo viên.
- Trang chủ render bài học từ API; luyện tập & kiểm tra (20 câu, đếm giờ, tự nộp khi hết giờ)
  chấm điểm trên server và lưu tiến độ — tải lại trang không mất điểm.
- Góc Giáo Viên: xem danh sách lớp với điểm trung bình thật, **cấp tài khoản + đặt lại mật khẩu** cho học sinh.

## 5. Đợt 2 (đã hoàn thành)

- **4 mini-game chơi thật & lưu điểm**: Bắn Bóng (10 vòng phép nhân), Đua Xe (chọn cổng đáp án),
  Lật Thẻ Trí Nhớ (ghép cặp phép tính–kết quả), Câu Cá (10 vòng phép chia). Điểm gửi lên server,
  sao chỉ cộng theo phần vượt kỷ lục cũ của từng em.
- **Bảng xếp hạng render 100% từ dữ liệu thật** (`/api/leaderboard`): hạng, lượt làm bài, điểm TB, tổng sao.
- **Trang làm bài chung `lesson.html`**: mọi bộ đề giáo viên tạo đều làm được tại đây
  (`lesson.html?lesson=bai-16&set=...`), hỗ trợ trắc nghiệm / điền số / điền dấu / tô màu.
- **Quản trị trên web (Góc Giáo Viên)**: thêm/sửa/xóa bài học, tạo bộ đề, thêm/sửa/xóa câu hỏi,
  xuất báo cáo lớp ra CSV mở bằng Excel. Học sinh không vào được khu vực này.

## 6. Đợt 3 (đã hoàn thành)

- **Đăng nhập dự phòng 2 lớp**: cookie httpOnly + Bearer token trong trình duyệt
  (tự động dùng khi cookie bị chặn, ví dụ xem qua khung iframe/xem trước).
- **Thống kê lớp thật** (`/api/teacher/analytics`): 4 thẻ KPI đầu trang Góc Giáo Viên đã là số thật,
  thêm biểu đồ lượt làm bài 7 ngày, top 3 dạng bài hay sai nhất, tiến độ từng bài học.
  Hai khối biểu đồ/chẩn đoán mẫu cũ được ẩn để tránh nhầm số liệu.
- **CSS Tailwind tĩnh** (`assets/css/tailwind.build.css`, chạy `npm run build:css` để gói lại):
  phòng máy mất Internet giao diện vẫn giữ nguyên; CDN chỉ còn là lớp dự phòng.
- **Sẵn sàng deploy**: endpoint `/api/health`, hỗ trợ `DB_PATH` cho ổ đĩa bền,
  `Dockerfile` + `DEPLOY.md` (VPS/Render/Railway, việc cần làm với `SESSION_SECRET` và mật khẩu mẫu).

## 7. Nếu muốn làm tiếp

- Nhúng font/icon tại chỗ để offline 100% cả chữ và biểu tượng.
- Thực hiện deploy thật (cần tài khoản hosting/tên miền của trường).
- Thêm biểu đồ theo tuần/tháng và xuất phiếu bồi dưỡng PDF theo dạng bài hay sai.
