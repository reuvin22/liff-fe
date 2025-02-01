import React, { useState } from 'react';
import Generate from './Generate';
import { useNavigate } from 'react-router-dom';

function Option({ prompt, userId }) {
  const [isGenerate, setIsGenerate] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = () => {
    if (!prompt) {
      console.log('PROMPT IS EMPTY');
    } else {
      setIsGenerate(true);
    }
  };

  const handleDownloadRedirect = () => {
    navigate(`/convert?userId=${userId}`);
  };

  if (isGenerate) {
    return <Generate prompt={prompt} userId={userId} />;
  }

  return (
    <div className="min-h-screen bg-blue-100 flex justify-center items-center">
      <div className="bg-white w-80 rounded-lg shadow-lg p-4 text-center">
        <div className="border-2 border-black mt-1 bg-gray-300 mb-2">
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
