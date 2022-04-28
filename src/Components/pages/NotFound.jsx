import React from 'react';
import { Link } from "react-router-dom";


export default function NotFound(props) {
    // const tracks = props.tarcks ? props.data.map(comment => <Comment comment={comment.body}/>) : null;

    return (

        <>
        <div class="title-404">
            <h1>page not found</h1>
        </div>
            <div className="page-not-found-container-fluid">
                <div className="page-not-found-container">
                    <div>
                        <div className="right-handel">
                            <div className="beat beat-right"></div>
                        </div>
                        <div className="left-handel">
                            <div className="beat beat-left">
                                <i className="fas fa-music headphone-icon"></i>
                            </div>
                        </div>
                    </div>
                    <div className="headChar"></div>
                    <div className="bodyChar"></div>
                    <div className="firstLeg"></div>
                    <div className="secondLeg"></div>
                    <div className="shadowChar"></div>
                </div>
            </div>

        </>
    );
}

