import React, { useCallback, useState, useContext,useEffect } from 'react'
import { QueryClient, QueryClientProvider, QueryCache } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { iniFolders } from '../../utils/js/fetchData';

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

const DashBoard = React.memo(({ showUploader }) => {



  return (
    <QueryClientProvider client={queryClient}>
      <div className={`position-relative `}>

        <GetData showUploader={showUploader} />
        <ReactQueryDevtools className="position-fixed" />
      </div>
    </QueryClientProvider>
  );
})

export default DashBoard
