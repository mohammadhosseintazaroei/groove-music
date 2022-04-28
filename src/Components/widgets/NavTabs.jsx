import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link } from "react-router-dom";
function LinkTab(props) {
    return (
        <Tab
            component={Link}
            {...props}
        />
    );
}
// import ChildsMenuItem from './ChildsMenuItem';
export default function NavTabs() {
    const [menuItem, setMenuItem] = React.useState(null);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    React.useEffect(() => {
        getMenus().then(menu => setMenuItem(menu))
        // document.title = `You clicked ${} times!`
    }, [])
    async function getMenus() {
        const menus = await fetch(`http://localhost:3006/childs/?toParrent=0`);
        return await (await menus).json()
    }
    
    const Menus = menuItem ? menuItem.map(menu => <LinkTab label={menu.title} key={menu.id} onClick={() => document.title = menu.title} to={menu.href} />) : null;

    return (

        <Box sx={{ width: '100%' }}>
            <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
                {Menus}
            </Tabs>
        </Box>
    );
}

