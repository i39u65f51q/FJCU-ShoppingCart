# Description

網路服務程式設計 - 期末專題

**套件管理工具**

- 套件管理工具：npm
- 初始化套件工具：npm install

---

**前端**

- 啟動前端環境：npm run client
- 前端技術：HTML, CSS, JavaScript
- 檔案路徑：client/index.html

---

**後端**

- 啟動後端環境：npm run server
- 後端語言：Node.js ( TypeScript )
- 後端框架：Express
- 檔案路徑：server/index.ts

---

**API**

- 取得會員 id 資訊： api/member/:memberId
- 取得所有商品： api/products
- 取得所有訂單：api/orders

---

**頁面**

| 頁面     | 功能                             | 資料夾位置    | 權限   |
| -------- | -------------------------------- | ------------- | ------ |
| 登入     | 登入功能、帳號驗證               | page/login    | 無     |
| 註冊     | 新增使用者帳號                   | page/register | 無     |
| 主頁面   | 新增商品至購物車、建立訂單       | page/main     | 使用者 |
| 個人資料 | 修改個人帳號資料                 | page/member   | 使用者 |
| 訂單查詢 | 查詢個人訂單                     | page/order    | 使用者 |
| 訂單管理 | 查詢所有會員訂單、修改訂單狀態   | page/order    | 管理員 |
| 商品管理 | 新增商品、修改商品資訊、刪除商品 | page/product  | 管理員 |

test
