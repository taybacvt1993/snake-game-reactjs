import React, { Component } from "react";

class Food extends Component {
    render() {
        let stylePos = {
            left: `${this.props.pos[0] * 2}%`,
            top: `${this.props.pos[1] * 2}%`,
        };

        return <div className="snake-food" style={stylePos}></div>;
    }
}

export default Food;
