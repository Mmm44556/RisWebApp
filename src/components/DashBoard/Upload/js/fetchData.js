

//獲取資料接口
const baseUrl = new URL('http://localhost/api');
const options = {
  headers: {
    'Accept': 'application/json;charset=utf-8',
  },
  
}

const iniFolders = async ({queryKey}) => {
  const data = await fetch(`${baseUrl.pathname}/initial.php`, options)
  const jsonData = await data.json();
  return jsonData;
}




const fetchData = (query) => async ({queryKey,signal}) => {
  const options2 = { ...options, signal }
  if (typeof (query) !== 'string' ){
    return Promise.reject(new Error('query is undefined!'))
  }
  const data = await fetch(`${baseUrl.pathname}/${query}`, options2)
  const jsonData = await data.json()
  console.log(jsonData)
  return jsonData

}


const createFolder = (url, dirName) => {

  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData()
      formData.append('folderName', dirName);
      const options2 = { ...options, method: "POST", body: formData }
      const data = await fetch(`${baseUrl.pathname}/${url}`, options2)
      resolve(data.json())
    } catch (error) {
      reject(new Error(error))
    }
  })
}


export { createFolder, fetchData, iniFolders }