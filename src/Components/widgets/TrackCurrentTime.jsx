import React from 'react';
export default function TrackCurrentTime(props) {
    return (
        <div className="track-time currentTime">
            <div ref={props.currnetTimeRef} id="currentTime"></div>
        </div>
    );
}

