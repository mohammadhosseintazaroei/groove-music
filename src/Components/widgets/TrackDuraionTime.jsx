import React from 'react';
export default function TrackCurrentTime(props) {
    return (
        <div className="track-time durationTime">
            <div ref={props.durationTimeRef} id="durationTime"></div>
        </div>
    );
}

