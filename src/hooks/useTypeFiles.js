import { useQuery, useQueryClient } from '@tanstack/react-query';

//獲取所屬部門資料
function useTypeFiles(type = "") {
  const UpperStrType = type.toUpperCase();
  const result = useQuery({
    queryKey: ['department', UpperStrType],
    queryFn: () => fetchFiles(UpperStrType),
    staleTime: 0

  }
  )

  return result;
}

function useTypePrefetch(type, lastIndexId, queryClient) {
  const UpperStrType = type.toUpperCase();

  queryClient.prefetchQuery({
    queryKey: ['department', UpperStrType, 'next'],
    queryFn: () => fetchFiles(UpperStrType, lastIndexId),
    staleTime: 0
  }
  )
}

async function fetchFiles(UpperStrType, lastIndexId = '') {

  const files = await fetch(`${import.meta.env.VITE_VAR_BASE_URL}/dataList/${UpperStrType}?fileId=${lastIndexId}`, {
    method: 'GET',
    headers: {
      "Accept": "application/json"
    }
  });

  return await files.json();
}
export { useTypeFiles, useTypePrefetch };