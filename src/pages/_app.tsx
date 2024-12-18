import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { Lato } from 'next/font/google'
import Navbar from '../components/layouts/Navbar/index';

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
})

export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className={lato.className}>
        <Navbar></Navbar>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
}