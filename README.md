
# --醫療告報管理系統--

上傳、查看非格式化醫療報告(.txt)，依據身份權限對該資料進行相關編輯動作。

* <a href="#tools">開發工具</a>
* <a href="#features">系統特色</a>
   * <a href="#system-architecture">架構圖</a>
   * <a href="#category">角色架構、報告分類、部門類型</a>
* <a href="#func-limitation">功能與限制</a>
* <a href="#standards">報告規範</a>
* <a href="#FAQ">疑問回答(FAQ)</a>

## 1.開發工具 ( Tools )
**前端:** HTML、Javascript、CSS、React

**切版:** CSS、SCSS、Bootstrap、stlyed-components

**後端技術:** Node、Express、Mysql、RESTful API

**系統架構:** 前後端分離

**環境測試:** Apache

**雲端服務:** Google Cloud(SQL)、Firebase

**API測試:** PostMan

**版本管理:** Git




<h2 id="features">2.系統特色 ( Features ) </h2> 

- 上傳、編輯功能
- 報告分析
- 登入系統
- 醫療報告分類
- 後台身份管理



<h2 id="system-architecture">3.系統架構圖 ( System Architecture )</h2>
 
![Image](/aseets/architecture.png "architecture text")


<h2 id="category">4.系統角色說明、報告分類、部門類型 ( Role、Type、Department )</h2>

   - **放射師(Visitor)**
       - 瀏覽、查看資料內容。e.g.上傳時間、上傳者、報告內容等等。


   - **醫師、主任、組長(Editor)**
      - 對**病患相關資料**進行增加、刪除、編輯、查看動作。  e.g.病患是否住院觀察、修改報告內容等等。  

   - **病患(Data)**
      - 病例、個資，作為資料被記載到此系統，並存入資料庫紀錄。

|角色架構圖(Role Hierarchy)|
|:-------------------------------------:|
| ![Image](/aseets/RIS_hierarchy.png "plain text") |


## 4-1 報告類型
 - 急診 (Emergency Room): **ER**
 - 門診 (Outpatient Department): **OPD**
 - 健檢 (Physical Examination): **PE**
 - 體檢 (Medical Check): **MC**
 - 住院 (Inpatient): **IP** 
## 4-2 部門類型
 - 內科(INTERNAL)
 - 外科(SURGERY)
 - 骨科(ORTHOPEDICS)
 - 放射科(RADIOLOGY)
 - 臨床醫師未提回(PROPOSALS)
 - 報告覆閱工作(REVIEWS)

 <h2 id="func-limitation">5.功能與限制(Functions and Limitation)</h2>

| 上傳方式 | 接收類型 | 格式化類型 | 上傳數量(per) |   說明 |
|   :--:   |  :--: |    :--:    |    :--:      |  :--: |
| File(s)  | Plain/text |   Json    |     1n   | 每次可接收單/多筆資料|

<h2 id="standards">6.報告規範 ( Report Standards ) </h2>

屬**放射科**的報告分為3種區塊Additional、Findings、Impression(Imp)、AJCC edition，最後再轉換成json格式。
- 分類
  - Additional: 補充額外資訊。
  - Findings: 作為後續摘要格式。
  - Impression(Imp): 重點發現。
  - AJCC edition: 如有發現該病患有癌症，透過TNM記錄腫瘤擴散位置。[AJCC EDITION](https://iconcancercentre.hk/zh-hant/brochure/cancer-staging-explained/#%e7%94%9a%e9%ba%bc%e6%98%af%e7%99%8c%e7%97%87%e5%88%86%e6%9c%9f)

 
 |純文字報告|轉換後json|
|--|--|
|![](/aseets/before.png "plain text")|![](/aseets/after.png "Formatted text")|


<h2 id="FAQ">FAQ</h2>

#### 開發此系統的契機 ? 

大四學期末時被朋友邀請一起去跟指導教授共同開發項目，剛好教授手邊也有跟醫療產業的相關的專案，雖然因時間問題最後沒有使用上該項目，想著這樣挺可惜的所以就延續把這套系統繼續完成。

#### 開發過程中遇到的困難 ?

其實挺多的，關於系統流程會需要想未來還會考慮到哪些問題會遇到，包括身份驗證、用戶後台、報告儲存結構、如何部署等等，雖然現在都有AI可以解答部分答案，但其中最讓我印象深刻的應該是**程式碼結構**，如何將組件更有效的運用與設計以及後端API如何設計都是當初花蠻多時間去解答的。

#### 此系統是否有存在缺陷 ?

是的，關於架構是其一，設計時對於相關經驗不熟悉導致整體架構會不夠嚴謹但過程中也爬過相關知識也讓我吸收到很多新知，其二就是功能的部分，考慮到時間成本問題也不想花太多時間在這作品上，在功能部分沒能做的更詳細。

## 作者

- [@Mmm44556](https://www.github.com/Mmm44556)

