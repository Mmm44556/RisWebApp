import { useQueryClient } from '@tanstack/react-query';
import { editedFetch } from '../utils/FileProcess/fetchData';


export function useEditedFiles(setConfirmModal, setCountFiles, setHoverEdited, path, file) {
  const client = new useQueryClient();
  const copyArr = [...path];
  copyArr.push(file.text);
  const pathStr = copyArr.join('\\');

  const deleteFn = async () => {
    setConfirmModal(true)
    if (file.type !== 'file') {

      //獲取資料夾內部剩餘檔案(僅限該層)
      let restFiles = await editedFetch(`layer.php?folderName=${pathStr}`, 'GET');
      setCountFiles(() => {
        if (restFiles[0].type == 0) return 0
        return restFiles.length
      });
      // console.log('deleteFn on Dir:', fileObj, restFiles)
    }

  }
  const renameFn = () => {
    setConfirmModal(true)
    console.log('renameFn:', file)
  }

  const confirm = async () => {

    const response = await editedFetch(`delete.php?deletedPath=${pathStr}`, 'DELETE');

    if (response.state == 'done') {

      setConfirmModal(false)
      if (path.length === 1) {
        client.invalidateQueries(["dataFolderRoot", { "directory": "initial.php" }])
      }
      const querySearch = [...path];
      const queryStr = querySearch.join('\\')

      client.invalidateQueries(["dataFolderRoot", { "directory": `layer.php/?folderName=${queryStr}` }])
    }

  }
  const onExited = () => {
    setHoverEdited((v) => {
      v[file.id].selected = false;
      v[file.id].bg = false;
      return [...v];
    })

  }
  return { deleteFn, renameFn, confirm, onExited }

}