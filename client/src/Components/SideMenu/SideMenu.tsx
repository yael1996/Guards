import React, { Component } from "react";
import { MenuItem } from "../../Store/Menu/types";
import MenuItemComp from "../MenuItem/MenuItem";

interface Props {
    menuItems: MenuItem[]
}

class SideMenu extends Component<Props> {
    render() {
        const { menuItems } = this.props;
        return (
            <nav className="list-group">
                {menuItems.map((menuItem) => 
                    <MenuItemComp key={menuItem.text} menuItem={menuItem} />
                )}
            </nav>
        );
    }
}

export default SideMenu;