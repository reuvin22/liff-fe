import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Loading from './Loading';
import Generate from './Generate';
import LoadingError from './LoadingError';
import liff from '@line/liff';
function Compress({prompt, userId}) {
    const [copyStatus, setCopyStatus] = useState("");
    const [generate, setGenerate] = useState("");
    const [compress, setCompress] = useState(false);
    const [isGeneratePage, setIsGeneratePage] = useState(false);
    const [main, setMain] = useState(true);
    const [error, setError] = useState(false);
    const [compressData, setCompressData] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [copy, setCopy] = useState(false)
    const navigate = useNavigate()

    function backToHome() {
        if (liff.isInClient()) {
          liff.closeWindow();
        } else {
          console.warn('LIFF is not running in the LINE app.');
        }
      }
    const handleGenerate = () => {
        setIsLoading(true)
        axios.get(
            `https://reuvindevs.com/liff/public/api/generate/${userId}`
        ).then((response) => {
            setGenerate(response.data)
            setIsGeneratePage(true)
            setIsLoading(false)
        }).catch((error) => {
            return <LoadingError />
        });
    }

    if(isGeneratePage){
        return <Generate 
            prompt={generate ? generate : prompt}
            userId={userId}
        />
    }
    if(isLoading){
        return <Loading />
    }

    const handleCopy = () => {
        setCopy(true)
        const textToCopy = prompt;
        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            setCopyStatus("コピーしました！");
            setTimeout(() => setCopyStatus(""), 2000);
          }).catch(() => {
            setCopyStatus("コピーに失敗しました")
          });
          setTimeout(() => {
            setCopy(false)
          }, 2000)
        };

    return (
        <div className="min-h-screen bg-blue-100 flex justify-center items-center">
                <div className="bg-white w-80 rounded-lg shadow-lg p-4 text-center relative">
                <div className='border-2 border-black mt-1 bg-gray-300 mb-2'>
                    文章の作成が完了しました。
                </div>
                <div
                onClick={handleCopy}
                className="min-h-72 max-h-72 border-2 border-black bg-white mb-2 overflow-auto overflow-x-hidden"
                >
                    {copy && (
                        <div className='w-full bg-red-200 h-10 justify-center text-center leading-[2.5rem] z-50'>{copyStatus}</div>
                    )}
                    <p className='text-sm px-2 text-justify'>{compressData ? compressData : prompt}</p>
                </div>
                <div className="flex space-x-2">
                <button onClick={backToHome} className="bg-gray-400 text-white px-4 border flex-1 text-sm">
                    ホームに戻る
                </button>
                <button onClick={handleGenerate} className="bg-green-400 text-white px-4 border flex-1 text-sm">
                    生成する
                </button>
                <button onClick={handleCopy} className="bg-yellow-400 text-white px-4 border flex-1 text-sm">
                    クリップボードにコピー
                </button>
                </div>
            </div>
    </div>
    );
}

export default Compress