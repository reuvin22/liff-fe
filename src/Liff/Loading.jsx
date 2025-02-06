import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAdsContext } from "../utils/context";

const Loading = ({ generate }) => {
    const [ads, setAds] = useState(null);
    const [isWaiting, setIsWaiting] = useState(false);
    const [counter, setCounter] = useState(15);
    const timeoutRef = useRef(null);
    const intervalRef = useRef(null);
    const context = useAdsContext();
    const [end, setEnd] = useState(false)
    const fetchAds = async () => {
        if (isWaiting) return;
    
        console.log("🚀 Fetching new ad...");
        try {
            const response = await axios.get("https://reuvindevs.com/liff/public/api/firebase-files");
            console.log("✅ Fetched Ads Data:", response.data);
    
            setAds(response.data);
            setIsWaiting(true);
            setCounter(15);
            context.setIsLoading(true);
    
            console.log("⏳ Playing ad for 15 seconds...");
    
            let adPlayTime = 15000;
            let generateReceived = false;
    
            timeoutRef.current = setTimeout(() => {
                setIsWaiting(false);
                console.log("🕒 15s finished, checking generate...");
    
                if (generate) {
                    console.log("📢 `generate` has content! Ensuring full 15s playback before setting `isLoading = false`...");
                    generateReceived = true;
                } else {
                    console.log("❌ `generate` is empty. Setting `isDone = true`...");
                }
    
                setTimeout(() => {
                    console.log("🛑 15s ended! Now setting `isDone = false` and `isLoading = false`.");

                    console.log("🔹 Context (After 15s):", { isLoading: context.isLoading });
                }, adPlayTime);
                
                setEnd(true)
            }, adPlayTime);
    
        } catch (error) {
            console.error("❌ Error fetching ads:", error);
        }
    };    

    useEffect(() => {
        fetchAds();

        intervalRef.current = setInterval(() => {
            setCounter((prev) => {
                console.log(`⏳ Countdown: ${prev} seconds remaining`);
                if (prev <= 1) {
                    fetchAds();
                    return 15;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            console.log("🧹 Cleaning up timeouts and intervals...");
            clearInterval(intervalRef.current);
            clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <div className="min-h-screen bg-blue-100 flex justify-center items-center">
            <div className="bg-white w-80 rounded-lg shadow-lg p-4 text-center">
                <div className="border-2 border-black mt-1 bg-gray-300 mb-2">
                    {context.isDone ? "文章の作成が完了しました" : "Loading new ad..."}
                </div>
                <p className="text-sm font-medium text-gray-700">
                    Next ad fetch in: {counter} seconds
                </p>
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
