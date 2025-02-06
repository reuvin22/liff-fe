import React, { createContext, useContext, useState } from 'react';

export const AdsContext = createContext({
    isDone: false,
    setIsDone: () => {},
    isLoading: false,
    setIsLoading: () => {},
    isReady: false,
    setIsReady: () => {}
});

export const useAdsContext = () => useContext(AdsContext);
