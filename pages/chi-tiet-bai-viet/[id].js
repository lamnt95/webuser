import Head from 'next/head'
import PostDetailScreen from "../../screens/PostDetailScreen"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PostDetailScreen />
    </div>
  )
}
