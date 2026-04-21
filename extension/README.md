# 🛍️ ShopBot - Extension So Sánh Sản Phẩm

## Cài đặt trên Chrome

1. Mở Chrome → vào địa chỉ: `chrome://extensions/`
2. Bật **Developer mode** (góc trên phải)
3. Bấm **Load unpacked**
4. Chọn thư mục `extension` này
5. Extension sẽ xuất hiện trên thanh công cụ Chrome

## Cấu hình API Key

1. Bấm vào icon ShopBot trên Chrome
2. Vào tab ⚙️ **Cài đặt**
3. Nhập Anthropic API Key (lấy tại https://console.anthropic.com)
4. Bấm **Lưu API Key**

## Cách sử dụng

1. Mở trang sản phẩm trên **Shopee / Lazada / Tiki**
2. Bấm icon ShopBot → bấm **📸 Chụp trang này**
3. Bot tự động cuộn trang + chụp toàn bộ
4. Lặp lại với tối đa **5 sản phẩm**
5. Vào tab **💬 So sánh** → hỏi bot để so sánh

## Ví dụ câu hỏi

- "So sánh tất cả sản phẩm đã lưu"
- "Sản phẩm nào đáng mua nhất? Cho điểm từng cái"
- "Cái nào có giá tốt nhất so với chất lượng?"
- "Tóm tắt ưu và nhược điểm của từng sản phẩm"

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
