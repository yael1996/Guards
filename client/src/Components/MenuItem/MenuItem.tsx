import React, { Component } from "react";
import { MenuItem } from "../../Store/Menu/types";

interface Props {
    menuItem: MenuItem
}

class MenuItemComp extends Component<Props> {
    render() {
        const { text } = this.props.menuItem;
        return (
            <article className="list-group-item list-group-item-action">
                {text}
            </article>
        );
    }
}

export default MenuItemComp;