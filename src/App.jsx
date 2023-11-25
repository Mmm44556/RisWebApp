import { QueryClient, QueryCache, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Outlet } from 'react-router-dom';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async () => {
        let res = await fetch(`${import.meta.env.VITE_VAR_BASE_URL}/authentication`
          , {
            credentials: 'include',
            mode: 'cors',
            method: 'GET'
          },
        )
        return await res.json();
      },
      retryDelay:1500
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
      <Outlet></Outlet>
        <ReactQueryDevtools></ReactQueryDevtools>
      </QueryClientProvider>
    </>
  );
}

export default App;
