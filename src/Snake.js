import React, { Component } from "react";

class Snake extends Component {
    render() {
        let element = this.props.snakeDots.map((dot, i) => {
            const style = {
                left: `${dot[0] * 2}%`,
                top: `${dot[1] * 2}%`,
            };

            return <div className="snake-dot" key={i} style={style}></div>;
        });

        return <div>{element}</div>;
    }
}

export default Snake;
