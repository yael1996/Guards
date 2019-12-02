import React, { Component } from "react";
import "./SideMenu.css";
import { MenuItem } from "../../Store/Menu/types";
import MenuItemComp from "../MenuItem/MenuItem";

interface Props {
    menuItems: MenuItem[]
}

class SideMenu extends Component<Props> {
    render() {
        const { menuItems } = this.props;
        return (
            <section className="side-menu-wrapper">
                {menuItems.map((menuItem) => 
                    <MenuItemComp key={menuItem.text} menuItem={menuItem} />
                )}
            </section>
        );
    }
}

export default SideMenu;