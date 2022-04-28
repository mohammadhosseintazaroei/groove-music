import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

export default function NowPlayingList(props) {
  return (
    props.fullWidth && (
      <>
        <Tooltip
          placement="top"
          onClick={() => props.nowPlayingListHandleClick()}
          style={props.nowPlayingList ? { top: "94%" } : { bottom: "0%" }}
          title="Delete"
        >
          <IconButton>
            <KeyboardArrowDownIcon
              style={
                props.nowPlayingList
                  ? { transform: "rotate(0deg)", transition: ".7s" }
                  : { transform: "rotate(-180deg)", transition: ".7s" }
              }
            />
          </IconButton>
        </Tooltip>
        {/* {props.nowPlayingList &&   <span  style={{zIndex:'343'}}>dfdsafsdfdsfdsf</span>} */}
      </>
    )
  );
}
