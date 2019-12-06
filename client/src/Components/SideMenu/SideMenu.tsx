import React, { Component } from "react";
import { MenuItem } from "../../Store/Menu/types";
import MenuItemComp from "../MenuItem/MenuItem";
import { History, Location } from "history";

interface Props {
    menuItems: MenuItem[],
    history: History<any>,
    location: Location<any>
}

class SideMenu extends Component<Props> {
    render() {
        const { menuItems, history, location } = this.props;
        return (
            <nav className="list-group">
                {menuItems.map((menuItem) => 
                    <MenuItemComp key={menuItem.text} menuItem={menuItem} history={history} location={location} />
                )}
            </nav>
        );
    }
}

export default SideMenu;