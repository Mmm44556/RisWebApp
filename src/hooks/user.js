import { userInitial } from '@store';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom'
function useUser() {
  const navigator = useNavigate();
  const { data, isSuccess, isFetching, status } = useQuery({
    queryKey: ['userCtx'],
    queryFn: async () => {
      let res = await fetch(`${import.meta.env.VITE_VAR_BASE_URL}/authentication`
        , {
          credentials: 'include',
          mode: 'cors',
          method: 'GET'
        },
      )

      if (res.status == 401) {
        alert("登入超時，請重新登入!")
        navigator('/login')
        return;
      }
      const user = await res.json();
      const normalizedUser = userInitial(user.msg);
      return normalizedUser
    },
    retry: 1,
    retryDelay:1500,
    refetchOnWindowFocus: true,
    suspense:true
  })
  return { data, isSuccess, isFetching, status }
}

export default useUser;