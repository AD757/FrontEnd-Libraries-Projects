import React from 'react';

import { Settings } from './Settings';
import { Timer } from './Timer';

export class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            type: 'Session',
            status: 'stop',
            breakLength: 5,
            sessionLength: 25,
            time: 1500,
            intervalId: 0,
            timerColor: { color: 'black' }
        };

        this.calculateTime = this.calculateTime.bind(this);
        this.phaseControl = this.phaseControl.bind(this);
        this.beginCountDown = this.beginCountDown.bind(this);
        this.lengthChangeHandler = this.lengthChangeHandler.bind(this);
        this.startStopHandler = this.startStopHandler.bind(this);
        this.resetHandler = this.resetHandler.bind(this);
    }

    calculateTime() {
        const { time } = this.state;

        let minutes = Math.floor(time / 60);
        let seconds = time - minutes * 60;

        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;

        return minutes + ':' + seconds;
    }

    phaseControl() {
        const {
            time,
            intervalId,
            type,
            breakLength,
            sessionLength
        } = this.state;

        if (time === 0) document.getElementById('beep').play();

        if (time < 61) this.setState({ timerColor: { color: '#a50d0d' } });
        else this.setState({ timerColor: { color: 'black' } });

        if (time < 0) {
            clearInterval(intervalId);

            if (type === 'Session') {
                this.beginCountDown();

                this.setState({
                    time: breakLength * 60,
                    type: 'Break'
                });
            } else {
                this.beginCountDown();

                this.setState({
                    time: sessionLength * 60,
                    type: 'Session'
                });
            }
        }
    }

    beginCountDown() {
        this.setState({
            intervalId: setInterval(() => {
                this.setState({ time: this.state.time - 1 });
                this.phaseControl();
            }, 1000)
        });
    }

    lengthChangeHandler(e) {
        const { status } = this.state;
        const [type, sign] = e.target.id.split('-');
        const currentLength = this.state[`${type}Length`];
        const newLength = sign === 'decrement' ? currentLength - 1 : currentLength + 1;

        if (status === 'run') return;

        if (newLength > 0 && newLength < 61) {
            this.setState({ [`${type}Length`]: newLength });

            if (type === 'session') this.setState({ time: newLength * 60 });
        }
    }

    startStopHandler() {
        const { status, intervalId } = this.state;

        if (status === 'run') {
            clearInterval(intervalId);

            this.setState({ status: 'stop' });
        } else {
            this.beginCountDown();

            this.setState({ status: 'run' });
        }
    }

    resetHandler() {
        clearInterval(this.state.intervalId);

        this.setState({
            type: 'Session',
            status: 'stop',
            breakLength: 5,
            sessionLength: 25,
            time: 1500,
            intervalId: '',
            timerColor: { color: 'black' }
        });

        const audio = document.getElementById('beep');

        audio.pause();
        audio.currentTime = 0;
    }

    render() {
        const {
            breakLength,
            sessionLength,
            type,
            timerColor
        } = this.state;

        return (
            <div id="clock">
                <Settings
                    breakLength={breakLength}
                    sessionLength={sessionLength}
                    onLengthChange={this.lengthChangeHandler}
                />
                <Timer
                    type={type}
                    timerColor={timerColor}
                    calculateTime={this.calculateTime}
                    onReset={this.resetHandler}
                    onStartStop={this.startStopHandler}
                />
                <audio
                    id="beep"
                    src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
                />
            </div>
        );
    }
}
