import { memo } from "react";
import { QueryClient, QueryClientProvider, QueryCache } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useOutletContext } from 'react-router-dom';
import { iniFolders } from '../../utils/FileProcess/fetchData';
import GetData from "../../components/DashBoard/GetData";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: iniFolders,
    },

    queryCache: new QueryCache({
      onError: (err) => {
        console.log(err)
      }
    })
  }
});

function DataList ({ }) {
  const [userState] = useOutletContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`position-relative ms-2`}>

        <GetData userState={userState} />
        <ReactQueryDevtools className="position-fixed" />
      </div>
    </QueryClientProvider>
  );
}

export default memo(DataList);
