import React, { Component } from "react";
import { SideMenuItem } from "../store/types";
import "../Styles/MenuItem.css";

interface OwnPros {
    data: SideMenuItem
}

class MenuItem extends Component<OwnPros> {
    render() {
        const { text } = this.props.data;
        return (
            <article>
                {text}
            </article>
        );
    }
}