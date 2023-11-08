## 開發工具
   - 前端: HTML、Javascript、CSS

   - 切版: CSS、SCSS、Bootstrap

   - 環境: React.js、Node.js

   - 後端技術: express.js、PHP、Mysql、Apache、RESTful API

   - 版本管理: Git

   - 系統架構: 前後端分離

   - API測試: PostMan


## 功能說明(持續擴展中)
### 1.系統概述(System Discription):  <br>
用戶首先登入此系統，將會判別該用戶權限再進行轉導頁面查看病患資料，如為管理員身分便能對該病患資料進行相關編輯動作，管理員可透過面板新增一筆病患資料且手動輸入相關資訊。
<BR>

|系統架構圖|
|--|
|![]((/aseets/architecture.png "plain text")|

### 2.系統角色說明(Role):<BR>

   - **放射師(Visitor)**
       - 瀏覽、查看資料內容，eg.上傳時間、上傳者、報告內容等等。
<br>

   - **醫師、主任、組長(Editor)**
      - 對<ins>病患相關資料</ins>進行增加、刪除、編輯、查看動作，eg.病患是否住院觀察、出入院時間、修改報告內容等等。  
<br>

   - **病患(Data)**
      - 病例、個資，作為資料被記載到此系統，並存入資料庫紀錄。

<BR>

### 2-1 角色架構圖(Hierarchy)

![Image](/aseets/RIS_hierarchy.png "plain text")

<BR>

### 3.功能與限制(Functions and Limitation):

| 上傳方式 | 接收類型 | 格式化類型 | 上傳數量(per) |   說明 |
|   :--:    |  :--: |    :--:    |    :--:      |  :--: |
| File(s)   | Plain/text |   Json    |     1n       | 每次可接收單/多筆資料|
| Directory | Plain/text |   Json    |     1        | 可接收上傳資料夾，內部n筆資料|
| .Zip      | Plain/text |   Json    |     1        | 每次只接收一筆壓縮檔，可多層壓縮，內部n筆資料|

<BR>

> #### 報告規範
文字報告分為3種區塊Additional、Findings、Impression(Imp)、AJCC edition讓我們轉換成json格式。
- 分類
  - Additional: 補充額外資訊。
  - Findings: 作為後續摘要格式。
  - Impression(Imp): 重點發現。
  - AJCC edition: 如有發現該病患有癌症，透過TNM記錄腫瘤擴散位置。[AJCC EDITION](https://iconcancercentre.hk/zh-hant/brochure/cancer-staging-explained/#%e7%94%9a%e9%ba%bc%e6%98%af%e7%99%8c%e7%97%87%e5%88%86%e6%9c%9f)

 
 |純文字報告|轉換後json|
|--|--|
|![](/aseets/before.png "plain text")|![](/aseets/after.png "Formatted text")|

<BR>


### 4.流程圖、EERD

