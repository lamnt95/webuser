import Head from 'next/head'
import CartScreen from "../screens/CartScreen"

export default function Cart() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CartScreen />
    </div>
  )
}
