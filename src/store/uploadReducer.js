import { useReducer } from "react";

function useUploaded(){
  const iniState ={
    isUploaded:false,
    files:[],
    sum:0

  }
  const [state, dispatch] = useReducer(uploadReducer, iniState)

  return [state,dispatch]
}

function uploadReducer(state,action){
  //資料上傳成功

  switch (action.type) {
    case 'loading':
      const merge = [...state.files, ...action.files, ...action.errorFiles]
      return{
        isUploaded:true,
        sum: merge.length,
        files: merge,
        loading:true,
      }
    case 'success':
      return{
        ...state,
        loading:false,
      }
    case 'failed':
      return{
        ...state,
        isUploaded:false,
        error:action.error
      }
    case 'reset':
    return {
      ...state,
      isUploaded: false,
      files:[],
      sum:null
      
    }
    default:
      return state;
  }
}

export { useUploaded }