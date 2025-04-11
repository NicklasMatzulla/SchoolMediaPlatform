import React, { useState, useRef } from "react";
import Button from "../button/Button";
import "./AudioPlayer.css";

const AudioPlayer = ({ args }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1.0);
    const audioRef = useRef(null);

    const audioSrc = args[0];

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    return (
        <div className="audio-player">
            <audio ref={audioRef} src={audioSrc} />
            <Button onClick={togglePlay} className="audio-button">
                {isPlaying ? "Pausa" : "Reproducir"}
            </Button>
            <label className="volume-control">
                Lautstärke
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="volume-slider"
                />
            </label>
        </div>
    );
};

export default AudioPlayer;
