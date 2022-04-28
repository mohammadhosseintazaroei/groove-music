import React, { useState, useEffect } from 'react'
import MainMenuItem from './MainMenuItem';


export default function MainMenu(props) {
    const [menuItem, setMenuItem] = useState(null);

    const Menus = menuItem ? menuItem.map(menu => <MainMenuItem sidebarshow={props.sidebarshow} key={menu.id} title={menu.title} icon={menu.icon} href={menu.href} />) : null;
    useEffect(() => {
        getMenus().then(menu => setMenuItem(menu))
    }, [])
    async function getMenus() {
        const menus = await fetch(`http://localhost:3006/menu`);
        return await (await menus).json()
    }
    return (
        <ul className="menu-item">
            {Menus}
        </ul>


        //     <ul className="menu-item">
        //         <li>
        //             <Link to="/my_musics">
        //                 <i className="fas fa-music"></i>
        //                 {/* <a className="menuItem">My Musics</a> */}
        //                 <Link className="menuItem" to="/my_musics">My Musics</Link>
        //             </Link>
        //         </li>
        //         <li>
        //             <i className="fas fa-heart"></i>
        //             <a className="menuItem" href="">best musics</a>
        //         </li>
        //         <li>
        //             <i className="fas fa-compact-disc"></i>
        //             <a className="menuItem" href="">now playing</a>
        //         </li>
        //         <li className="border-top playlist">
        //             <i className="fas fa-stream"></i>
        //             <a className="menuItem" href="">playlists</a>
        //         </li>
        //     </ul>
    );
}

