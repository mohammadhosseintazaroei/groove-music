import React from 'react';
import { Link } from "react-router-dom";

export default function ArtistCard(props) {
    // const tracks = props.tarcks ? props.data.map(comment => <Comment comment={comment.body}/>) : null;
    return (
        <Link to={props.artistHref} className="col-12 col-sm-6 col-md-3 col-lg-2 col-xl-2">
            <div onClick={(e) => { props.handelClick(props.index) }}>
                <div className="music-container">
                    <div className="music-head">
                        <img src={props.profile} className="artist-profile" alt="" />
                    </div>
                    <div className="music-body">
                        <div className="track-artist artist-name">{props.artistName}</div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

