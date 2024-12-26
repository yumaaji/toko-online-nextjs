import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { Lato } from 'next/font/google'
import Navbar from '../components/fragments/Navbar/index';
import { useRouter } from 'next/router';
import 'boxicons/css/boxicons.min.css';

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
})

const disableNavbar = ['auth', 'admin']

export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  const {pathname} = useRouter()
  return (
    <SessionProvider session={session}>
      <div className={lato.className}>
        {!disableNavbar.includes(pathname.split('/')[1]) && <Navbar />}
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
}