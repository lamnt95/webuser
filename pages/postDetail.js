import Head from 'next/head'
import PostDetailScreen from "../screens/PostDetailScreen"
import withReduxHOC  from "../hoc/withRedux"

function Home() {
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

Home.getInitialProps = async (ctx = {}) => {
  const { pathname, store } = ctx;
  const state = store.getState();
  return { pathname, state };
};

export default withReduxHOC.withRedux(Home)