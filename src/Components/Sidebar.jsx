import React from 'react';
import { Link } from "react-router-dom";
import MainMenu from "../Components/widgets/MainMenu";
import GoBack from './widgets/GoBack'

export default function AlbumTracksCard(props) {
    return (
        <>
            <div className={`sidebar-size-relative ${props.sidebarshow ? 'sidebar-medum-width' : 'sidebar-little-width'} `} id="size" ></div>

            <aside style={props.showPlayer ? { height: '87vh' } : { height: '100vh' }} className={`sidebar ${props.sidebarshow ? 'sidebar-medum-width' : 'sidebar-little-width'}`} id="sidebare">
            <GoBack/>

                <i id="showingSidebar" onClick={props.sidebarHandel} className="fas fa-bars bars-icon "></i>
                <div className="menu-container mb-3">
                    <div className="search-container  position-relative">
                        {/* <Search tracks={tracks} handelChangeTrackIndex={props.handelChangeTrackIndex} /> */}

                        <Link className='search' to={"/search"}>
                            <i style={props.sidebarshow ? { right: '0vw' } : { left: '0vw' }} className="far fa-search search-icon position-absolute"></i>
                            {props.sidebarshow && <input onChange={e => props.setSearchTerm(e.target.value)} type="text" id="searchInput" className="search-box" placeholder="Search" />}
                        </Link>

                    </div>
                    <MainMenu sidebarshow={props.sidebarshow} />
                </div>
            </aside>
        </>
    );
}
