import React from 'react'
import PropTypes from 'prop-types'

class MockRouter extends React.Component {
  getChildContext() {
    return {
      router: {
        pathname: this.props.href || '/',
        push: () => {},
        replace: () => {},
        reload: () => {},
        back: () => {},
        prefetch: () => {},
        beforePopState: () => {}
      }
    }
  }
  render() {
    return <>{this.props.children}</>
  }
}

MockRouter.childContextTypes = {
  router: PropTypes.object
}

export default MockRouter
