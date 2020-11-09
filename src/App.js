import React, { Component } from "react";
import Snake from "./Snake";
import Food from "./Food";

function getRandomCoordinate() {
    let min = 0;
    let max = 49;

    let x = Math.floor(min + Math.random() * (max + 1 - min));
    let y = Math.floor(min + Math.random() * (max + 1 - min));

    return [x, y];
}

const initialState = {
    food: getRandomCoordinate(),
    speed: 150,
    direction: "RIGHT",
    snakeDots: [
        [0, 0],
        [1, 0],
    ],
};

class App extends Component {
    state = initialState;

    componentDidMount() {
        document.onkeydown = this.onKeyDown;
        this.initInterval();
    }

    componentDidUpdate() {
        this.checkSnakeOutBorder();
        this.checkSnakeCollapsed();
        this.checkSnakeEat();
    }

    checkSnakeOutBorder() {
        let head = this.state.snakeDots[this.state.snakeDots.length - 1];

        if (head[0] < 0 || head[1] < 0 || head[0] > 49 || head[1] > 49) {
            this.onGameOver();
        }
    }

    checkSnakeCollapsed() {
        let snake = [...this.state.snakeDots];
        let head = snake.pop();

        snake.forEach((dot) => {
            if (dot[0] === head[0] && dot[1] === head[1]) {
                this.onGameOver();
            }
        });
    }

    checkSnakeEat() {
        let head = this.state.snakeDots[this.state.snakeDots.length - 1];
        let food = this.state.food;

        if (head[0] === food[0] && head[1] === food[1]) {
            this.setState({
                food: getRandomCoordinate(),
            });
            this.snakeGrow();
            this.increaseSpeed();
        }
    }

    initInterval() {
        clearInterval(this.runtime);
        this.runtime = setInterval(this.moveSnake, this.state.speed);
    }

    snakeGrow() {
        let newSnake = [...this.state.snakeDots];
        console.log(newSnake);
        newSnake.unshift([]);
        this.setState({
            snakeDots: newSnake,
        });
    }

    increaseSpeed() {
        if (this.state.speed > 10) {
            this.setState({
                speed: this.state.speed - 10,
            });
            this.initInterval();
        }
    }

    onGameOver() {
        alert(
            `Game over. Snake lenght is ${this.state.snakeDots.length} points`
        );
        this.setState(initialState);
        this.initInterval();
    }

    onKeyDown = (e) => {
        // Internet Explorer doesn't pass event to handler
        //e = e || window.event;
        switch (e.keyCode) {
            case 38:
                this.setState({ direction: "UP" });
                break;
            case 40:
                this.setState({ direction: "DOWN" });
                break;
            case 37:
                this.setState({ direction: "LEFT" });
                break;
            case 39:
                this.setState({ direction: "RIGHT" });
                break;
            default:
                break;
        }
    };

    moveSnake = () => {
        let dots = [...this.state.snakeDots];
        let head = dots[dots.length - 1];

        switch (this.state.direction) {
            case "RIGHT":
                head = [head[0] + 1, head[1]];
                break;
            case "LEFT":
                head = [head[0] - 1, head[1]];
                break;
            case "DOWN":
                head = [head[0], head[1] + 1];
                break;
            case "UP":
                head = [head[0], head[1] - 1];
                break;
            default:
                break;
        }

        dots.push(head);
        dots.shift();
        this.setState({ snakeDots: dots });
    };

    render() {
        return (
            <div className="game-area">
                <Snake snakeDots={this.state.snakeDots} />
                <Food pos={this.state.food} />
            </div>
        );
    }
}

export default App;
