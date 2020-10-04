import React, { useEffect } from "react"
import '../public/fontawesome-free-5.14.0-web/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css'
import 'react-calendar/dist/Calendar.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css'
import Head from "next/head"
import withReduxHOC  from "../hoc/withRedux"
import { ToastContainer } from "react-toastify";

import styled from "styled-components"

const Container = styled.div`
  position: relative;
  padding-top: 70px;
`

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    window.fbAsyncInit = function () {
      FB.init({
        xfbml: true,
        version: 'v8.0'
      });
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  })

  return <Container>
    <Head>
      <title>My page title</title>
      <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500&family=Roboto:wght@300;400;500&family=Taviraj:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    </Head>
    <Component {...pageProps} />
    <ToastContainer hideProgressBar autoClose={2000} />
    <div id="fb-root"></div>
    <div class="fb-customerchat"
      attribution="setup_tool"
      page_id="103045498205814"
      logged_in_greeting="Bánh cốm Nguyên Hương chào mừng qúy khách"
      logged_out_greeting="Bánh cốm Nguyên Hương chào mừng qúy khách">
    </div>
  </Container>
}

export default withReduxHOC.withRedux(MyApp)

