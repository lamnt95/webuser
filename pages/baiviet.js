import Head from 'next/head'
import PostScreen from "../screens/PostScreen"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PostScreen />
    </div>
  )
}
