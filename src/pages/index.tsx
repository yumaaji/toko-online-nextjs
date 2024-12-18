import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <div style={{width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Image src="/astronaut.png" alt="" width={250} height={200}/>
    </div>
    </>
  )
}
