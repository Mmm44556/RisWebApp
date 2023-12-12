function deleteDisk(id) {
  //刪除緩存區所有文件
  return fetch(`${import.meta.env.VITE_VAR_BASE_URL}/dataList/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

}
function preProcessFiles(files, jsonBlob, { department,title }) {
  //先將拖曳區文件給server格式化後，緩存在server
  const uploadPromises = files.map((file) => {
    const formData = new FormData();
    formData.append(`file`, file, `${title}.json`);
    return fetch(`${import.meta.env.VITE_VAR_BASE_URL}/dataList/preProcess?depart=${(department || 'INTERNAL')}`, {
      method: 'POST',
      body: formData,

    });
  });

  return uploadPromises;
}

function uploadFiles(response) {
  const formData = new FormData();
  formData.append('response', response,'.json');

  return fetch(`${import.meta.env.VITE_VAR_BASE_URL}/dataList`, {
    method: 'POST',
    body: formData,

  });
}

export { preProcessFiles, deleteDisk, uploadFiles };