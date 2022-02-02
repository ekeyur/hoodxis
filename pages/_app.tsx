import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools';
import { ToastProvider } from 'react-toast-notifications';
import '../styles/globals.css';
import '../styles/react-big-calendar.css';
import {Layout} from '../components/Layout'
import {UserContextProvider} from '../context/UserContext';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {


  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ReactQueryDevtools initialIsOpen={false}/>
          <ToastProvider>
            <UserContextProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
            </UserContextProvider>
          </ToastProvider>
        </Hydrate>
      </QueryClientProvider>
  )
}

export default MyApp
