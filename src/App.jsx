import { Suspense } from 'react';
import { QueryClient, QueryCache, QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';
import { ErrorBoundary } from 'react-error-boundary';
import { Button } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Loading from '@error/Loading';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
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
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <QueryClientProvider client={queryClient}>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ resetErrorBoundary }) => {

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
