import { Route, Router, Routes } from 'react-router-dom'
import Home from './Liff/Home'
import Carousel from './Liff/how-to-use/Carousel'
import { AdsContext } from './utils/context'
import { useState } from 'react';
function App() {
  const [isDone, setIsDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log('APP.jsx isDone value = ', isDone);
  console.log('APP.jsx isDone Loading = ', isLoading);
  ///test
  return (
    <>
      <AdsContext.Provider value={{ isDone, setIsDone, isLoading, setIsLoading }}>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/explanation' element={<Carousel />} />
        </Routes>
      </AdsContext.Provider>
    </>
  )
}

export default App
