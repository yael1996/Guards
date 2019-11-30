import React, { Component } from "react";
import { SideMenuItem } from "../store/types";

interface OwnProps {
    data: SideMenuItem[]
}

class SideMenu extends Component<OwnProps> {
    render() {
        const { data } = this.props;
        return (
            <section className="side-menu-wrapper">
                {data.map((x) => {

                })}
            </section>
        );
    }
}

export default SideMenu;