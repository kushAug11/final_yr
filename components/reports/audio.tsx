import React, { useRef, useState, useEffect } from 'react';

interface AudioPlayerProps {
    src: string;
}

function AudioPlayer({ src }: AudioPlayerProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div>
            <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
            <audio ref={audioRef} src={src} />
        </div>
    );
}

export default AudioPlayer;