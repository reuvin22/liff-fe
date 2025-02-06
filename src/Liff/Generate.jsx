import React, { useState } from 'react'
import axios from 'axios';
import Loading from './Loading';
import Compress from './Compress';
import Home from './Home';
import LoadingError from './LoadingError';
import { useAdsContext } from '../utils/context';
function Generate({prompt, userId}) {
    const [copyStatus, setCopyStatus] = useState("");
    const [generate, setGenerate] = useState("");
    const [isCompress, setIsCompress] = useState(false);
    const [main, setMain] = useState(true);
    const [error, setError] = useState(false);
    const [compressData, setCompressData] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [home, setHome] = useState(false)
    const [copy, setCopy] = useState(false)
    const context = useAdsContext()

    const handleCompress = () => {
        context.setIsLoading(true);
    
        axios.get(`https://reuvindevs.com/liff/public/api/compress/${userId}`)
            .then((response) => {
                setCompressData(response.data);
                
                if (response.data === "申し訳ありませんが、そのリクエストには対応できません。" || 
                    response.data === "申し訳ございませんが、このリクエストを処理することはできません。") {
                    return <LoadingError />;
                }
    
                setTimeout(() => {
                    setIsCompress(true);
                    context.setIsLoading(false);
                }, 1500);
            })
            .catch((error) => {
                setIsLoading(false);
                return <LoadingError userId={userId} />;
            });
    };    
    
    const handleGenerate = () => {
        setIsLoading(true)
        axios.get(
            `https://reuvindevs.com/liff/public/api/generate/${userId}`
        ).then((response) => {
            setGenerate(response.data)
            if(response.data === "申し訳ありませんが、そのリクエストには対応できません。" || response.data === "申し訳ございませんが、このリクエストを処理することはできません。"){
                <LoadingError />
            }
            setIsLoading(false)
        }).catch((error) => {
            return <LoadingError />
        });
    }

    console.log(context.isLoading)
    if(isCompress){
        return <Compress 
            prompt={compressData}
            userId = {userId}
        />
    }
    if(context.isLoading === true){
        return <Loading />;
    }

  const handleCopy = () => {
    setCopy(true)
    const textToCopy = generate ? generate : prompt;
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

    function backToHome() {
        if (liff.isInClient()) {
          liff.closeWindow();
        } else {
          console.warn('LIFF is not running in the LINE app.');
        }
      }

    if(home){
        return <Home />
    }
    
    const formatJapaneseText = (text) => {
        return text.replace(/。/g, "。\n");
    };

    return (
        <div className="min-h-screen bg-blue-100 flex justify-center items-center">
                <div className="bg-white w-80 rounded-lg shadow-lg p-4 text-center">
                <div className='border-2 border-black mt-1 bg-gray-300 mb-2'>
                    文章の作成が完了しました。
                </div>
                <div
                onClick={handleCopy}
                className="min-h-96 max-h-96 border-2 border-black bg-white mb-2 overflow-auto overflow-x-hidden"
                >
                    {copy && (
                        <div className='w-full bg-red-200 h-10 justify-center text-center leading-[2.5rem] z-50'>{copyStatus}</div>
                    )}
                    <p className='text-sm px-2 text-justify whitespace-pre-line'>{generate ? formatJapaneseText(generate) : formatJapaneseText(prompt)}</p>
                </div>
                <div className="flex space-x-2">
                <button onClick={handleCompress} className="bg-orange-400 text-white px-4 border flex-1 text-sm">
                    文字に圧縮する
                </button>
                <button onClick={handleGenerate} className="bg-green-400 text-white px-4 border flex-1 text-sm">
                    再度生成する
                </button>
                <button onClick={handleCopy} className="bg-yellow-400 text-white px-4 border flex-1 text-sm">
                    貼り付け板に複製する
                </button>
                </div>
                <div onClick={backToHome} className='border-1 border-black mt-1 bg-gray-300'>
                    <button className='py-2'>
                        ホームに戻る
                    </button>
                </div>
            </div>
    </div>
    );
}

export default Generate