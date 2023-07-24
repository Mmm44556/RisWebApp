## 開發工具
<ul>
  <li>
    前端: HTML、Javascript、CSS
  </li>
  <li>
    切版: CSS、SCSS、Bootstrap
  </li>
  <li>
    環境: React.js、Node.js
  </li>
  <li>
    後端技術: AJAX(Non-RESTful API)、react-Query、PHP(No Framework)、Mysql
  </li>
  <li>
    版本管理: Git
  </li>
</ol>
</ul>

## 功能說明(持續擴展中)
### 系統概述(System Discription):  <br>
用戶首先登入此系統，將會判別該用戶權限再進行轉導頁面查看病患資料，如為管理員身分便能對該病患資料進行相關編輯動作，管理員可透過面板新增一筆病患資料且手動輸入相關資訊。
<BR>
### 功能與限制(Functions and Limitation):
CT報告接收類型


<BR>

### 系統角色說明(Role):<BR>
<ol>
  <li>
    使用者(User)
      <ul>
        <li>
          瀏覽、查看資料內容，eg.上傳時間、上傳者、報告內容等等。
        </li>
      </ul>
  </li>
  <li>
    管理員(Admin)
     <ul>
        <li>
         對<ins>病患相關資料</ins>進行增加、刪除、編輯、查看動作，eg.病患是否住院觀察、出入院時間、修改報告內容等等。
        </li>
     </ul>
  </li>
  <li>
    病患(Patient)
    <ul>
      <li>
        作為資料被記載到此系統，並存入資料庫紀錄。
      </li>
    </ul>
  </li>
    <li>
    醫師(Radiologist)
    <ul>
      <li>
        為病患撰寫CT報告且作為該報告撰寫者，再將其存入資料庫紀錄。
      </li>
    </ul>
  </li>
</ol>


