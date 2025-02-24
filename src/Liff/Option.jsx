import React, { useState } from 'react';
import Generate from './Generate';
import { useNavigate } from 'react-router-dom';
import { useAdsContext } from '../utils/context';

function Option({ prompt, userId }) {
  const [isGenerate, setIsGenerate] = useState(false);
  const context = useAdsContext()

  const handleGenerate = () => {
    if (!prompt) {
      console.log('PROMPT IS EMPTY');
    } else {
      setIsGenerate(true);
      context.setIsLoading(false)
    }
  };

  const handleDownloadRedirect = async () => {
    const downloadUrl = `https://reuvindevs.com/liff/public/api/convert/${userId}`;
  
    try {
      // Check the URL status with a HEAD request
      const response = await fetch(downloadUrl, { method: 'HEAD' });
      if (response.status === 403) {
        const link = document.createElement('a');
        link.href = downloadUrl;
        // link.download = 'downloadedFile.ext';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Error checking download URL status:', error);
    }
  
    if (window.liff) {
      try {
        await window.liff.sendMessages([
          {
            type: 'text',
            text: `ダウンロードリンク: ${downloadUrl}`,
          },
        ]);
        window.liff.closeWindow();
      } catch (error) {
        console.error('Error sending LIFF message:', error);
      }
    }
  };  

  if (isGenerate) {
    return <Generate prompt={prompt} userId={userId} />;
  }

  return (
    <div className="min-h-screen bg-blue-100 flex justify-center items-center">
      <div className="bg-white w-80 rounded-lg shadow-lg p-4 text-center">
        <div className="border-2 border-black mt-1 bg-gray-300 mb-2">
          出力さきを選択してください
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={handleGenerate} 
            className="bg-green-400 py-2 text-white px-4 border flex-1 text-sm"
          >
            こちらでみる
          </button>
          <button 
            onClick={handleDownloadRedirect} 
            className="bg-orange-400 py-2 text-white px-4 border flex-1 text-sm flex justify-center items-center"
          >
            テキストファイル
          </button>
        </div>
      </div>
    </div>
  );
}

export default Option;
