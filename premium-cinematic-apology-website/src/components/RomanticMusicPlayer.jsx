import { useEffect, useRef, useState } from "react";
import { Music2, Pause, Play, Upload, Volume2, VolumeX } from "lucide-react";
import { DEFAULT_MUSIC_TITLE, DEFAULT_MUSIC_URL } from "../content";

const audioTypes = new Set(["audio/mpeg", "audio/mp3", "audio/wav", "audio/x-wav", "audio/wave", "audio/ogg", "application/ogg"]);

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const rounded = Math.floor(seconds);
  return `${Math.floor(rounded / 60)}:${String(rounded % 60).padStart(2, "0")}`;
}

export default function RomanticMusicPlayer({ visible }) {
  const audioRef = useRef(null);
  const [track, setTrack] = useState(() =>
    DEFAULT_MUSIC_URL ? { url: DEFAULT_MUSIC_URL, title: DEFAULT_MUSIC_TITLE, isObjectUrl: false } : null,
  );
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      if (track?.isObjectUrl) URL.revokeObjectURL(track.url);
    };
  }, [track]);

  const handleAudioChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!audioTypes.has(file.type) && !/\.(mp3|wav|ogg)$/i.test(file.name)) {
      setError("Please choose an MP3, WAV, or OGG audio file.");
      event.target.value = "";
      return;
    }

    audioRef.current?.pause();
    setPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setError("");
    setTrack({
      url: URL.createObjectURL(file),
      title: file.name.replace(/\.(mp3|wav|ogg)$/i, ""),
      isObjectUrl: true,
    });
    event.target.value = "";
  };

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio || !track) return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    try {
      await audio.play();
      setError("");
    } catch {
      setError("This file could not be played here. Please try another MP3, WAV, or OGG file.");
    }
  };

  const seek = (event) => {
    const time = Number(event.target.value);
    if (audioRef.current && Number.isFinite(time)) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const changeVolume = (event) => {
    setVolume(Number(event.target.value));
    if (muted) setMuted(false);
  };

  return (
    <aside className={`music-player ${visible ? "is-visible" : ""}`} aria-label="Optional background music player">
      <audio
        ref={audioRef}
        src={track?.url}
        preload="metadata"
        onLoadedMetadata={(event) => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onError={() => { if (track) setError("This audio file could not be loaded. Please try another file."); }}
      />
      <div className="music-player-main">
        <span className="music-symbol" aria-hidden="true"><Music2 size={19} strokeWidth={1.6} /></span>
        <div className="music-meta">
          <span>OPTIONAL SOUNDTRACK</span>
          <strong title={track?.title || "No music selected"}>{track?.title || "No music selected"}</strong>
        </div>
        <label className="music-upload-control" title="Upload an MP3, WAV, or OGG file">
          <Upload size={17} strokeWidth={1.8} aria-hidden="true" />
          <input
            type="file"
            accept=".mp3,.wav,.ogg,audio/mpeg,audio/wav,audio/ogg"
            aria-label="Upload optional instrumental music"
            onChange={handleAudioChange}
          />
        </label>
        <button
          className="music-play-button"
          type="button"
          onClick={togglePlayback}
          disabled={!track}
          aria-label={playing ? "Pause music" : "Play music"}
          title={track ? (playing ? "Pause" : "Play") : "Upload music to play"}
        >
          {playing ? <Pause size={18} fill="currentColor" aria-hidden="true" /> : <Play size={18} fill="currentColor" aria-hidden="true" />}
        </button>
      </div>
      <div className="music-progress-row">
        <time>{formatTime(currentTime)}</time>
        <input
          type="range"
          min="0"
          max={duration || 1}
          step="0.1"
          value={Math.min(currentTime, duration || 1)}
          onChange={seek}
          disabled={!track || !duration}
          aria-label="Music playback progress"
          style={{ "--range-fill": `${duration ? (currentTime / duration) * 100 : 0}%` }}
        />
        <time>{formatTime(duration)}</time>
      </div>
      <div className="music-volume-row">
        <button type="button" onClick={() => setMuted((value) => !value)} aria-label={muted ? "Unmute music" : "Mute music"}>
          {muted || volume === 0 ? <VolumeX size={16} aria-hidden="true" /> : <Volume2 size={16} aria-hidden="true" />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={changeVolume}
          aria-label="Music volume"
          style={{ "--range-fill": `${volume * 100}%` }}
        />
        <span>Only if you want to listen</span>
      </div>
      {error && <p className="music-error" role="alert">{error}</p>}
    </aside>
  );
}