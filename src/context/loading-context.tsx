
"use client";

import { usePathname, useSearchParams } from 'next/navigation';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loadingCounter, setLoadingCounter] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Handle route changes
  useEffect(() => {
    if (isInitialLoad) {
      // The initial load is handled separately to show the loader for a minimum duration.
      return;
    }
    // Every time the path changes, show the loader.
    // The loader will be hidden by the isInitialLoad effect changing.
    showLoader();
  }, [pathname, searchParams]);

  // Handle initial page load
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isInitialLoad) {
        showLoader();
        // Simulate a minimum loading time for the initial screen
        timer = setTimeout(() => {
            hideLoader();
            setIsInitialLoad(false);
        }, 1500); // Same duration as the old loading screen
    }
    return () => clearTimeout(timer);
  }, [isInitialLoad]);


  const showLoader = () => {
    setLoadingCounter(prev => prev + 1);
  };

  const hideLoader = () => {
    setLoadingCounter(prev => Math.max(0, prev - 1));
  };

  const isLoading = loadingCounter > 0;

  return (
    <LoadingContext.Provider value={{ isLoading, showLoader, hideLoader }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
