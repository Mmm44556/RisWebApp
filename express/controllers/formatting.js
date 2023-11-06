function formatDateTime(date) {
  var year = date.getFullYear();
  var month = (date.getMonth() + 1).toString().padStart(2, '0');
  var day = date.getDate().toString().padStart(2, '0');
  var hours = date.getHours().toString().padStart(2, '0');
  var minutes = date.getMinutes().toString().padStart(2, '0');
  var seconds = date.getSeconds().toString().padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function encodeJson(jsonData) {
  const jsonStr = JSON.stringify(jsonData);
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(jsonStr);
  const base64Encoded = btoa(String.fromCharCode.apply(null, encodedData));
  return base64Encoded
}


module.exports = { formatDateTime, encodeJson };