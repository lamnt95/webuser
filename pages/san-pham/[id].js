import _ from "lodash"
import Head from 'next/head'
import HomeScreen from "../../screens/HomeScreen"

export default function ProductPage(props) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeScreen />
    </div>
  )
}

ProductPage.getInitialProps = async (ctx) => {
  const asPath = ctx.asPath
  const query = ctx.query
  return { key: _.keys(ctx), asPath, query }
}