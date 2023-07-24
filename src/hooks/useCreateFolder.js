import { useQueryClient, useMutation } from '@tanstack/react-query';
import { createFolder } from '../utils/js/fetchData';



export function useCreateFolder(setShowCreateDone, setCreateDetail) {
  const queryClient = new useQueryClient();
  const Time = new Date();


  const mutation = useMutation({
    mutationFn: async (useInput) => createFolder(useInput.api, useInput.CreatedName),
    onSuccess: () => {
      queryClient.invalidateQueries(["dataFolderRoot", { "directory": "initial.php" }])
    },
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["dataFolderRoot"] })
      setShowCreateDone(true)
      setCreateDetail({ detail: 'Pending...', theme: 'Light', spinner: true, timeStamp: Time.toLocaleTimeString() })
      const previous = queryClient.getQueryData(["dataFolderRoot", { "directory": "initial.php" }])
      return previous
    },
    //rollback, if somethings wrong
    onError: (err, variables, context) => {
      setCreateDetail({ detail: `Somethings Wrong, ${err}`, theme: 'warning', spinner: false, timeStamp: Time.toLocaleTimeString() })
      setShowCreateDone(true)
      if (context?.previous) {
        queryClient.setQueryData(["dataFolderRoot", { "directory": "initial.php" }], context.previous)
      }
    },
    onSettled: () => {
      setCreateDetail({ detail: ' Create Folder Successfully!', theme: 'success', spinner: false, timeStamp: Time.toLocaleTimeString() })
      return
    }

  });


  return mutation




}