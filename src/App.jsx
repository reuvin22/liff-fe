import { Route, Router, Routes } from 'react-router-dom'
import Home from './Liff/Home'
import Carousel from './Liff/how-to-use/Carousel'
import { AdsContext } from './utils/context'
function App() {
  return (
    <>
      <Routes>
        <AdsContext>
          <Route path="/" element={<Home />} />
        </AdsContext>
        <Route path='/explanation' element={<Carousel />} />
      </Routes>
    </>
  )
}

export default App
