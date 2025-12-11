import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="alert alert-danger m-4" role="alert">
          <h4 className="alert-heading">Something went wrong!</h4>
          <p>An error occurred while rendering this component.</p>
          <hr />
          <p className="mb-0">
            <button 
              className="btn btn-outline-danger" 
              onClick={() => this.setState({ hasError: false, error: null })}
            >
              Try Again
            </button>
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;