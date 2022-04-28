import React from 'react';
export default function ThumbnailMusic(props) {
    return (
        <div ref={props.thumbnailContainerRef} className="thumbnail-container">
            <img className={`little-thumbnail ${props.fullWidth ? '' : 'thumbnail-hover'}`}  style={props.fullWidth ? { height: '15%' } : { height: '100%' }} ref={props.littleThumbnailRef} src="./assets/img/kiMesleMan.jpg" alt=""  />
            
        </div>
    );
}

