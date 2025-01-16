import { createContext, useContext, useState, useEffect } from 'react';

const VideoContext = createContext();

export const useVideoContext = () => {
    return useContext(VideoContext);
};

export const VideoProvider = ({ children }) => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch videos from the API
    const fetchVideos = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:4501/videos');
            const data = await response.json();
            setVideos(data);
        } catch (error) {
            console.error('Error fetching videos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    const addVideo = async (video) => {
        try {
            const response = await fetch('http://localhost:4501/videos', {
                method: 'POST',
                body: JSON.stringify(video),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const newVideo = await response.json();
            setVideos((prevVideos) => [...prevVideos, newVideo]);
        } catch (error) {
            console.error('Error adding video:', error);
        }
    };

    const updateVideo = async (updatedVideo) => {
        try {
            const response = await fetch(`http://localhost:4501/videos/${updatedVideo.id}`, {
                method: 'PUT',
                body: JSON.stringify(updatedVideo),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const updated = await response.json();
            setVideos((prevVideos) =>
                prevVideos.map((video) => (video.id === updated.id ? updated : video))
            );
        } catch (error) {
            console.error('Error updating video:', error);
        }
    };

    const deleteVideo = async (videoId) => {
        try {
            await fetch(`http://localhost:4501/videos/${videoId}`, {
                method: 'DELETE',
            });
            setVideos((prevVideos) => prevVideos.filter((video) => video.id !== videoId));
        } catch (error) {
            console.error('Error deleting video:', error);
        }
    };

    return (
        <VideoContext.Provider
            value={{
                videos,
                loading,
                setVideos,
                fetchVideos,
                addVideo,
                updateVideo,
                deleteVideo,
            }}
        >
            {children}
        </VideoContext.Provider>
    );
};
