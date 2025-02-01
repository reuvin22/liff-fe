import { Route, Router, Routes } from 'react-router-dom'
import Home from './Liff/Home'
import Generate from './Liff/Generate'
import Explanation from './Liff/Explanation'
import LoadingError from './Liff/LoadingError'
import Compress from './Liff/Compress'
import ConvertDownload from './Liff/ConvertDownload'
import Carousel from './Liff/how-to-use/Carousel'
import TextDownload from './Liff/TextDownload'
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/explanation' element={<Carousel />} />
        <Route path='/convert' element={<TextDownload />}/>
      </Routes>
    </>
  )
}

export default App
