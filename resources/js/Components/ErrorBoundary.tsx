import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary yakaladı:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                    <div className="max-w-xl w-full mx-4">
                        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
                            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
                                Bir Hata Oluştu
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                Sayfa yüklenirken beklenmeyen bir hata oluştu. Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.
                            </p>
                            <div className="bg-gray-50 dark:bg-gray-900 rounded p-4 mb-4">
                                <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                                    {this.state.error?.message}
                                </pre>
                            </div>
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                            >
                                Sayfayı Yenile
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary; 