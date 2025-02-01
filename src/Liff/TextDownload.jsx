import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function TextDownload() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');

  useEffect(() => {
    if (!userId) {
      navigate('/'); // Redirect to home if no userId is provided
      return;
    }

    axios
      .get(`https://reuvindevs.com/liff/public/api/convert/${userId}`, {
        responseType: "blob",
      })
      .then((response) => {
        const blob = new Blob([response.data], { type: "text/plain" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${userId}_generated.txt`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setIsLoading(false);

        // Navigate back after a delay
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      })
      .catch((error) => {
        console.error("Error downloading the file", error);
        setIsLoading(false);
      });
  }, [userId, navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="text-center">
        {isLoading ? (
          <p className="text-lg font-semibold">Downloading...</p>
        ) : (
          <p className="text-lg font-semibold">Download complete! Redirecting...</p>
        )}
      </div>
    </div>
  );
}

export default TextDownload;
