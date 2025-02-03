  import liff from '@line/liff';
  import React, { useEffect, useState } from 'react';

  function Explanation() {
    const [isPopupQuestions, setIsPopupOpenQuestions] = useState(false);
    const [isPopupOperational, setIsPopupOpenOperational] = useState(false);
    const [imageList, setImageList] = useState([]);
    const [operationalList, setOperationalList] = useState([])
    
    useEffect(() => {
      const images = Object.entries(
        import.meta.glob('../assets/Questions/*.png', { eager: true })
      );

      const sortedImages = images.sort(([pathA], [pathB]) => {
        const numA = parseInt(pathA.split('/').pop().split('.')[0], 10);
        const numB = parseInt(pathB.split('/').pop().split('.')[0], 10);
        return numA - numB;
      });
    
      const sortedImageList = sortedImages.map(([, value]) => value.default);
    
      console.log(sortedImageList);
      setImageList(sortedImageList);
    }, []);

    useEffect(() => {
      const images = Object.values(
        import.meta.glob('../assets/Step/*.png', { eager: true })
      );

      setOperationalList(images.map((image) => image.default));
    }, []);

    function backToHome() {
      if (liff.isInClient()) {
        liff.closeWindow();
      } else {
        console.warn('LIFF is not running in the LINE app.');
      }
    }

    function openPopupQuestions() {
      setIsPopupOpenQuestions(true);
    }

    function openPopupOperational() {
      setIsPopupOpenOperational(true);
    }

    function closePopup() {
      setIsPopupOpenQuestions(false);
    }

    function closePopupOperational(){
      setIsPopupOpenOperational(false)
    }

    return (
      <div className="min-h-screen bg-blue-100 flex justify-center items-center">
        <div className="bg-white w-80 rounded-lg shadow-lg p-4 text-center max-w-screen-2xl">
          <p className="font-bold">1. 設問に回答する</p>
          <div
            className="border-2 border-black p-4 mb-2 h-36 cursor-pointer overflow-y-scroll"
            onClick={openPopupQuestions}
          >
            {imageList.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Question ${index + 1}`}
                className="w-72 h-72 mb-4"
              />
            ))}
          </div>

          <p className="font-bold">2. 設問を回答</p>
          <div className="border py-1 border-black bg-gray-300 mb-2">
            <p className="text-sm">2. 設問を回答</p>
          </div>
          <div className="border-2 border-black p-4 mb-2 h-36 cursor-pointer overflow-y-scroll"
          onClick={openPopupOperational}>
            {operationalList.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Question ${index + 1}`}
                className="w-72 h-72 mb-4"
              />
            ))}
          </div>

          <button
            onClick={backToHome}
            className="border border-black p-2 bg-gray-300 w-full"
          >
            主頁に戻る
          </button>
        </div>

        {isPopupQuestions && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-96 rounded-lg shadow-lg p-4 text-center">
              <h2 className="font-bold mb-4">All Questions</h2>
              <div className="overflow-y-scroll h-96 grid place-items-center">
                {imageList.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Question ${index + 1}`}
                    className="w-72 h-72 mb-4"
                  />
                ))}
              </div>
              <button
                onClick={closePopup}
                className="border border-black p-2 bg-gray-300 w-full"
              >
                Close
              </button>
            </div>
          </div>
        )}
        {isPopupOperational && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-96 rounded-lg shadow-lg p-4 text-center">
              <h2 className="font-bold mb-4">Operational Diagram</h2>
              <div className="overflow-y-scroll h-96 grid place-items-center">
                {operationalList.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Question ${index + 1}`}
                    className="w-72 h-72 mb-4"
                  />
                ))}
              </div>
              <button
                onClick={closePopupOperational}
                className="border border-black p-2 bg-gray-300 w-full"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  export default Explanation;