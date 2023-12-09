import { useQuery } from '@tanstack/react-query';


function useDepartmentFiles() {

  const result = useQuery({
    queryKey: ['department_Reports'],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_VAR_BASE_URL}/dataList`
        , {
          method: 'GET',
          headers:{
            "Accept":"application/json"
          }
        },
      )

      return await res.json()
    },
    // retry: 1,
    retryDelay: 1500,
    // refetchOnWindowFocus: true,


  })


  return result;

}

export { useDepartmentFiles };