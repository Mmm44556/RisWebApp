import { useCallback } from "react";

const normalInfoChange = (setNormalInfo) => (event) => {
 return setNormalInfo(prev => {//修改當前值
    //age欄位手輸入超過限制

   
    if (event.target.name == "age" && event.target.value.length > 2) return prev;
    // const formMap = new Map(Object.entries(normalInfo));
    prev[`user_${event.target.name}`] = event.target.value;
    console.log(prev[`user_${event.target.name}`]);
    console.log(prev, event.target.value)
    return ({ ...prev });
  });
}

function useInfoValidation(userState, setNormalInfo) {
  //重置、更新
  const setNormalInfoCallBack = useCallback(() => setNormalInfo({ ...userState.normalInfo }), [userState]);
  const normalInfoChangeCallBack = useCallback(() => normalInfoChange(setNormalInfo), [userState]);

  return { setNormalInfoCallBack, normalInfoChangeCallBack, normalInfoChange }
  
}

export { useInfoValidation } ;