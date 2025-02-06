import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAdsContext } from "../utils/context";

const Loading = ({ generate }) => {
    const [ads, setAds] = useState(null);
    const [countdown, setCountdown] = useState(15);
    const [adPlaying, setAdPlaying] = useState(false);
    const context = useAdsContext();
    const timeoutRef = useRef(null);
    const intervalRef = useRef(null);

    const fetchAds = async () => {
        console.log("🚀 Fetching new ad...");
        try {
            const response = await axios.get("https://reuvindevs.com/liff/public/api/firebase-files");
            console.log("✅ Fetched Ads Data:", response.data);
            setAds(response.data);
            setAdPlaying(true);
            setCountdown(15);

            intervalRef.current = setInterval(() => {
                setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
            }, 1000);

            timeoutRef.current = setTimeout(() => {
                console.log("🕒 15s ad playtime completed.");

                if (generate) {
                    console.log("📢 `generate` has content. Setting `isReady = true` after 15s.");
                    context.setIsReady(true);
                    console.log("🔹 Context (After 15s):", { isReady: context.isReady });
                }

                setAdPlaying(false);
                clearInterval(intervalRef.current);
            }, 15000);
        } catch (error) {
            console.error("❌ Error fetching ads:", error);
        }
    };

    useEffect(() => {
        fetchAds();

        const adInterval = setInterval(() => {
            if (!generate) {
                fetchAds();
            }
        }, 15000);

        return () => {
            console.log("🧹 Cleaning up timeouts and intervals...");
            clearTimeout(timeoutRef.current);
            clearInterval(intervalRef.current);
            clearInterval(adInterval);
        };
    }, [generate]);

    return (
        <div className="min-h-screen bg-blue-100 flex justify-center items-center">
            <div className="bg-white w-80 rounded-lg shadow-lg p-4 text-center">
                <div className="border-2 border-black mt-1 bg-gray-300 mb-2">
                    作成が完了しました
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
                        <p>お待ちください...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Loading;
