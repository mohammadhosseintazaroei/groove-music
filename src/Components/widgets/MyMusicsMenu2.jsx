import React, { useState, useEffect } from 'react'

import { Link } from "react-router-dom";

import ChildsMenuItem from './ChildsMenuItem';
export default function MyMusicsMenu2(props) {
    const [menuItem, setMenuItem] = useState(null);

    useEffect(() => {
        getMenus().then(menu => setMenuItem(menu))
        // document.title = `You clicked ${} times!`
    }, [])
    const Menus = menuItem ? menuItem.map(menu => <ChildsMenuItem title={menu.title} href={menu.href} />) : null;

    async function getMenus() {
        const menus = await fetch(`http://localhost:3006/childs/?toParrent=0`);
        return await (await menus).json()
    }


    return (
        <div className="row page-menuitem-row">
            <div className="col-12">
                <ul className="border-bottom pb-2 mb-3 tab-item">
                    {Menus}
                </ul>
            </div>

        </div>


        // <div className="row page-menuitem-row">
        // <div className="col-12">
        //     <ul className="border-bottom pb-2 mb-3 tab-item">
        //         <li className="d-inline">
        //             {/* <span onClick={this.showSongs} href="" >Songs</span> */}
        //             <Link to="/my_musics-songs">Songs</Link>
        //         </li>
        //         <li className="d-inline">
        //             {/* <a href="" >Artists</a> */}
        //             <Link to="/my_musics-artists">Artists</Link>
        //         </li>
        //         <li className="d-inline">
        //             {/* <span onClick={this.showAlbums} href="" >Albums</span> */}
        //             <Link to="/my_musics-albums">Albums</Link>
        //         </li>

        //     </ul>
        // </div>

        // </div>
    );
}

