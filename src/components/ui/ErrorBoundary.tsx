import React from 'react';
import { Button } from './Button';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(_error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console
    console.error('Error caught by ErrorBoundary:', _error);
    console.error('Error Info:', errorInfo);

    // Update state with error details
    this.setState({
      error: _error,
      errorInfo,
    });

    // In production, you could send this to an error tracking service
    // Example: sendToErrorTrackingService(error, errorInfo);
  }

  isDevelopment = () => {
    return import.meta.env.DEV;
  };

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
          <div className="max-w-md w-full">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-red-200 dark:border-red-900 p-6">
              {/* Error Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-red-600 dark:text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Error Title */}
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center mb-2">
                出错了
              </h1>

              {/* Error Message */}
              <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                抱歉，应用程序遇到了一个意外错误。请尝试重新加载页面或返回首页。
              </p>

              {/* Error Details (Development Only) */}
              {this.isDevelopment() && this.state.error && (
                <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600">
                  <p className="text-xs font-mono text-gray-700 dark:text-gray-300 mb-2">
                    <strong>错误信息：</strong>
                  </p>
                  <p className="text-xs font-mono text-red-600 dark:text-red-400 break-words mb-3">
                    {this.state.error.toString()}
                  </p>

                  {this.state.errorInfo && (
                    <>
                      <p className="text-xs font-mono text-gray-700 dark:text-gray-300 mb-2">
                        <strong>堆栈跟踪：</strong>
                      </p>
                      <pre className="text-xs text-gray-600 dark:text-gray-400 overflow-auto max-h-40 whitespace-pre-wrap break-words">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={this.handleReset}
                  className="flex-1"
                >
                  重试
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={this.handleReload}
                  className="flex-1"
                >
                  重新加载
                </Button>
              </div>

              {/* Home Link */}
              <div className="mt-4 text-center">
                <a
                  href="/"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                >
                  返回首页
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
