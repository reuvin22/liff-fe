import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext"; // Assuming context for isLoading

const Loading = ({ generate }) => {
    const { setIsLoading } = useContext(AppContext);
    const [ads, setAds] = useState(null);
    const [newAd, setNewAd] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        let timeoutRef;

        const fetchAds = async () => {
            try {
                const response = await axios.get("https://reuvindevs.com/liff/public/api/firebase-files");
                console.log("Fetched Ads Data:", response.data);

                if (!isPlaying) {
                    // If no ad is playing, start playing the fetched ad
                    setAds(response.data);
                    setIsPlaying(true);

                    // Ensure the ad plays for 15 seconds before switching
                    timeoutRef = setTimeout(() => {
                        setIsPlaying(false);
                        setIsLoading(false); // Set isLoading to false after 15 sec
                    }, 15000);
                } else {
                    // Queue the new ad if one is already playing
                    setNewAd(response.data);
                }
            } catch (error) {
                console.error("Error fetching ads:", error);
            }
        };

        fetchAds();

        return () => clearTimeout(timeoutRef); // Cleanup timeout when unmounting
    }, [generate]); // Refetch ads when generate is updated

    useEffect(() => {
        if (!isPlaying && newAd) {
            // Play the queued ad after the previous ad completes
            setAds(newAd);
            setNewAd(null);
            setIsPlaying(true);

            setTimeout(() => {
                setIsPlaying(false);
                setIsLoading(false);
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
            </div>
        </div>
    );
};

export default Loading;
