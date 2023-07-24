import React, { useCallback, useMemo } from 'react';
import { reducer } from './userReducer';
function useLogin() {
  //初始化用於處理登入
  const reducers = useCallback(reducer, []);
  const initial = useMemo(() => ({
    isLogging: false
  }), [])
  return [initial, reducers]
}
export { useLogin }