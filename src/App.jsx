import { Route, Router, Routes } from 'react-router-dom'
import Home from './Liff/Home'
import Carousel from './Liff/how-to-use/Carousel'
import { AdsContext } from './utils/context'
function App() {
  const [isDone, setIsDone] = useState(false);
  return (
    <>
      <Routes>
        <AdsContext.Provider value={{ isDone, setIsDone }}>
          <Route path="/" element={<Home />} />
        </AdsContext.Provider>
        <Route path='/explanation' element={<Carousel />} />
      </Routes>
    </>
  )
}

export default App
