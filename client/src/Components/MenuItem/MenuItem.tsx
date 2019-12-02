import React, { Component } from "react";
import { MenuItem } from "../../Store/Menu/types";
import "./MenuItem.css";

interface Props {
    menuItem: MenuItem
}

class MenuItemComp extends Component<Props> {
    render() {
        const { text } = this.props.menuItem;
        return (
            <article>
                {text}
            </article>
        );
    }
}

export default MenuItemComp;