import React, { createContext, useContext, useState } from 'react';

export const AdsContext = createContext({
    isDone: false,
    setIsDone: () => {}
});

export const useAdsContext = () => useContext(AdsContext);
