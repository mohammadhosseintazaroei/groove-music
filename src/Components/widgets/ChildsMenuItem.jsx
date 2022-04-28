import React, { useState, useEffect } from 'react'

import { Link } from "react-router-dom";

export default function ChildsMenuItem(props) {
    return (
        <li className="d-inline">
            <Link to={props.href}>{props.title}</Link>
        </li>

    );
}

