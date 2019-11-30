import React, { Component } from "react";
import { SideMenuItem } from "../store/types";
import MenuItemComp from "./MenuItem";
import "../Styles/SideMenu.css";

interface OwnProps {
    data: SideMenuItem[]
}

class SideMenu extends Component<OwnProps> {
    render() {
        const { data } = this.props;
        return (
            <section className="side-menu-wrapper">
                {data.map((x) => {
                    return <MenuItemComp data={x} />
                })}
            </section>
        );
    }
}

export default SideMenu;