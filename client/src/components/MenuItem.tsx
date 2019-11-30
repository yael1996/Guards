import React, { Component } from "react";
import { SideMenuItem } from "../store/types";
import "../Styles/MenuItem.css";

interface OwnPros {
    data: SideMenuItem
}

class MenuItemComp extends Component<OwnPros> {
    render() {
        const { text } = this.props.data;
        return (
            <article>
                {text}
            </article>
        );
    }
}

export default MenuItemComp;