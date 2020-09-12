import Head from 'next/head'
import ProductDetailScreen from "../../screens/ProductDetailScreen"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProductDetailScreen />
    </div>
  )
}
