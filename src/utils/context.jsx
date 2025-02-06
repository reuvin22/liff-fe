import React, { createContext, useContext, useState } from 'react';

export const AdsContext = createContext({
    isDone: false,
    setIsDone: () => {},
    isAdPlaying: false,
    setIsAdPlaying: () => {},
});

export const useAdsContext = () => useContext(AdsContext);
