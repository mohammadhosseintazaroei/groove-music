import React from 'react';
import { Link } from "react-router-dom";

export default function SingleArtistPage(props) {
    // const tracks = props.tarcks ? props.data.map(comment => <Comment comment={comment.body}/>) : null;
    return (
        <div className="col-sm-11 col-md-12">
            <div className="row">
                <div className="col-12" style={{ height: '35vh' }}></div>
                <div className="col-12 position-fixed ps-0">
                    <div className="music-containerC">
                        <div className="background-img">
                            <img src={props.albumThumbnail} alt="" />
                        </div>
                        <div className={`background__filter ${props.customClass}`}>

                        </div>

                        <div className="music-headC">
                            <img className={`thumbnail ${props.customClass}`} src={props.albumThumbnail} alt="" />
                        </div>
                        <div className="music-body-container">
                            <div className="music-bodyC">
                                <div className="album-title">{props.albumTitle}</div>
                                <div className="album-artist">{props.albumArtist}</div>
                            </div>
                            <div className="controll-container">
                                <div className="controll-item"><i className="fal fa-play"></i>Play all</div>
                                <div className="controll-item"><i className="fal fa-plus"></i>Add to</div>
                                <Link to={`/artists/${props.albumArtist}`} className="col-12  col-sm-6 col-md-3 col-lg-2 col-xl-2">
                                <div className="controll-item"><i className="fal fa-user"></i>Show artist</div>

                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="row">
            </div> */}
        </div>
    );
}

