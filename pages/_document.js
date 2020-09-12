import Document, { Head, Main, NextScript } from 'next/document'
export default class CustomDocument extends Document {
  static async getInitialProps (ctx) {
    return await Document.getInitialProps(ctx)
  }

  render () {
    return (
      <html>
        <Head>
          <title>Site Title</title>
          <link href="/static/stylesheets/styles.css" rel="stylesheet" />
          <link href="/static/stylesheets/prism.css" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script async defer crossorigin="anonymous" src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v8.0&appId=180493346226712&autoLogAppEvents=1" nonce="6GPsJh2U"></script>        </body>
      </html>
    )
  }
}