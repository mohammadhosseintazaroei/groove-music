import React from 'react';
export default function Track(props) {
    return (
        <div className="outer-container">
            <audio onEnded={props.endedHandel} ref={props.trackRef} id="track">
            </audio>
        </div>
    );
}

