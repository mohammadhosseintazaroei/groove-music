import React, { useState } from 'react';
import { Slider } from '@mui/material';

export default function VolumeBar(props) {
    let [volumeIconClass, setVolumeIconClass] = useState("fa fa-volume-up")
    let [volumeIconColor, setVolumeIconColor] = useState("#fff")

    // const UpVolume = () => {
    //     if (track.current.volume <= 1) {
    //         track.current.volume += 0.01
    //     } else {
    //         track.current.volume = 1;
    //     }
    //     // setVolumeIcon();
    // }
    // const DownVolume = () => {
    //     if (track.current.volume >= 0) {
    //         track.current.volume -= 0.01
    //     }
    //     // setVolumeIcon();
    // }

    const setVolumeIconS = () => {
        if (props.track.current.volume !== 0) {
            setVolumeIconColor('rgb(255 255 255)')
        }
        const trackVolume = props.track.current.volume;
        if (props.track.current.volume === 0) {
            setVolumeIconClass('fas fa fa-volume-mute')
            setVolumeIconColor('rgb(152 135 135)')
        } else if (trackVolume <= .2) {
            setVolumeIconClass('fas fa fa-volume-down')
        } else if (trackVolume <= .4) {
            setVolumeIconClass('fas fa fa-volume-down')
        } else if (trackVolume <= .7) {
            setVolumeIconClass('fas fa fa-volume-up')
        } else if (trackVolume >= .8) {
            setVolumeIconClass('fas fa fa-volume-up')
            // setVolumeIconColor('#f13b3b')
        }
    }
    const TrackVolume = () => {
        props.track.current.volume = props.volumeBar.current.outerText / 100;
        setVolumeIconS()
    }
    const volumeMute = () => {
        if (props.track.current.volume !== 0) {
            props.track.current.volume = 0;
            setVolumeIconClass('fas fa fa-volume-mute')
            setVolumeIconColor('rgb(176 137 137)')
            //  volumeBar.current.value =  track.current.volume;
        } else {
            props.track.current.volume = props.volumeBar.current.outerText / 100;
            setVolumeIconS()
        }
    }
    return (
        <div className="volume-container" style={props.fullWidth ? { alignItems: 'flex-end',transform: 'translateY(-6vh)' } : { alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <i onClick={volumeMute} className={volumeIconClass} style={{ color: volumeIconColor }} ></i>
                <Slider
                    defaultValue={50}
                    id="volume"
                    aria-label="Small"
                    valueLabelDisplay="auto"
                    ref={props.volumeBar}
                    onClick={TrackVolume}
                    onChange={TrackVolume}
                    
                />
            </div>
        </div >
    );
}

