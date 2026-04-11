# NectarApp — Lưu trữ cục bộ với AsyncStorage

**Họ tên:** Nguyễn Thị Khánh Linh
**MSSV:** 23810310394
**Môn:** Lập trình thiết bị di động
**Bài thực hành:** AsyncStorage — NectarApp

---

## 1. Mô tả chức năng

Ứng dụng NectarApp (bán trái cây / thực phẩm) được bổ sung các tính năng lưu
trữ cục bộ bằng `@react-native-async-storage/async-storage`:

### 1.1. Xác thực & Auto-login
- Khi đăng nhập thành công, thông tin user (tên + token) được lưu vào
  AsyncStorage ở key `USER`.
- Khi mở lại app, `App.js` gọi `getUser()` trong `useEffect` để kiểm tra — nếu
  có user thì bỏ qua luồng onboarding/login và vào thẳng màn Home.
- Khi nhấn Logout ở màn Account, gọi `removeUser()` để xoá toàn bộ dữ liệu
  (`USER`, `CART`, `ORDERS`) rồi trở lại onboarding.

### 1.2. Giỏ hàng
- Thêm sản phẩm vào giỏ từ `ProductDetail` → lưu vào AsyncStorage key `CART`.
- Mở lại `CartScreen` (kể cả sau khi kill app) dữ liệu vẫn được khôi phục qua
  `getCart()`.
- Tăng / giảm số lượng và xoá item đều cập nhật cả state lẫn AsyncStorage
  (`saveCart`).

### 1.3. Đơn hàng
- Khi bấm **Place Order** trong `CheckoutModal`, `handleCheckout` gọi
  `saveOrder({ items, total })` — mỗi đơn gồm:
  - `id` (timestamp)
  - `createdAt` (thời gian đặt)
  - `items` (sản phẩm + số lượng)
  - `total` (tổng tiền)
- Sau đó xoá giỏ hàng và điều hướng sang `OrderAcceptedScreen`.
- `OrdersScreen` load danh sách từ `getOrders()` và tự refresh khi focus — reload
  app vẫn còn đủ đơn.

---

## 2. Tổ chức code

```
thuchanh/
├── App.js                  # Auto-login, logout, điều hướng
├── LoginScreen.js          # saveUser khi login
├── CartScreen.js           # getCart / saveCart / saveOrder / removeCart
├── CheckoutModal.js        # UI checkout
├── OrdersScreen.js         # getOrders + reload on focus
├── AccountScreen.js        # Logout
└── services/
    └── storageService.js   # Toàn bộ hàm AsyncStorage (async/await + try/catch)
└── Screenshot/             # Toàn bộ ảnh + video
└── screens/                # Toàn bộ file js màn hình
```

## 3. Hướng dẫn chạy app

Yêu cầu: Node.js ≥ 18, Expo CLI, máy ảo Android/iOS hoặc Expo Go trên điện thoại.

```bash
# 1. Cài dependency
npm install

# 2. Chạy Expo
npm start

# 3. Chọn nền tảng
npm run android   # hoặc
npm run ios       # hoặc
npm run web
```

Sau đó quét QR bằng Expo Go hoặc mở trên simulator.

---

## 4. Ảnh demo + Video trong mục Screenshot

| # | Nội dung                                   | File                              |
|---|--------------------------------------------|-----------------------------------|
| 1 | Login thành công                           | `23810310394_01_login.png`        |
| 2 | Kill app → mở lại vẫn login                | `23810310394_02_autologin.png`    |
| 3 | Logout quay về login screen                | `23810310394_03_logout.png`       |
| 4 | Thêm sản phẩm vào giỏ                      | `23810310394_04_cart_add.png`     |
| 5 | Kill app → giỏ vẫn còn                     | `23810310394_05_cart_reload.png`  |
| 6 | Thay đổi số lượng                          | `23810310394_06_cart_qty.png`     |
| 7 | Đặt hàng thành công                        | `23810310394_07_order_placed.png` |
| 8 | Danh sách đơn hàng                         | `23810310394_08_orders_list.png`  |
| 9 | Reload app vẫn còn đơn hàng                | `23810310394_09_orders_reload.png`|

## 5. Trả lời câu hỏi lý thuyết

### 5.1. AsyncStorage hoạt động như thế nào?
AsyncStorage là hệ thống lưu trữ key-value **bất đồng bộ**, **không mã hoá**,
hoạt động theo module nền (native) của từng nền tảng:
- Trên Android, dữ liệu được lưu trong SQLite (hoặc RocksDB ở phiên bản mới).
- Trên iOS, dữ liệu được lưu trong một file plist/SQLite ở sandbox của app.
- Trên Web/Expo, fallback về IndexedDB hoặc localStorage.

Mọi thao tác đều trả về `Promise` — phải dùng `async/await` để đọc/ghi. Vì
chỉ lưu được chuỗi, ta phải `JSON.stringify` trước khi ghi và `JSON.parse`
sau khi đọc. Dữ liệu tồn tại qua các lần mở lại app, chỉ mất khi người dùng
xoá app hoặc code gọi `removeItem` / `clear`.

### 5.2. Vì sao dùng AsyncStorage thay vì biến state?
- `useState` chỉ sống trong **vòng đời của component**. Khi app bị kill hoặc
  component unmount, toàn bộ dữ liệu mất.
- AsyncStorage **persistent** — dữ liệu vẫn còn sau khi tắt/mở lại app, nên
  phù hợp cho: token đăng nhập, giỏ hàng, đơn hàng, cài đặt người dùng.
- State phù hợp cho UI tạm thời (input, modal, focus…); AsyncStorage phù
  hợp cho dữ liệu cần *tồn tại lâu dài*. Trong app này, ta dùng cả hai:
  state để render nhanh, AsyncStorage để lưu "nguồn sự thật".

### 5.3. So sánh AsyncStorage với Context API

| Tiêu chí              | AsyncStorage                          | Context API                                 |
|-----------------------|---------------------------------------|---------------------------------------------|
| Bản chất              | Lưu trữ cục bộ (ổ đĩa của thiết bị)   | Cơ chế chia sẻ state trong cây component    |
| Tính persistent       | Có — sống qua các lần mở lại app      | Không — mất khi app đóng                    |
| Kiểu dữ liệu          | Chỉ string (phải JSON.stringify)      | Bất kỳ giá trị JS                           |
| Truy cập              | Bất đồng bộ (async/await)             | Đồng bộ (`useContext`)                      |
| Mục đích              | Lưu dữ liệu lâu dài                   | Chia sẻ state giữa các component            |

Chúng **không thay thế nhau mà bổ sung cho nhau**: Context giúp truyền cart
xuống các screen mà không cần prop drilling, còn AsyncStorage giúp cart vẫn
còn sau khi kill app. Pattern thường dùng: khi app khởi động, đọc từ
AsyncStorage → nạp vào Context → các component dùng qua Context → mọi thay
đổi lại được ghi ngược lại AsyncStorage.

---
