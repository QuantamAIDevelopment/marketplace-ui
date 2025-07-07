import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidMount() {
    window.addEventListener('unhandledrejection', this.handleUnhandledRejection);
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.handleUnhandledRejection);
  }

  handleUnhandledRejection = (event) => {
    event.preventDefault();
    this.setState({
      hasError: true,
      error: event.reason,
      errorInfo: { componentStack: 'Error came from an unhandled promise rejection.' }
    });
  };

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const { error, errorInfo } = this.state;

      let errorDetails;
      if (error instanceof Error) {
        errorDetails = (
          <>
            <p><strong>Message:</strong> {error.message}</p>
            <p><strong>Stack Trace:</strong></p>
            <pre style={{ background: '#eee', padding: '10px', borderRadius: '5px' }}>{error.stack}</pre>
          </>
        );
      } else if (error) {
        errorDetails = (
          <>
            <p><strong>Error:</strong></p>
            <pre style={{ background: '#eee', padding: '10px', borderRadius: '5px' }}>{JSON.stringify(error, null, 2)}</pre>
          </>
        );
      } else {
        errorDetails = <p>An unknown error occurred.</p>;
      }

      return (
        <div style={{ margin: 'auto', padding: '20px', backgroundColor: '#fff0f0', border: '1px solid red', color: 'black', fontFamily: 'monospace' }}>
          <h2 style={{ color: 'red' }}>Something went wrong.</h2>
          {errorDetails}
          {errorInfo && (
            <>
              <h3>Component Stack:</h3>
              <pre style={{ background: '#eee', padding: '10px', borderRadius: '5px' }}>{errorInfo.componentStack}</pre>
            </>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 