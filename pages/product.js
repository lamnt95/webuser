import _ from "lodash"
import Head from 'next/head'
import HomeScreen from "../screens/HomeScreen"
import withReduxHOC from "../hoc/withRedux"

function ProductPage() {
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

ProductPage.getInitialProps = async (ctx = {}) => {
  const { pathname, store } = ctx;
  const state = store.getState();
  return { pathname, state };
};

export default withReduxHOC.withRedux(ProductPage)