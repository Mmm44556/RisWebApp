import React from 'react'
import { QueryClient, QueryClientProvider, QueryCache } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useOutletContext } from 'react-router-dom';
import { iniFolders } from '../../utils/FileProcess/fetchData';
import { GetData } from './GetData';

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

const DashBoard = React.memo(({ }) => {
  const [userState, dispatch] = useOutletContext();

  return (

    <QueryClientProvider client={queryClient}>
      <div className={`position-relative ms-2`}>

        <GetData userState={userState} />
        <ReactQueryDevtools className="position-fixed" />
      </div>
    </QueryClientProvider>
  );
})

export default DashBoard
