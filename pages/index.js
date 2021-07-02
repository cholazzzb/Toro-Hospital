import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  return (
    <div className="background">
      <Head>
        <title>Toro Hospital</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>

    </div>
  )
}
