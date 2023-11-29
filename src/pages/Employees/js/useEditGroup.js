
import { useMutation } from '@tanstack/react-query';

function useEditGroup(queryClient, page, setToast, deleteInfo) {
  const { mutate } = useMutation({
    mutationFn: async ({ user_id}) => {

      if (deleteInfo) {
        fetch(`${import.meta.env.VITE_VAR_BASE_URL}/employees/${user_id}`, {
          method: 'DELETE',
          credentials: 'include',
          mode: 'cors'
        }).then((res) => res.text())
      }
      return deleteInfo;

    },

    onMutate: async (newData) => {
      //中斷其他正在refetch的動作
      await queryClient.cancelQueries({ queryKey: ['employees'] });
      //把舊資料snapShot
      const previousData = queryClient.getQueryData(['employees', page]);
      if (deleteInfo) {
        const data = previousData.data;
        let filteredData = data.filter(e => e.user_id !== newData.user_id)
        //更新Query資料
        queryClient.setQueryData(['employees', page], { ...previousData, data: filteredData });

        //合併新舊資料  
        return { previousData }
      }
      return { previousData }

    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['employees'], context.previousData)
    },

    onSettled: (deleteInfo) => {
      if (deleteInfo) {
        setToast({ detail: '刪除成功!', theme: '#ffdb36', timeStamp: new Date().toLocaleTimeString() })
        return;
      }
      // queryClient.removeQueries({ queryKey: ['employees', page] })

    }
  });

  return { mutate };
}



export default useEditGroup;