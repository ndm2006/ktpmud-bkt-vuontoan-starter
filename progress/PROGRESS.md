# PROGRESS — N57 — Track B

- Starter: `fossbk-spec/ktpmud-bkt-vuontoan-starter` · tag `bkt-2026-v1` · commit `057a48205f50f0f30d6260be1a44b343a167a3e7`
- Fork: https://github.com/ndm2006/ktpmud-bkt-vuontoan-starter
- Nhánh: `track-b-work`
- Bản chuẩn bị ngày 10/11/2026. Trạng thái phản ánh bằng chứng trên fork tại thời điểm cập nhật.

## PC-1 — 11/11/2026

Hồ sơ CP1 bổ sung theo [đính chính #25](https://github.com/fossbk-spec/ktpmud-project/issues/25): [REQUIREMENTS và tiêu chí nghiệm thu](../REQUIREMENTS.md), [kế hoạch kiểm thử](../TEST_PLAN.md), [ADR-001](../DECISIONS.md). M0 đã ghi trong [hồ sơ kickoff](../docs/M0-KICKOFF.md). Phạm vi CP1 chờ GV/TA duyệt.

### 1.1. Tiến độ theo acceptance criteria

| Mã | Trạng thái | Bằng chứng | Ghi chú |
|---|---|---|---|
| B-01 | Đang | [ADR-001](../DECISIONS.md) | Đã chọn tích hợp trong Phòng Luyện Tập. Chưa có giao diện mới. |
| B-02 | Đang | [Bảng 12 câu](../DECISIONS.md#quy-tắc-tạo-và-chấm) | Đã tính và đối chiếu bộ dữ liệu thiết kế. Chưa có fixture chạy. |
| B-03 | Đang | [ADR-001](../DECISIONS.md), [T02–T05](../TEST_PLAN.md) | Đã đặc tả quy tắc. Chưa chạy bộ chấm mới. |
| B-04 | Đang | [Hợp đồng API](../DECISIONS.md), [T06](../TEST_PLAN.md) | Đã xác định dữ liệu được trả ở từng bước. Chưa chạy test HTTP. |
| B-05 | Đang | [Mô hình lưu](../DECISIONS.md), [T05/T07–T09](../TEST_PLAN.md) | Đã thiết kế lưu hai bước, phục hồi và cách ly. Chưa chạy SQLite cho tính năng. |
| B-06 | Đang | [ADR-001](../DECISIONS.md), [T04/T10](../TEST_PLAN.md) | Đã đặc tả phản hồi riêng cho ước lượng và tính. Chưa có UI để kiểm tra. |
| B-07 | Đang | [Phạm vi](../REQUIREMENTS.md), [T11/T12](../TEST_PLAN.md) | Hồ sơ CP1 chỉ thay đổi tài liệu. Kiểm tra diff và hồi quy sau khi code. |
| B-08 | Đang | [Ma trận kiểm thử](../TEST_PLAN.md) | Đã soạn ca thông thường, ca biên, đầu vào lỗi và chấm. Chưa có test tự động mới. |
| B-09 | Chưa | [T13](../TEST_PLAN.md) | Chưa có script `npm test` trên fork. |
| B-10 | Chưa | [T14](../TEST_PLAN.md) | Chưa có workflow hoặc CI run của tính năng. |
| B-11 | Đang | [Phạm vi](../REQUIREMENTS.md), [T11](../TEST_PLAN.md) | Báo cáo dùng alias. Cần review dữ liệu và diff của phần triển khai. |
| B-12 | Đang | [Thiết kế giao diện](../DECISIONS.md), [T10](../TEST_PLAN.md) | Đã nêu bàn phím và báo lỗi. Chưa thử trên trình duyệt. |

### 1.2. Sửa đổi bắt buộc từ Checkpoint 1

Không có tại thời điểm lập bản chuẩn bị. Nhóm xác nhận chưa từng nộp CP1 và đang bổ sung hồ sơ theo #25. Khi nhận góp ý của GV/TA, cập nhật từng mục bắt buộc kèm bằng chứng.

### 1.3. Timeline dự kiến đến khi hoàn thành

| Việc | Vai trò phụ trách | Mốc | Ngày dự kiến |
|---|---|---|---|
| Bổ sung yêu cầu, tiêu chí nghiệm thu, ADR và kế hoạch test lên fork | N57-A, N57-B cùng đọc và kiểm tra | CP1 bổ sung | 10/11, trước 9:30 ngày 11/11 |
| Cập nhật báo cáo, trình bày tại lớp và xác nhận SHA trên Issue #17 | Cả nhóm | PC-1 | 11/11, 9:30–11:30 |
| Thêm fixture phía server, bộ chấm, API và SQLite | N57-A | M2 | 11–12/11 |
| Tích hợp Phòng Luyện Tập, phản hồi hai bước, phục hồi và bàn phím | N57-B | M2 | 12–14/11 |
| Test API/chấm/lưu, hồi quy UI, chạy test công khai và chuẩn bị demo nội bộ | N57-A, N57-B | CP2 | 14–15/11 |
| Hoàn thiện test, CI trên PR nội bộ, kiểm tra dữ liệu và tài liệu | N57-A, N57-B | M3 / PC-2 | 16–18/11 |
| Đối chiếu tiêu chí, chốt tag và SHA | Cả nhóm | Freeze | 19/11 trước 23:59 |
| Nộp một PR vào kho môn học, kiểm tra CI validate | Cả nhóm | M4 | 20/11 |
| Demo và vấn đáp | Cả nhóm | Demo/Viva | 21/11 |

### 1.4. Rủi ro / đang vướng

- CP1 bổ sung sau hạn gốc. Cần xác nhận phạm vi với GV/TA tại PC-1 và dành thời gian xử lý góp ý.
- Kiểm tra các phản hồi ở giữa hai bước để tránh lộ đáp số. Khi refresh hoặc nhấn nộp hai lần, server phải khôi phục đúng trạng thái và không ghi đè kết quả.
- Hiện chưa có kết quả thực thi của dạng bài mới. Demo phụ thuộc việc tích hợp UI, API và SQLite trước ngày 15/11.

### 1.5. Câu hỏi cho GV

- Q1: Với hồ sơ CP1 bổ sung theo #25, nhóm nên nhận và theo dõi phản hồi duyệt phạm vi ở đâu sau PC-1?
- Q2: Lưu kết quả ước lượng trong mục luyện tập riêng, giữ nguyên điểm và sao của phiếu cũ, có phù hợp phạm vi B-05 không?

### 1.6. Phân công

| Alias / vai trò | Đầu việc chính theo kế hoạch đã chốt | Commit/PR tiêu biểu |
|---|---|---|
| N57-A | Quy tắc chấm, API, lưu kết quả, kiểm chứng phần AI hỗ trợ | Chưa có commit triển khai cá nhân được xác minh |
| N57-B | Giao diện và kiểm thử luồng | Chưa có commit triển khai cá nhân được xác minh |

## PC-2 — 18/11/2026

### 2.1. Đối chiếu timeline PC-1

| Việc (theo bảng 1.3) | Kế hoạch | Thực tế | Lệch & lý do |
|---|---|---|---|

### 2.2. Tiến độ theo acceptance criteria

| Mã | Trạng thái | Bằng chứng | Ghi chú |
|---|---|---|---|

### 2.3. Sẵn sàng nộp bài

| Deliverable | Có / Chưa | Đường dẫn |
|---|---|---|
| README.md (cài đặt / chạy / test) | | |
| REQUIREMENTS.md | | |
| DECISIONS.md / ADR | | |
| Test tự động + CI xanh | | |
| TEST_REPORT.md | | |
| SECURITY_PRIVACY_CHECKLIST.md | | |
| AI_USE.md | | |
| CONTRIBUTIONS.md | | |
| Slide / demo script ≤ 7 phút | | |

### 2.4. Việc còn lại đến Freeze (23:59 19/11)

| Việc | Vai trò phụ trách | Hạn |
|---|---|---|

### 2.5. Rủi ro / câu hỏi cho GV

Điền tại PC-2.

## Kết quả cuối — Freeze 19/11/2026

- Tag: `bkt-2026-N57-rc1` (dự kiến) · SHA: điền tại Freeze.
- Trạng thái cuối từng AC: điền tại Freeze.
- Những việc trong timeline chưa hoàn thành và lý do: điền tại Freeze.
