import Document, { Html, Head, Main, NextScript } from 'next/document'
import BLOG from '../blog.config'
import { CSSBaseline } from '@zeit-ui/react'
import flush from 'styled-jsx/server'

const { language, googleAnalytics } = BLOG

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    const styles = CSSBaseline.flush()

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {styles}
          {flush()}
        </>
      )
    }
  }

  render() {
    return (
      <Html lang={language}>
        <Head />
        <body>
          <script dangerouslySetInnerHTML={{
            __html: `
            (function(){
              if (!window.localStorage) return;
              if (window.localStorage.getItem('theme') === 'dark') {
                document.documentElement.style.background = '#000';
                document.body.style.background = '#000';
              };
            })()
          `}} />
          <Main />
          <NextScript />
          {googleAnalytics && <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalytics}`} />}
          {googleAnalytics &&
            <script
              async
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalytics}');
              `
              }}
            />
          }
        </body>
      </Html>
    )
  }
}

export default MyDocument
