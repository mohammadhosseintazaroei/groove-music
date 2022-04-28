import React from "react";
import { Link } from "react-router-dom";

export default function AlbumTracksCard(props) {

  // console.log(props.prevNextTrack ? props.prevNextTrack.title : null);
  return (
    // <div onClick={(e) => { props.handelClick(props.index) }} className="col-6 col-sm-6 col-md-3 col-lg-2 col-xl-2">
    //     <div className="music-container">
    //         <div className="music-head">
    //             <img src={props.thumbnail} alt={props.title} />
    //         </div>
    //         <div className="music-body">
    //             <div className="track-artist">{props.artist}</div>
    //             <div className="track-title">{props.title}</div>
    //         </div>
    //     </div>
    // </div>
    <div
      className="song-card-wrapper song-albums-tracks-wrapper"
      onDoubleClick={(e) => {
        props.handelClick(props.index);
      }}
    >
      <span className="song-first-info">
        <span className="song-index"> {props.index}.</span>
        <span className="song-title">{props.title}</span>
        <span className="song-icons-wrapper">
          <i
            onClick={(e) => {
              props.handelClick(props.index);
            }}
            className="fa fa-play"
          ></i>
          <i className="fa fa-plus"></i>
        </span>
      </span>

      <Link className="song-artist" to={`/artists/${props.artist}`}>
        <span>{props.artist}</span>
      </Link>
      <span className="song-time">{props.time}</span>
    </div>
  );
}
