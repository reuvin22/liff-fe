import React, { createContext, useContext, useState } from 'react';

export const AdsContext = createContext({
    isDone: false,
    setIsDone: () => {},
    isLoading: false,
    setIsLoading: () => {}
});

export const useAdsContext = () => useContext(AdsContext);
