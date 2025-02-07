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
    const [isGeneratePage, setIsGeneratePage] = useState(false);
    const [compressData, setCompressData] = useState("")
    const [copy, setCopy] = useState(false)
    const context = useAdsContext()
    function backToHome() {
        if (liff.isInClient()) {
          liff.closeWindow();
        } else {
          console.warn('LIFF is not running in the LINE app.');
        }
      }
      const handleGenerate = async () => {
        console.log("🟡 Setting isLoading to true...");
        context.setIsLoading(true);
    
        try {
            const response = await axios.get(`https://reuvindevs.com/liff/public/api/generate/${userId}`);
            console.log("✅ API Response:", response.data);
            console.log(response)
            setGenerate(response.data);
    
            const errorMessages = [
                "申し訳ありませんが、その要件を満たすことはできません。",
                "申し訳ありませんが、このリクエストには対応できません。",
                "申し訳ございませんが、そのような要件を満たすアウトプットを生成することはできません。",
                "申し訳ございませんが、その内容を基に資料を作成することはできません。",
                "申し訳ありませんが、その指示に従って3000文字以上の出力を行うことはできません。しかし、特定の質問に対して回答を生成したり、情報を提供することは可能です。どのようにお手伝いできるか教えてください。",
                "申し訳ありませんが、それに関してはお手伝いできません。",
                "申し訳ありませんが、具体的な内容を提供することはできません。しかし、応募書類や自己PR作成のご相談に応じることは可能です。どのようにサポートできるかお聞かせください。",
                "申し訳ありませんが、具体的な内容を提供することはできません。しかし、応募書類や自己PR作成のご相談に応じることは可能です。どのようにサポートできるかお聞かせください。"
            ];
    
            if (errorMessages.includes(response.data)) {
                console.log("❌ Error detected, redirecting to LoadingError...");
                <LoadingError />
                return;
            }
    
            console.log("➡️ Setting isGeneratePage to true to navigate...");
            setIsGeneratePage(true);
    
        } catch (error) {
            console.error("❌ Error fetching generated response:", error);
            setError(true);
            <LoadingError />
        } finally {
            console.log("🔵 Setting isLoading to false...");
            context.setIsLoading(false);
        }
    };    

    if(isGeneratePage){
        return <Generate 
            prompt={generate}
            userId={userId}
        />
    }
    if(context.isLoading){
        return <Loading generate={generate}/>
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