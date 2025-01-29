import React, { useState, useEffect } from 'react'
import axios from 'axios'

function ConvertDownload({ userId, fileUrl }) {
    const [link, setLink] = useState("")

    useEffect(() => {
        const fetchDownloadLink = async () => {
            try {
                const response = await axios.post(`https://reuvindevs.com/liff/public/api/convert/${userId}`)
                setLink(response.data.downloadLink)
            } catch (error) {
                console.error("Error fetching download link:", error)
            }
        }

        fetchDownloadLink()
    }, [userId])

    return (
        <div>
            <h1>Download Your File</h1>
            {link ? (
                <a href={link} download="converted_file.txt">
                    <button>Download Text File</button>
                </a>
            ) : (
                <p>Loading download link...</p>
            )}
        </div>
    )
}

export default ConvertDownload
