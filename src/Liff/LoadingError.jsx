import liff from '@line/liff';
import React, { useState } from 'react'

function LoadingError({userId}) {
    const [copyStatus, setCopyStatus] = useState("");
    const [generate, setGenerate] = useState("");
    const [compress, setCompress] = useState(false);
    const [isCompress, setIsCompress] = useState(false);
    const [main, setMain] = useState(true);
    const [error, setError] = useState(false);
    const [compressData, setCompressData] = useState("")
    const [isGenerate, setIsGenerate] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    
    const handleGenerate = () => {
        setIsLoading(true)
        axios.get(
            `https://reuvindevs.com/liff/public/api/generate/${userId}`
        ).then((response) => {
            setGenerate(response.data)
            setIsGenerate(true)
            setIsLoading(false)
            if(response.data === "申し訳ありませんが、そのリクエストには対応できません。" || response.data === "申し訳ございませんが、このリクエストを処理することはできません。"){
                <LoadingError />
            }
        }).catch((error) => {
            return <LoadingError />
        });
    }

    function backToHome() {
        if (liff.isInClient()) {
          liff.closeWindow();
        } else {
          console.warn('LIFF is not running in the LINE app.');
        }
      }

    if(isCompress){
        return <Compress 
            prompt={compressData}
        />
    }
    if(generate){
        return <Generate 
            prompt={generate}
        />
    }
    if(isLoading){
        return <Loading generate={generate ? generate : compressData}/>
    }

  return (
    <div className="min-h-screen bg-blue-100 flex justify-center items-center">
                <div className="bg-white w-80 rounded-lg shadow-lg p-4 text-center">
                <div className='border-2 border-black mt-1 bg-gray-300 mb-2'>
                    文章の生成中にエラーが発生しました。
                </div>
                <div className="flex space-x-2 mb-2">
                <button onClick={handleGenerate} className="bg-green-600 text-white px-4 py-2 flex-1 text-sm">
                    再度生成する
                </button>
                <button onClick={backToHome} className="bg-gray-300 text-white px-4 py-2 flex-1 text-sm">
                    ホームに戻る
                </button>
                </div>
                <div
                className="min-h-72 max-h-72 border-2 bg-white border-black mb-2 overflow-auto overflow-x-hidden"
                >
                    <p className='text-lg px-2 text-justify'>広告</p>
                </div>
            </div>
    </div>
  )
}

export default LoadingError