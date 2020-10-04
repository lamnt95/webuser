import Head from 'next/head'
import CartScreen from "../screens/CartScreen"
import withReduxHOC  from "../hoc/withRedux"

function Cart() {
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

Cart.getInitialProps = async (ctx = {}) => {
  const { pathname, store } = ctx;
  const state = store.getState();
  return { pathname, state };
};

export default withReduxHOC.withRedux(Cart)
