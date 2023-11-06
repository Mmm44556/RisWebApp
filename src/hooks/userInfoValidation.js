import { useCallback } from "react";

const normalInfoChange = (setNormalInfo) => (event) => {
  const { name, value } = event.target;
  setNormalInfo(prev => {//修改當前值
    //age欄位手輸入超過限制
    if (name == "age" && value.length > 2) return prev;
    return ({ ...prev, [`user_${name}`]: value })
  });
}

function useInfoValidation(setNormalInfo, userState) {
  //重置、更新
  const setNormalInfoCallBack = useCallback(() => setNormalInfo(() => ({ ...userState.normalInfo })), [userState]);
  const normalInfoChangeCallBack = useCallback(() => normalInfoChange(setNormalInfo), [userState]);
  
  return { normalInfoChangeCallBack,  setNormalInfoCallBack }
  
}

export { useInfoValidation } ;