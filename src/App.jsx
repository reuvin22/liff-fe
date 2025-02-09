import { Route, Router, Routes } from 'react-router-dom'
import Home from './Liff/Home'
import Carousel from './Liff/how-to-use/Carousel'
import { AdsContext } from './utils/context'
import { useState } from 'react';
function App() {
  const [isDone, setIsDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [adsPlaying, setAdsPlaying] = useState(false);
  const [isClicked, setIsClicked] = useState('')
  const [countdown, setCountdown] = useState(15)
  const [countInterval, setCountInterval] = useState(null)
  const [generateIsReady, setGenerateIsReady] = useState(false)
  const [compressIsReady, setCompressIsReady] = useState(false)
  return (
    <>
      <AdsContext.Provider value={{ isDone, setIsDone, isLoading, setIsLoading, isReady, setIsReady, adsPlaying, setAdsPlaying, isClicked, setIsClicked, countdown, setCountdown, countInterval, setCountInterval, generateIsReady, setGenerateIsReady, compressIsReady, setCompressIsReady }}>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/explanation' element={<Carousel />} />
        </Routes>
      </AdsContext.Provider>
    </>
  )
}

export default App
