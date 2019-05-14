import React, { Component } from 'react';


class TimerClass extends Component {
    constructor(props){
        super(props);
        this.state = {
            seconds: 0
        }
    }


    tick(){
        const { duration, showNextRound } = this.props;
        if(this.state.seconds === duration){
            showNextRound();
        }else{
            this.setState((prevState) => ({
                seconds: prevState.seconds + 1
            }))
        }
    }


    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    render(){
        const { duration } = this.props;
        let timeLeft = duration - this.state.seconds;
        return (
            <div>
                {timeLeft < 10 ? '0' + timeLeft : timeLeft}
            </div>
        )
    }
}


export default TimerClass;
