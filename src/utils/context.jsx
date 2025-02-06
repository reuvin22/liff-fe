import React from 'react'
import { createContext, useContext } from 'react'

export const AdsContext = createContext({
    isDone: false,
    setIsDone: () => {}
});

export const useAdsContext = () => useContext(AdsContext)