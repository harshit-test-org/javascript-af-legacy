import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <link href="https://fonts.googleapis.com/css?family=Quicksand|Roboto|Inconsolata" rel="stylesheet" />
          <link rel="prefetch" href="/static/gfm.css" />
          <meta property="og:title" content="Share Your Repos | Javascript AF" />
          <meta property="og:description" content="Share you repos with the dev community" />
          <meta name="description" content="Share you repos with the dev community" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="og:site_name" content="Javascript AF, Inc." />
          <meta name="twitter:site" content="@theharshitpant" />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
          <link rel="manifest" href="/static/site.webmanifest" />
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <meta name="msapplication-TileColor" content="#2e7d32" />
          <meta name="msapplication-config" content="/static/browserconfig.xml" />
          <meta name="theme-color" content="#2e7d32" />
          {this.props.styleTags}
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(e,a,t,n,g,o,c){e.GoogleAnalyticsObject=g,e.ga=e.ga||function(){(e.ga.q=e.ga.q||[]).push(arguments)},e.ga.l=1*new Date,o=a.createElement(t),c=a.getElementsByTagName(t)[0],o.defer=1,o.src="https://www.google-analytics.com/analytics.js",c.parentNode.insertBefore(o,c)}(window,document,"script",0,"ga"),ga("create","UA-118827195-1","auto"),ga("send","pageview"),ga("set","anonymizeIp",!0);`
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
