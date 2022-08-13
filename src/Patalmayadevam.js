import React, { useState, useEffect } from "react";
import patlam from "./Patlamaya-Devam(PaglaSongs).mp3";
import squid from "./2d4adaf81d4a24d3da1a5c93834e56b9.gif";
import './Styles.css';

const useAudio = () => {
  const [audio] = useState(new Audio(patlam));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const Player = ({ url }) => {
  const [playing, toggle] = useAudio(url);

  return (
    <div className="body">
      <img src={squid} className="photo" />
      <button className="btn" onClick={toggle}>{playing ? "Mute" : "Unmute"}</button>

    </div>
  );
};

export default Player;
