import React from 'react';

function Loading() {
  return (
    <div className="min-h-screen bg-blue-100 flex justify-center items-center">
        <div className="bg-white w-80 rounded-lg shadow-lg p-4 text-center">
        <div className='border-2 border-black mt-1 bg-gray-300 mb-2'>
            文章の作成が完了しました。
        </div>
        <div className='min-h-72 border-2 border-black bg-white mb-2 overflow-auto overflow-x-hidden'>
            回答文章
        </div>
    </div>
</div>
  );
}

export default Loading;