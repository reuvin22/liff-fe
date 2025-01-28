import { Route, Router, Routes } from 'react-router-dom'
import Home from './Liff/Home'
import Generate from './Liff/Generate'
import Explanation from './Liff/Explanation'
import LoadingError from './Liff/LoadingError'
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/explanation' element={<Explanation />} />
      </Routes>
    </>
  )
}

export default App
