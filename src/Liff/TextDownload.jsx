import React, { useState } from 'react';
import Generate from './Generate';
import axios from 'axios';

function TextDownload({ link, userId }) {  // Ensure userId is passed as a prop
  const [isGenerate, setIsGenerate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generate, setGenerate] = useState("");

  const handleGenerate = () => {
    if (!generate) {
      console.log('PROMPT IS EMPTY');
    } else {
      setIsGenerate(true);
    }
  };

  const handleConvert = () => {
    if (!userId) {
      console.error("Error: userId is undefined");
      return;
    }

    setIsLoading(true);
    axios
      .get(`https://reuvindevs.com/liff/public/api/convert/${userId}`, {
        responseType: "blob",
      })
      .then((response) => {
        if (response.data.type === "application/json") {
          console.error("Error:", JSON.parse(response.data));
          setIsLoading(false);
          return;
        }

        const blob = new Blob([response.data], { type: "text/plain" });
        const url = window.URL.createObjectURL(blob);

        if (navigator.userAgent.includes("Line")) {
          window.location.href = url; // Fix for LINE WebView
        } else {
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${userId}_generated.txt`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }

        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error downloading the file", error);
        setIsLoading(false);
      });
  };

  if (isGenerate) {
    return <Generate prompt={generate} userId={userId} />;
  }

  const openInBrowser = () => {
    window.location.href = link; 
  };

  return (
    <div className="min-h-screen bg-blue-100 flex justify-center items-center">
      <div className="bg-white w-80 rounded-lg shadow-lg p-4 text-center">
        <div className='border-2 border-black mt-1 bg-gray-300 mb-2'>
          出力を選択してください
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={handleConvert} 
            className="bg-orange-400 py-2 text-white px-4 border flex-1 text-sm flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-7 h-7 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
            ) : (
              'テキストファイル'
            )}
          </button>
          <button 
            onClick={openInBrowser} 
            className="bg-blue-400 py-2 text-white px-4 border flex-1 text-sm flex justify-center items-center"
          >
            ブラウザで開く
          </button>
        </div>
      </div>
    </div>
  );
}

export default TextDownload;
