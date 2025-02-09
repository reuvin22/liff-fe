import React, { createContext, useContext, useState } from 'react';

export const AdsContext = createContext({
    isDone: false,
    setIsDone: () => {},
    isLoading: false,
    setIsLoading: () => {},
    isReady: false,
    setIsReady: () => {},
    isCompressReady: false,
    setIsCompressReady: () => {},
    setAdsPlaying: () => {},
    adsPlaying: false,
    isClicked: '',
    setIsClicked: () => {},
    countdown: null,
    setCountdown: () => {},
    generateIsReady: false,
    setGenerateIsReady: () => {},
    compressIsReady: false,
    setCompressIsReady: () => {}
});

export const GenerateContext = createContext({
    prompt: '',
    setPrompt: () => {}  
})

export const useAdsContext = () => useContext(AdsContext);
export const useGenerateContext = () => useContext(GenerateContext)