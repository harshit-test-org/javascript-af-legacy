import App, { Container } from 'next/app'
import React from 'react'
import { ErrorProvider, ErrorConsumer } from '../components/Error'
import Snack, { Container as C } from '../components/SnackBar'
import '../raven'

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <ErrorProvider>
          <ErrorConsumer>
            {({ errors }) => <C>{errors.map((er, i) => <Snack message={er.message} key={i} />)}</C>}
          </ErrorConsumer>
          <Component {...pageProps} />
        </ErrorProvider>
      </Container>
    )
  }
}
