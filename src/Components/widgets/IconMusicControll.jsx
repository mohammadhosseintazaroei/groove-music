import React from 'react';
import { IconButton, Icon } from '@mui/material';

export default function IconMusicControll(props) {
    return (
        <IconButton onClick={props.handelClick} aria-label="delete" size="large" className={`controllIcon ${props.className}`} >
            <Icon baseClassName={props.baseIconClassName} sx={{ color: '#fff' }} className={`${props.iconClassName} icon-music-controll`} id="play" />
        </IconButton>
    );
}

