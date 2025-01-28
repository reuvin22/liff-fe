import React, { useState } from 'react';
import Generate from './Generate';
import axios from 'axios';

function Option({ prompt, userId }) {
  const [isGenerate, setIsGenerate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generate, setGenerate] = useState("");

  const handleGenerate = () => {
    if (!prompt) {
      console.log('PROMPT IS EMPTY');
    } else {
      setGenerate(prompt);
      setIsGenerate(true);
    }
  };

  const handleConvert = () => {
    setIsLoading(true);
    axios
      .get(`http://127.0.0.1:8000/api/convert/${userId}`)
      .then((response) => {
        const fileUrl = response.data;
        if (fileUrl) {
          window.open(fileUrl, '_blank');
        } else {
          console.error('File URL is not available');
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error generating the file URL", error);
        setIsLoading(false);
      });
  };

  if (isGenerate) {
    return <Generate 
      prompt={generate} 
      userId={userId} 
    />;
  }

  return (
    <div className="min-h-screen bg-blue-100 flex justify-center items-center">
      <div className="bg-white w-80 rounded-lg shadow-lg p-4 text-center">
        <div className='border-2 border-black mt-1 bg-gray-300 mb-2'>
          出力を選択してください
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={handleGenerate} 
            className="bg-green-400 py-2 text-white px-4 border flex-1 text-sm"
          >
            生成する
          </button>
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
        </div>
      </div>
    </div>
  );
}

export default Option;
