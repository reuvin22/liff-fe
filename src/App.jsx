import { Route, Router, Routes } from 'react-router-dom'
import Home from './Liff/Home'
import Carousel from './Liff/how-to-use/Carousel'
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Carousel />} />
        <Route path='/explanation' element={<Carousel />} />
      </Routes>
    </>
  )
}

export default App
