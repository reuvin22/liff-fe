import { useState, useEffect } from "react";
import axios from "axios";
import { useAdsContext } from "../utils/context";

const Loading = ({ generate }) => {
    const [ads, setAds] = useState({});
    const [newAd, setNewAd] = useState(null);
    const [isWaiting, setIsWaiting] = useState(false);
    const context = useAdsContext();
    const [apiResponded, setApiResponded] = useState(false); // Track if the API has responded at least once.

    useEffect(() => {
        let timeoutRef;
        let apiTimeout;

        const fetchAds = async () => {
            try {
                const response = await axios.get("https://reuvindevs.com/liff/public/api/firebase-files");
                console.log("Fetched Ads Data:", response.data);
                setApiResponded(true); // Set to true upon receiving the first response.
                setAds(response.data);
                setNewAd(response.data) // Store the new Ad in newAd.
            } catch (error) {
                console.error("Error fetching ads:", error);
            }
        };

        // If generate has data
        if (generate) {
            // Set a timeout to set isLoading to false if the API doesn't respond within 15 seconds.
            apiTimeout = setTimeout(() => {
                if (!apiResponded) {
                    console.log("API didn't respond in 15 seconds. Setting isLoading to false.");
                    context.setIsLoading(false); // Set isLoading to false in the context
                }
            }, 15000);

            fetchAds();
        } else {
            // If generate doesn't have data, immediately set isLoading to false
            context.setIsLoading(false);
        }

        return () => {
            clearTimeout(timeoutRef);
            clearTimeout(apiTimeout);
        };
    }, [generate, context]); // Add context to the dependency array

    useEffect(() => {
        if (newAd) {
          const timeoutId = setTimeout(() => {
            context.setIsLoading(false);
          }, 15000);

          return () => clearTimeout(timeoutId); // Cleanup the timeout if the component unmounts
        }
      }, [newAd, context]);

    return (
        <div className="min-h-screen bg-blue-100 flex justify-center items-center">
            <div className="bg-white w-80 rounded-lg shadow-lg p-4 text-center">
                <div className="border-2 border-black mt-1 bg-gray-300 mb-2">
                    文章の作成が完了しました
                </div>
                <div className="min-h-72 border-2 border-black bg-white mb-2 overflow-auto overflow-x-hidden">
                    {ads.url ? (
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