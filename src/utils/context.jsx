import React, { createContext, useContext, useState } from 'react';

export const AdsContext = createContext({
    isDone: false,
    setIsDone: () => {},
    isLoading: false,
    setIsLoading: () => {},
    isReady: false,
    setIsReady: () => {},
    isCompressReady: false,
    setIsCompressReady: () => {}
});

export const GenerateContext = createContext({
    prompt: '',
    setPrompt: () => {}  
})

export const useAdsContext = () => useContext(AdsContext);
export const useGenerateContext = () => useContext(GenerateContext)