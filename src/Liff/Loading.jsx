import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext"; // Assuming context for isLoading
import { useAdsContext } from "../utils/context";

const Loading = ({ generate }) => {
    const [ads, setAds] = useState(null);
    const [newAd, setNewAd] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [countdown, setCountdown] = useState(15); // Countdown timer
    const context = useAdsContext();

    useEffect(() => {
        let timeoutRef;
        let intervalRef;

        const fetchAds = async () => {
            if (isWaiting) return;
        
            console.log("🚀 Fetching new ad...");
            try {
                const response = await axios.get("https://reuvindevs.com/liff/public/api/firebase-files");
                console.log("✅ Fetched Ads Data:", response.data);
        
                setAds(response.data);
                setIsWaiting(true);
                setCounter(15);
                context.setIsLoading(true); // Ensure loading is active
        
                console.log("⏳ Playing ad for 15 seconds...");
        
                let adPlayTime = 15000; // Force full 15s playback
                let generateReceived = false;
        
                timeoutRef.current = setTimeout(() => {
                    setIsWaiting(false);
                    console.log("🕒 15s finished, checking generate...");
        
                    if (generate) {
                        console.log("📢 `generate` has content! Ensuring full 15s playback before setting `isLoading = false`...");
                        generateReceived = true;
                    } else {
                        console.log("❌ `generate` is empty. Setting `isDone = true`...");
                        context.setIsDone(true);
                    }
        
                    // Guarantee `isLoading = false` only **after** 15 seconds
                    setTimeout(() => {
                        console.log("🛑 15s ended! Now setting `isDone = false` and `isLoading = false`.");
                        context.setIsDone(false);
                        context.setIsLoading(false);
                        console.log("🔹 Context (After 15s):", { isDone: context.isDone, isLoading: context.isLoading });
                    }, adPlayTime);
        
                }, adPlayTime);
        
            } catch (error) {
                console.error("❌ Error fetching ads:", error);
            }
        };        

        if (generate) {
            console.log("Generate is populated. Generate Data:", generate);
            console.log("context.isLoading:", context.isLoading);
        }

        fetchAds();

        return () => {
            clearTimeout(timeoutRef);
            clearInterval(intervalRef);
        };
    }, []); // Fetch ads when generate updates

    useEffect(() => {
        if (!isPlaying && newAd) {
            console.log("Playing the queued ad.");
            setAds(newAd);
            setNewAd(null);
            setIsPlaying(true);
            setCountdown(15);
            context.setIsLoading(true);

            let intervalRef = setInterval(() => {
                setCountdown((prev) => {
                    if (prev > 1) {
                        console.log("Current Countdown:", prev - 1);
                    } else {
                        console.log("Current Countdown: 0 (Ad about to finish)");
                    }
                    return prev > 0 ? prev - 1 : 0;
                });
            }, 1000);

            setTimeout(() => {
                setIsPlaying(false);
                context.setIsLoading(false);
                clearInterval(intervalRef);
                console.log("Queued ad finished playing. Countdown stopped.");
                console.log("context.isLoading:", context.isLoading);
            }, 15000);
        }
    }, [isPlaying, newAd]);

    return (
        <div className="min-h-screen bg-blue-100 flex justify-center items-center">
            <div className="bg-white w-80 rounded-lg shadow-lg p-4 text-center">
                <div className="border-2 border-black mt-1 bg-gray-300 mb-2">
                    文章の作成が完了しました
                </div>
                <div className="min-h-72 border-2 border-black bg-white mb-2 overflow-auto overflow-x-hidden">
                    {ads?.url ? (
                        ads.mime_type?.includes("image") ? (
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
                        <p>Please waitsssss....</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Loading;
