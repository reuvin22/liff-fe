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
            try {
                const response = await axios.get("https://reuvindevs.com/liff/public/api/firebase-files");
                console.log("Fetched Ads Data:", response.data);

                if (!isPlaying) {
                    setAds(response.data);
                    setIsPlaying(true);
                    setCountdown(15); // Reset countdown
                    context.setIsLoading(true); // Start loading state
                    console.log("Ad started playing. Countdown set to 15 seconds.");

                    // Start countdown timer
                    intervalRef = setInterval(() => {
                        setCountdown((prev) => {
                            console.log("Current Countdown:", prev - 1);
                            return prev > 0 ? prev - 1 : 0;
                        });
                    }, 1000);

                    // Ensure ad plays for 15 seconds
                    timeoutRef = setTimeout(() => {
                        setIsPlaying(false);
                        context.setIsLoading(false); // Set loading to false after 15 sec
                        clearInterval(intervalRef); // Stop countdown
                        console.log("Ad finished playing. Countdown stopped.");
                        console.log("context.isLoading:", context.isLoading);
                    }, 15000);
                } else {
                    setNewAd(response.data); // Queue new ad if one is playing
                    console.log("New ad fetched and queued.");
                }
            } catch (error) {
                console.error("Error fetching ads:", error);
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
    }, [generate]); // Fetch ads when generate updates

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
                    console.log("Current Countdown:", prev - 1);
                    return prev > 0 ? prev - 1 : 0;
                });
            }, 1000);

            setTimeout(() => {
                setIsPlaying(false);
                context.setIsLoading(false);
                clearInterval(intervalRef);
                console.log("Queued ad finished playing. Countdown stopped.");
                console.log("context.isLoading:", isLoading);
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
                        <p>Please wait....</p>
                    )}
                </div>
                <div className="text-gray-600 mt-2">
                    Ad will finish in {countdown} seconds...
                </div>
            </div>
        </div>
    );
};

export default Loading;
