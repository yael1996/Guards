import React, { Component } from "react";
import { MenuItem } from "../../Store/Menu/types";
import { History, Location } from "history";

interface Props {
    menuItem: MenuItem,
    history: History<any>,
    location: Location<any>
}

class MenuItemComp extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.onMouseDown = this.onMouseDown.bind(this);
    }

    onMouseDown() {
        const { history, menuItem } = this.props;
        history.push(menuItem.page);
    }

    render() {
        const { location } = this.props;
        const { text, page } = this.props.menuItem;
        let classes = ["list-group-item", "list-group-item-action"];
        if (location.pathname === page) {
            classes.push("bg-primary", "text-white");   
        }
        return (
            <article className={classes.join(" ")} onMouseDown={this.onMouseDown}>
                {text}
            </article>
        );
    }
}

export default MenuItemComp;