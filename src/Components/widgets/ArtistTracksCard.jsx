import React from 'react';

export default function ArtistTracksCard(props) {
    return (
            <div onClick={(e) => { props.handelClick(props.index) }} className="col-6 col-sm-6 col-md-3 col-lg-2 col-xl-2">
                <div className="music-container">
                    <div className="music-head">
                        <img src={props.thumbnail} alt={props.title} />
                    </div>
                    <div className="music-body">
                        <div className="track-artist">{props.artist}</div>
                        <div className="track-title">{props.title}</div>
                    </div>
                </div>
            </div>
    );
}

