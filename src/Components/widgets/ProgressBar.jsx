import React from 'react';
import TrackCurrentTime from './TrackCurrentTime';
import TrackDuraionTime from './TrackDuraionTime';

// import { Slider } from '@mui/material';


export default function ProgressBar(props) {
    return (
        <div className="progress-bar" style={props.fullWidth ? { bottom: '12%', width: "100vw" ,right:"0"} : { bottom: '5%', width: "35vw"  }}>
            <TrackCurrentTime currnetTimeRef={props.trackCurrnetTimeRef} />
            <div className="hidden">
                <div >(; hidden</div>
            </div>
            <input onInput={props.changeProgressBarHandel} ref={props.progressBarRef} type="range" id="progressBar" min="0" max="10" />
            <input ref={props.currentBgRef} className="currentBg" type="range" min="0" max="10" />
            <div className="hidden">
                <div>hidden ;)</div>
            </div>
            <TrackDuraionTime durationTimeRef={props.trackDurationTimeRef} />
            {/* <Slider
                aria-label="Temperature"
                defaultValue={30}
                color="secondary"
            /> */}
        </div>
    );
}

