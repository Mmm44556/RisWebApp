## 開發工具
   - 前端: HTML、Javascript、CSS

   - 切版: CSS、SCSS、Bootstrap

   - 環境: React.js、Node.js

   - 後端技術: AJAX(Non-RESTful API)、react-Query、PHP(No Framework)、Mysql

   - 版本管理: Git


## 功能說明(持續擴展中)
### 1.系統概述(System Discription):  <br>
用戶首先登入此系統，將會判別該用戶權限再進行轉導頁面查看病患資料，如為管理員身分便能對該病患資料進行相關編輯動作，管理員可透過面板新增一筆病患資料且手動輸入相關資訊。
<BR>

### 2.系統角色說明(Role):<BR>

   - **使用者(User)**
       - 瀏覽、查看資料內容，eg.上傳時間、上傳者、報告內容等等。
<br>

   - **管理員(Admin)**
      - 對<ins>病患相關資料</ins>進行增加、刪除、編輯、查看動作，eg.病患是否住院觀察、出入院時間、修改報告內容等等。  
<br>

   - **病患(Patient)**
      - 作為資料被記載到此系統，並存入資料庫紀錄。
<br>

   - **醫師(Radiologist)**
      - 為病患撰寫CT報告且作為該報告撰寫者，再將其存入資料庫紀錄。

<BR>

### 3.功能與限制(Functions and Limitation):
| 上傳方式 | 接收類型 | 格式化類型 | 上傳數量(per) |   說明 |
|   :--:    |  :--: |    :--:    |    :--:      |  :--: |
| File(s)   | Plain/text |   Json    |     1n       | 每次可接收單/多筆資料|
| Directory | Plain/text |   Json    |     1        | 可接收上傳資料夾，內部n筆資料|
| .Zip      | Plain/text |   Json    |     1        | 每次只接收一筆壓縮檔，可多層壓縮，內部n筆資料|

<BR>

|![](/aseets/before.png "plain text")|![](/aseets/after.png "Formatted text")|
|--|--|
