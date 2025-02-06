import { useState, useEffect, useRef } from "react";
import axios from "axios";

const Loading = ({ isDone, onLoadingComplete }) => {
    const [ads, setAds] = useState(null);
    const [isPlayingAd, setIsPlayingAd] = useState(false);
    const timeoutRef = useRef(null);

    const fetchAds = async () => {
        try {
            const response = await axios.get("https://reuvindevs.com/liff/public/api/firebase-files");
            console.log("Fetched Ads Data:", response.data);
            setAds(response.data);
            setIsPlayingAd(true); 

            timeoutRef.current = setTimeout(() => {
                setIsPlayingAd(false);
            }, 15000);
        } catch (error) {
            console.error("Error fetching ads:", error);
        }
    };

    useEffect(() => {
        fetchAds();
        const interval = setInterval(() => {
            fetchAds();
        }, 15000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeoutRef.current);
        };
    }, []);

    useEffect(() => {
        if (isDone && !isPlayingAd) {
            onLoadingComplete();
        }
    }, [isDone, isPlayingAd]);

    return (
        <div className="min-h-screen bg-blue-100 flex justify-center items-center">
            <div className="bg-white w-80 rounded-lg shadow-lg p-4 text-center">
                <div className="border-2 border-black mt-1 bg-gray-300 mb-2">
                    文章の作成が完了しました
                </div>
                <div className="min-h-72 border-2 border-black bg-white mb-2 overflow-auto overflow-x-hidden">
                    {ads?.url ? (
                        ads.mime_type && ads.mime_type.includes("image") ? (
                            <img
                                src={ads.url}
                                alt={ads.name || "Ad Image"}
                                className="w-full min-h-72 max-h-72"
                            />
                        ) : (
                            <iframe
                                src={ads.url}
                                className="w-full min-h-72 max-h-72"
                                allow="autoplay"
                                style={{ pointerEvents: "none" }}
                            ></iframe>
                        )
                    ) : (
                        <p>Please wait....</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Loading;
