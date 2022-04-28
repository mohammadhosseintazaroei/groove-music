import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function MusicCard(props) {
  // const tracks = props.tarcks ? props.data.map(comment => <Comment comment={comment.body}/>) : null;
  const [mmd, setMmd] = useState({});

  return (
    // <div onClick={(e) => { props.handelClick(props.index) }} classNameName="col-6 col-sm-6 col-md-3 col-lg-2">
    //     <div classNameName="music-container">
    //         <div classNameName="music-head">
    //             <img src={props.src} alt="" />
    //         </div>
    //         <div classNameName="music-body">
    //             <div classNameName="track-artist">{props.artist}</div>
    //             <div classNameName="track-title">{props.title}</div>
    //         </div>
    //     </div>
    // </div>
    <>
      <div
        className="song-card-wrapper"
        onDoubleClick={(e) => {
          props.handelClick(props.index);
        }}
        // onMouseUp={(e) => {
        //   setMmd({ backgroundColor: "blue" });
        //   console.log(e._reactName);
        // }}
        // onMouse={() => setMmd({ backgroundColor: "red" })}
        // style={mmd}
      >
        <span className="song-first-info">
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
        <Link className="song-album" to={`/albums/${props.album}`}>
          <span>{props.album}</span>
        </Link>
        <span className="song-year">{props.year}</span>
        <span className="song-genre">{props.genre}</span>
        <span className="song-time">{props.time}</span>
      </div>
      {/* <tr
        onDoubleClick={(e) => {
          props.handelClick(props.index);
        }}
      >
        <td>{props.title}</td>
        <td>
          <i
            onClick={(e) => {
              props.handelClick(props.index);
            }}
            className="fa fa-play"
          ></i>
        </td>
        <td>{props.artist}</td>
        <td>{props.album}</td>
      </tr> */}
    </>
  );
}
