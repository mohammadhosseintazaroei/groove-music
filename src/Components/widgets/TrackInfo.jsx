import React from 'react'

export default function TrackInfo(props) {
    return (
        <div className={`track-info ${props.fullWidth ? '' : 'track-info-hover'} `}  ref={props.TrackInfoRef}>
            <div style={props.fullWidth ? { fontWeight:'700' , fontSize: '1.5vw' } : { fontWeight:'200'}} ref={props.trackTitleRef} id="track-title"></div> 
            <div><div style={props.fullWidth ? { fontWeight:'200' } : { fontWeight:'700'}} ref={props.trackArtistRef} id="track-artist" className='d-inline'></div>  <span className={` ${props.fullWidth ? 'd-inine-block' : 'd-none'} `} ><span id="DOT" className='d-inline'> • </span><div id="track-album" className="d-inline" ref={props.trackAlbumRef}></div></span> </div>
        </div>
    );
}

