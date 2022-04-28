import React from 'react';
import { Link } from "react-router-dom";


export default function MainMenuItem(props) {
    // const tracks = props.tarcks ? props.data.map(comment => <Comment comment={comment.body}/>) : null;

    return (
        <li>
            <Link to={props.href}>
                <i className={`fas menu-icon ${props.icon}`}></i>
                {/* <a className="menuItem">My Musics</a> */}
                {props.sidebarshow &&  <span  className="menuItem" >{props.title}</span>}
            </Link>
        </li>
    );
}

