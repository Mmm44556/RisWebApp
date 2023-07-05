import React, { useCallback, useState } from 'react'
import { QueryClient, QueryClientProvider, QueryCache } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { iniFolders } from './Upload/js/fetchData';

import { GetData } from './GetData/getData';
import style from './Upload/css/style.module.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: iniFolders
    },
    queryCache: new QueryCache({
      onError: (err) => {
        console.log(err)
      }
    })
  }
});

export const DashBoard = React.memo(({ showUploader }) => {


  return (
    <QueryClientProvider client={queryClient}>
      <div className={`position-relative ${style.border}`}>
       
        <GetData showUploader={showUploader} />
        <ReactQueryDevtools />
      </div>
    </QueryClientProvider>
  );
})
