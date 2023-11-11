/**
 * 將時間編碼成格式化字符串
 * @param {object} date 時間物件
 * @return {object}
 */
function formatDateTime(date) {
  //對時間格式化，用於儲存資料庫
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');
  let hours = date.getHours().toString().padStart(2, '0');
  let lateHours = (date.getHours() + 2).toString().padStart(2, '0');
  let minutes = date.getMinutes().toString().padStart(2, '0');
  let seconds = date.getSeconds().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  const formattedExpiresDate = `${year}-${month}-${day} ${lateHours}:${minutes}:${seconds}`;
  return { formattedDate, formattedExpiresDate };
}

/**
 * 將物件資料編碼成字符串
 * @param {object} jsonData 資料物件
 * @return {string}
 */
function encodeJson(jsonData) {
  //編碼成base64進行傳輸
  const jsonStr = JSON.stringify(jsonData);
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(jsonStr);
  const base64Encoded = btoa(String.fromCharCode.apply(null, encodedData));
  return base64Encoded
}


module.exports = { formatDateTime, encodeJson };