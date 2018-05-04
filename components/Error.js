import React, { Component } from 'react'

const { Provider, Consumer } = React.createContext()

export class ErrorProvider extends Component {
  state = {
    errors: []
  }

  pushError = errors => {
    this.setState(s => ({
      errors: [...errors, ...s.errors]
    }))
  }

  render() {
    return (
      <Provider
        value={{
          errors: this.state.errors,
          pushError: this.pushError
        }}
      >
        {this.props.children}
      </Provider>
    )
  }
}

export { Consumer as ErrorConsumer }
