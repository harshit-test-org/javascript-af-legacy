import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import React from 'react'
import { ErrorProvider, ErrorConsumer } from '../components/Error'
import Snack, { Container as C } from '../components/SnackBar'
import withData from '../apollo/wihData'
import '../lib/track'

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <ErrorProvider>
            <ErrorConsumer>
              {({ errors }) => <C>{errors.map((er, i) => <Snack message={er.message} key={i} />)}</C>}
            </ErrorConsumer>
            <Component {...pageProps} />
          </ErrorProvider>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withData(MyApp)
