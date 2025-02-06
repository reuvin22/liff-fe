import React, { useState } from 'react'
import axios from 'axios';
import Loading from './Loading';
import Generate from './Generate';
import LoadingError from './LoadingError';
import liff from '@line/liff';
import { useAdsContext } from '../utils/context';
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
    const context = useAdsContext()
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
            console.log(response.data)
            if(response.data === "申し訳ありませんが、そのリクエストには対応できません。" || response.data === "申し訳ございませんが、このリクエストを処理することはできません。"){
                <LoadingError />
            }
            setIsGeneratePage(true)
            setIsLoading(false)
        }).catch((error) => {
            return <LoadingError 
                userId={userId}
            />
        });
    }

    if(isGeneratePage){
        return <Generate 
            prompt={generate ? generate : prompt}
            userId={userId}
        />
    }
    if(context.isLoading){
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

        const formatJapaneseText = (text) => {
            return text.replace(/。/g, "。\n");
        };

    return (
        <div className="min-h-screen bg-blue-100 flex justify-center items-center">
                <div className="bg-white w-80 rounded-lg shadow-lg p-4 text-center relative">
                <div className='border-2 border-black mt-1 bg-gray-300 mb-2'>
                    文章作成完了
                </div>
                <div
                onClick={handleCopy}
                className="min-h-96 max-h-96 border-2 border-black bg-white mb-2 overflow-auto overflow-x-hidden"
                >
                    {copy && (
                        <div className='w-full bg-red-200 h-10 justify-center text-center leading-[2.5rem] z-50'>{copyStatus}</div>
                    )}
                    <p className='text-sm px-2 text-justify whitespace-pre-line'>{compressData ? formatJapaneseText(compressData) : formatJapaneseText(prompt)}</p>
                </div>
                <div className="flex space-x-2">
                <button onClick={backToHome} className="bg-gray-400 text-white px-4 border flex-1 text-sm">
                    ホームに戻る
                </button>
                <button onClick={handleGenerate} className="bg-green-400 text-white px-4 border flex-1 text-sm">
                    生成する
                </button>
                <button onClick={handleCopy} className="bg-yellow-400 text-white px-4 border flex-1 text-sm">
                    貼り付け板に複製
                </button>
                </div>
            </div>
    </div>
    );
}

export default Compress