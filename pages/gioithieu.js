import Head from 'next/head'
import About from "../screens/About"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <About />
    </div>
  )
}
