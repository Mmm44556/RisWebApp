import { useCallback } from "react"

export function useList(setDirName, setPath) {
  const root = useCallback(() => {
    //根目錄退步

    setPath(v => {
      if (v.length === 1) {
        return v
      } else if (v.length === 2) {
        setDirName({ api: 'initial.php', folderName: '' })
        v.pop()

        return [...v]
      }
      return v
    })
  }, [])
  //獲取內部檔案
  const layer = useCallback((query) => () => {

    //路徑退步
    setPath(v => {
      v.pop();
      const copy1 = [...v];
      const BackPathString = copy1.join('\\')
      setDirName({ api: `layer.php/?folderName=${BackPathString}`, folderName: query })
      return [...v]
    })
  }, [])

  return { root, layer }
}