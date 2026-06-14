import React, { createContext, useContext, useState } from 'react';
import { AppLoadState } from '@/lib/appState';

const AppContext = createContext({
  isInitialLoadComplete: true,
  setIsInitialLoadComplete: () => {},
  stage: 'ready',
  setStage: () => {},
});

export const AppProvider = ({ children }) => {
  // If already loaded this session → skip to initial load complete
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(
    AppLoadState.hasLoaded
  );

  // Maintain stage compatibility for step-by-step preloader components
  const [stage, setStage] = useState(
    AppLoadState.hasLoaded ? 'ready' : 'welcome'
  );

  const handleCompleteInitialLoad = () => {
    setIsInitialLoadComplete(true);
    setStage('ready');
    AppLoadState.setLoaded();
  };

  const handleSetStage = (s) => {
    setStage(s);
    if (s === 'ready') {
      setIsInitialLoadComplete(true);
      AppLoadState.setLoaded();
    }
  };

  return (
    <AppContext.Provider value={{
      isInitialLoadComplete,
      setIsInitialLoadComplete: handleCompleteInitialLoad,
      stage,
      setStage: handleSetStage,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
