import React from "react";
import IconMusicControll from "./IconMusicControll";

export default function ContolleItems(props) {
  return (
    <div
      className="contolleItems"
      style={
        props.fullWidth
          ? { position: "absolute", left: 0, bottom: "4vh" }
          : { position: "initial" }
      }
    >
      <IconMusicControll
        handelClick={props.PrevTrack}
        iconClassName="fa-angle-left"
        baseIconClassName="fas"
      />
      <IconMusicControll
        handelClick={props.PrevTrackTime}
        iconClassName="fa-fast-backward fa fa-step-backward"
        baseIconClassName="fas"
      />
      {props.playing ? (
        <IconMusicControll
          handelClick={props.PlayPauseHandel}
          iconClassName="fa-play"
          baseIconClassName="fas"
          className={props.fullWidth ? 'border-0' : 'border-icon'}
        />
      ) : (
        <IconMusicControll
          handelClick={props.PlayPauseHandel}
          iconClassName="fa-pause"
          baseIconClassName="fas"
          className={props.fullWidth ? 'border-0' : 'border-icon'}

        />
      )}
      <IconMusicControll
        handelClick={props.NextTrackTime}
        iconClassName="fa fa-fast-forward fa fa-step-forward"
        baseIconClassName="fas"
      />
      <IconMusicControll
        handelClick={props.NextTrack}
        iconClassName="fa-angle-right"
        baseIconClassName="fas"
      />
    </div>
  );
}
