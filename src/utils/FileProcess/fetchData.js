

//獲取資料接口
const baseUrl = new URL('http://localhost:8080/api');
const options = {
  headers: {
    'Accept': 'application/json;charset=utf-8',
  },

}

const iniFolders = async ({ queryKey }) => {

  const data = await fetch(`${baseUrl.href}/initial.php`, options)
  const jsonData = await data.json();
  return jsonData;
}




const fetchData = (query) => async ({ queryKey, signal }) => {
  const options2 = { ...options, signal }
  if (typeof (query) !== 'string') {
    return Promise.reject(new Error('query is undefined!'))
  }
  const data = await fetch(`${baseUrl.href}/${query}`, options2)
  const jsonData = await data.json()

  return jsonData

}


const createFolder = (url, dirName) => {

  return new Promise(async (resolve, reject) => {
    try {

      const formData = new FormData()
      formData.append('folderName', dirName);
      const options2 = { ...options, method: "POST", body: formData }
      const data = await fetch(`${baseUrl.href}/${url}`, options2)

      resolve(data.json())

    } catch (error) {
      reject(new Error(error))
    }
  })
}

const editedFetch = async (query, methodStr) => {
  const options2 = { ...options, method: methodStr }
  const data = await fetch(`${baseUrl.href}/${query}`, options2)
  const jsonData = await data.json();

  return jsonData
}

//上傳json檔案
async function postData(Json) {

  try {
    const response = await fetch(`${baseUrl.href}/json.php`, { ...options, method: 'POST', body: JSON.stringify(Json) })
    // console.log(response.json())
    return response;
  } catch (error) {
    console.log(error);
  }
}

export { createFolder, fetchData, iniFolders, editedFetch, postData }