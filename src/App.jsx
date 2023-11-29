import { Suspense } from 'react';
import { QueryClient, QueryCache, QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { Button } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Loading from '@error/Loading';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000,
    },

    queryCache: new QueryCache({
      onError: (err) => {
        console.log(err)
      }
    })
  }
});
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ resetErrorBoundary }) => {
                console.log(resetErrorBoundary)
                return (
                  < div >
                    There was an error!
                    <Button Button onClick={() => resetErrorBoundary()}>Try again</Button>
                  </div>

                )

              }
              }
            >
              <Suspense fallback={<Loading />}>

                <Outlet></Outlet>


              </Suspense>

            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
        <ReactQueryDevtools></ReactQueryDevtools>
      </QueryClientProvider >
    </>
  );
}

export default App;
