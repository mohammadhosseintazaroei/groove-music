import React, { useState, useEffect, useRef } from "react";

// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link
// } from "react-router-dom";

import Track from "./widgets/Track";
import TrackInfo from "./widgets/TrackInfo";
import ProgressBar from "./widgets/ProgressBar";
import VolumeBar from "./widgets/VolumeBar";
import ThumbnailMusic from "./widgets/ThumbnailMusic";
import Musics from "./widgets/Musics";
import ContolleItems from "./widgets/ContolleItems";
import NowPlayingListIcon from "./widgets/NowPlayingListIcon";

export default function Index(props) {
  const [playing, setPlaying] = useState(true);
  const [prevNextTrack, setPrevNextTrack] = useState(null);
  const [fullWidth, setFullWidth] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [nowPlayingList, setNowPlayingList] = useState(false);

  let [trackIndex, setTrackIndex] = useState(0);

  const track = useRef();

  const thumbnail = useRef();
  const littleThumbnail = useRef();
  const trackArtist = useRef();
  const trackTitle = useRef();
  const trackAlbum = useRef();
  const progressBar = useRef();
  const trackCurrnetTime = useRef();
  const trackDurationTime = useRef();
  const currentBg = useRef();
  const thumbnailContainer = useRef();
  const volumeBar = useRef();
  const volumeIcon = useRef();
  const TrackInfoR = useRef();
  const playerContainer = useRef();

  useEffect(() => {
    // track.current.volume = 0.2;
    getTracks().then((track) => setPrevNextTrack(track));

    window.addEventListener("keydown", (event) => {
      switch (event.which) {
        case 39:
          track.current.currentTime += 2.5;
          break;
        case 37:
          track.current.currentTime -= 2.5;
          break;
        // case 32:
        //     PlayPauseHandel();
        //     break;
        default: // Do nothing
      }
    });
  }, []);

  async function getTracks() {
    const tracksA = await fetch(`http://localhost:3002/tracks`);
    return await (await tracksA).json();
  }
  const setPlayingStateStatus = (statusP) => {
    setPlaying(statusP);
  };

  const setTracksItem = (tracks, index) => {
    track.current.src = tracks[index].trackSrc;
    thumbnail.current.src = tracks[index].thumbnail;
    littleThumbnail.current.src = tracks[index].thumbnail;
    trackArtist.current.textContent = tracks[index].artist;
    trackTitle.current.textContent = tracks[index].title;
    trackAlbum.current.textContent = tracks[index].album;
  };

  const PlayHandel = async (prevNextTrack , trackIndex) => {
    setTracksItem(prevNextTrack, trackIndex)
   await setPlayingStateStatus(false);
  await  track.current.play();
   await track.current.src ? setShowPlayer(true) : setShowPlayer(false);
  };
  function PlayPauseHandel() {
    if (playing || track.current.play() === true) {
      track.current.play();
      setPlayingStateStatus(false);
    } else if (!playing || track.current.play() === false) {
      track.current.pause();
      setPlayingStateStatus(true);
    }
  }
  function nowPlayingListHandleClick() {
    if (!nowPlayingList) {
      setNowPlayingList(true);
    } else {
      setNowPlayingList(false);
    }
  }
  // const CoverImage = styled('div')({
  //     width: 100,
  //     height: 100,
  //     objectFit: 'cover',
  //     overflow: 'hishowPlayeren',
  //     flexShrink: 0,
  //     borderRadius: 8,
  //     backgroundColor: 'rgba(0,0,0,0.08)',
  //     '& > img': {
  //         width: '100%',
  //     },
  // });
  // handel next track
  async function NextTrack() {
    // await  setState({
    //     trackIndex: trackIndex += 1
    // })
    await setTrackIndex((trackIndex += 1));
    if (trackIndex > prevNextTrack.length - 1) {
      await setTrackIndex((trackIndex -= trackIndex));
    }
    await setPlayingStateStatus(true);
    await PlayHandel(prevNextTrack, trackIndex);
  }

  async function PrevTrack() {
    if (trackIndex > 0) {
      await setTrackIndex((trackIndex -= 1));
    } else {
      await setTrackIndex(prevNextTrack.length);
    }
    await setPlayingStateStatus(true);
    await PlayHandel(prevNextTrack, trackIndex);
  }

  const PrevTrackTime = () => {
    progressBar.current.max = track.current.duration;
    progressBar.current.value = track.current.currentTime -= 2.5;
    currentBg.current.max = track.current.duration;
    currentBg.current.value = track.current.currentTime -= 2.5;
  };
  const NextTrackTime = () => {
    progressBar.current.max = track.current.duration;
    progressBar.current.value = track.current.currentTime += 2.5;
    currentBg.current.max = track.current.duration;
    currentBg.current.value = track.current.currentTime += 2.5;
  };
  const ProgressValue = () => {
    progressBar.current.max = track.current.duration;
    progressBar.current.value = track.current.currentTime;
    currentBg.current.max = track.current.duration;
    currentBg.current.value = track.current.currentTime;
    trackCurrnetTime.current.textContent = FormatTime(
      track.current.currentTime
    );
    trackDurationTime.current.textContent = FormatTime(track.current.duration);
  };
  setInterval(ProgressValue, 500);

  const FormatTime = (sec) => {
    let minutes = Math.floor(sec / 60);
    let seconds = Math.floor(sec - minutes * 60);
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    if (isNaN(minutes, seconds)) {
      return "0:00";
    }
    return `${minutes}:${seconds}`;
  };

  const changeProgressBar = () => {
    track.current.currentTime = currentBg.current.value;
    track.current.currentTime = progressBar.current.value;
    console.log(progressBar.current, currentBg.current.value);
  };

  const handelFullWidth = async (status) => {
    if (await fullWidth) {
      setNowPlayingList(false);
    }
    await setFullWidth(status);
  };

  return (
    <>
      <Musics
        showPlayer={showPlayer}
        setTrackIndex={setTrackIndex}
        trackIndex={trackIndex}
        setPrevNextTrack={setPrevNextTrack}
        prevNextTrack={prevNextTrack}
        PlayHandel={PlayHandel}
        playing={playing}
        PlayPauseHandel={PlayPauseHandel}
        setPlayingStateStatus={setPlayingStateStatus}
        track={track.current}
        thumbnail={thumbnail}
        littleThumbnail={littleThumbnail}
        trackArtist={trackArtist}
        trackTitle={trackTitle}
        trackAlbum={trackAlbum}
        setTracksItem={setTracksItem}
      />
      <div className="outer-container">
        {<Track trackRef={track} endedHandel={NextTrack} />}
      </div>

      <div
        className="player-container"
        style={
          fullWidth
            ? { height: "100vh", padding: "3vh 1vw" }
            : { height: "15vh", padding: "0 0" } && showPlayer
            ? { display: "inline-block" }
            : { display: "none" }
        }
        id="playerContainer"
        ref={playerContainer}
      >
        {fullWidth && (
          <i
            onClick={() => handelFullWidth(false)}
            class="fas fa-arrow-left fullwidth-go-back"
          ></i>
        )}
        <img
          ref={thumbnail}
          src="./assets/img/kiMesleMan.jpg"
          alt=""
          id="thumbnail"
        />
        <div
          className="background-filter"
          style={
            nowPlayingList
              ? { background: "rgb(0 0 0 / 52%)", backdropFilter: "blur(2vw)" }
              : null
          }
        ></div>
        <div
          className="box"
          style={
            (fullWidth
              ? { alignItems: "flex-end" }
              : { alignItems: "flex-start" },
            nowPlayingList
              ? { position: "absolute", transform: 'translateY(-70%)', transition: "transform .5s" }
              : { position: "initial", transition: ".5s" })
          }
        >
          <div
            className="track-info-main"
            onClick={(e) => {
              handelFullWidth(true);
            }}
            style={
              fullWidth
                ? {
                    alignItems: "flex-end",
                    position: "absolute",
                    transform: "translateY(-20vh)",
                  }
                : {
                    alignItems: "center",
                    position: "initial",
                    transform: "translateY(0)",
                  }
            }
          >
            <ThumbnailMusic
              fullWidth={fullWidth}
              thumbnailContainerRef={thumbnailContainer}
              littleThumbnailRef={littleThumbnail}
              alt=""
            />
            <div
              className="track-info-container"
              style={
                fullWidth
                  ? { cursor: "default", height: "15%" }
                  : { cursor: "pointer", height: "100%" }
              }
            >
              <TrackInfo
                fullWidth={fullWidth}
                trackArtistRef={trackArtist}
                trackTitleRef={trackTitle}
                trackAlbumRef={trackAlbum}
                TrackInfoRef={TrackInfoR}
              />
            </div>
          </div>
          <div>
            <ContolleItems
              fullWidth={fullWidth}
              playing={playing}
              PrevTrack={PrevTrack}
              PrevTrackTime={PrevTrackTime}
              PlayPauseHandel={PlayPauseHandel}
              NextTrackTime={NextTrackTime}
              NextTrack={NextTrack}
              fullWidth={fullWidth}
            />
            <ProgressBar
              fullWidth={fullWidth}
              changeProgressBarHandel={changeProgressBar}
              progressBarRef={progressBar}
              currentBgRef={currentBg}
              trackCurrnetTimeRef={trackCurrnetTime}
              trackDurationTimeRef={trackDurationTime}
            />
          </div>
          <NowPlayingListIcon
            nowPlayingList={nowPlayingList}
            fullWidth={fullWidth}
            nowPlayingListHandleClick={nowPlayingListHandleClick}
          />
          <VolumeBar
            fullWidth={fullWidth}
            volumeIcon={volumeIcon}
            track={track}
            volumeBar={volumeBar}
            volumeIconRef={volumeIcon}
          />
        </div>
      </div>
    </>
  );
}
