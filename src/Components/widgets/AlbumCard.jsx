import React from "react";
import { Link } from "react-router-dom";

export default function AlbumCard(props) {
  // const tracks = props.tarcks ? props.data.map(comment => <Comment comment={comment.body}/>) : null;
  return (
    <div
      className={` ${
        props.sidebarshow
          ? "col-12 col-sm-6 col-md-3 col-lg-2 col-xl-2"
          : "col-12 col-sm-6 col-md-3 col-lg-2 card-col-xl-opensidebar "
      } `}
    >
      <div
        onClick={(e) => {
          props.handelClick(props.index);
        }}
      >
        <div className="music-container">
          <Link to={props.albumHref}>
            <div className="music-head">
              <img src={props.thumbnail} alt={props.title} />

            </div>
            <div className="music-body">
              <div className="track-artist">{props.artist}</div>
              <div className="track-title">{props.title}</div>
            </div>
          </Link>
          <button
                className="play-album-songs"
                onClick={(e) => {
                  props.handelAll(props.index);
                }}
              >
                <i className="fas fa-play"></i>
              </button>
        </div>
      </div>
    </div>
  );
}
