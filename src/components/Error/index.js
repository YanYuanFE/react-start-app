import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false
    };
  }

  componentDidCatch(err, info) {
    console.log(err, info);

    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <div>Oops, something went wraong</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
