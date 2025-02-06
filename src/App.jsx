import { Route, Router, Routes } from 'react-router-dom'
import Home from './Liff/Home'
import Carousel from './Liff/how-to-use/Carousel'
import { AdsContext } from './utils/context'
function App() {
  const [isDone, setIsDone] = useState(false);
  return (
    <>
      <AdsContext.Provider value={{ isDone, setIsDone }}>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/explanation' element={<Carousel />} />
        </Routes>
      </AdsContext.Provider>
    </>
  )
}

export default App
