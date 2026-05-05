## 🚀 Tính năng mới: Typing Indicator & Performance Tracking

Hệ thống đã được cập nhật cơ chế hiển thị trạng thái "đang suy nghĩ" (typing indicator) để tối ưu hóa trải nghiệm người dùng.

### 1. Cơ chế hoạt động
- **Kích hoạt**: Ngay sau khi người dùng gửi tin nhắn (delay ≤ 300ms).
- **Thanh tiến trình**: Hiển thị tiến trình ước tính (mô phỏng tốc độ xử lý của AI).
- **Cập nhật trạng thái**: 
  - 0-5s: "AI đang suy nghĩ..."
  - > 5s: Tự động đổi thành "AI vẫn đang suy nghĩ, vui lòng đợi thêm..." với hiệu ứng nhấp nháy màu vàng.
- **Không Timeout**: Hệ thống duy trì trạng thái chờ cho đến khi nhận được phản hồi từ AI, giúp xử lý các tác vụ phức tạp.
- **Timestamp**: Tất cả tin nhắn (User & AI) đều có mốc thời gian hiển thị.

### 2. Hướng dẫn QA Kiểm thử
#### Giao diện (UI)
- **Desktop**: Kiểm tra widget mở rộng ở góc phải màn hình. Đảm bảo indicator không đè lên nội dung chat.
- **Mobile**: Kiểm tra responsive trên Chrome DevTools (Mobile mode).
- **Dark/Light Mode**: Chuyển đổi theme trong phần Cài đặt (Settings) để kiểm tra độ tương phản của chữ và thanh tiến trình.

#### Chức năng (Functional)
1. Gửi tin nhắn và quan sát indicator xuất hiện gần như tức thì.
2. Đợi 5 giây để xác nhận dòng chữ thay đổi và đổi màu.
3. Quan sát thanh tiến trình chậm lại sau 15 giây nhưng không gây lỗi timeout.
4. Kiểm tra indicator biến mất ngay khi tin nhắn AI xuất hiện.

### 3. Benchmarking
Để chạy benchmark thủ công, mở Console trên trình duyệt và chạy:
```javascript
// Đo thời gian trung bình indicator xuất hiện
let times = [];
for(let i=0; i<10; i++) {
  let start = performance.now();
  showTyping().remove();
  times.push(performance.now() - start);
}
console.log("Average indicator latency:", times.reduce((a,b)=>a+b)/10, "ms");
```
*Mục tiêu: Delay trung bình ≤ 400ms.*

## Cấu trúc file

```
extension/
├── manifest.json       - Config extension
├── popup.html          - Giao diện bot
├── popup.js            - Logic chat + quản lý slot
├── content_script.js   - Cuộn trang + chụp màn hình
├── background.js       - Capture tab + gọi Claude API
└── icons/              - Icon extension
```
