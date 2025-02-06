import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext"; // Assuming context for isLoading

const Loading = ({ generate }) => {
    const { setIsLoading } = useContext(AppContext);
    const [ads, setAds] = useState(null);
    const [newAd, setNewAd] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [countdown, setCountdown] = useState(15); // Countdown Timer

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

                    // Start countdown timer
                    intervalRef = setInterval(() => {
                        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
                    }, 1000);

                    // Ensure ad plays for 15 seconds before switching
                    timeoutRef = setTimeout(() => {
                        setIsPlaying(false);
                        setIsLoading(false); // Set isLoading to false after 15 sec
                        clearInterval(intervalRef); // Stop countdown
                    }, 15000);
                } else {
                    setNewAd(response.data); // Queue new ad if one is playing
                }
            } catch (error) {
                console.error("Error fetching ads:", error);
            }
        };

        if (generate) {
            console.log("Generate is populated, context.isLoading:", isPlaying);
        }

        fetchAds();

        return () => {
            clearTimeout(timeoutRef);
            clearInterval(intervalRef);
        };
    }, [generate]); // Refetch ads when generate updates

    useEffect(() => {
        if (!isPlaying && newAd) {
            // Play the queued ad after the previous ad completes
            setAds(newAd);
            setNewAd(null);
            setIsPlaying(true);
            setCountdown(15);

            let intervalRef = setInterval(() => {
                setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
            }, 1000);

            setTimeout(() => {
                setIsPlaying(false);
                setIsLoading(false);
                clearInterval(intervalRef);
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
                <div className="text-gray-600 mt-2">Ad will finish in {countdown} seconds...</div>
            </div>
        </div>
    );
};

export default Loading;
