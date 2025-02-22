import React, { useState, useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'warning';

interface ToastProps {
  type: ToastType;
  message: string;
}

class ToastStore {
  private static listeners: Set<(toast: ToastProps | null) => void> = new Set();
  private static currentToast: ToastProps | null = null;
  private static timeoutId: NodeJS.Timeout | null = null;

  static show(toast: ToastProps) {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.currentToast = toast;
    this.notifyListeners();

    this.timeoutId = setTimeout(() => {
      this.hide();
    }, 5000);
  }

  static hide() {
    this.currentToast = null;
    this.notifyListeners();
  }

  static subscribe(listener: (toast: ToastProps | null) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private static notifyListeners() {
    this.listeners.forEach(listener => listener(this.currentToast));
  }
}

// Export the show function
export const showToast = (toast: ToastProps) => ToastStore.show(toast);

const getToastStyles = (type: ToastType): string => {
  const baseStyles = "fixed z-[9999] top-4 left-1/2 transform -translate-x-1/2 md:translate-x-0 md:left-auto md:right-4 p-4 rounded-lg shadow-lg flex items-center gap-2 max-w-sm w-[calc(100%-2rem)] md:w-auto min-w-[200px]";
  
  switch (type) {
    case 'success':
      return `${baseStyles} bg-green-100 text-green-800 border border-green-200`;
    case 'error':
      return `${baseStyles} bg-red-100 text-red-800 border border-red-200`;
    case 'warning':
      return `${baseStyles} bg-yellow-100 text-yellow-800 border border-yellow-200`;
    default:
      return `${baseStyles} bg-gray-100 text-gray-800 border border-gray-200`;
  }
};

const getToastIcon = (type: ToastType) => {
  switch (type) {
    case 'success':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
    case 'error':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      );
    case 'warning':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      );
  }
};

export const Toast: React.FC = () => {
  const [toast, setToast] = useState<ToastProps | null>(null);

  useEffect(() => {
    const unsubscribe = ToastStore.subscribe(setToast);
    return () => {
      unsubscribe();
    };
  }, []);

  if (!toast) return null;

  return (
    <div className={getToastStyles(toast.type)}>
      <div className="shrink-0">
        {getToastIcon(toast.type)}
      </div>
      <p className="text-sm font-medium flex-grow">{toast.message}</p>
      <button
        onClick={() => ToastStore.hide()}
        className="shrink-0 rounded-lg p-1.5 hover:bg-black/5 transition-colors"
        aria-label="Close toast"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};