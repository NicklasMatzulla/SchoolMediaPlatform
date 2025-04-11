import React from "react";
import "./VideoPlayer.css";

const VideoPlayer = ({ args }) => {
    const [label, videoSrc, poster] = args;

    return (
        <div className="video-player-container">
            {label && <div className="video-label">{label}</div>}
            <video
                className="video-element"
                controls
                poster={poster}
            >
                <source src={videoSrc} type="video/mp4" />
                Dein Browser unterstützt das Video-Element nicht.
            </video>
        </div>
    );
};

export default VideoPlayer;