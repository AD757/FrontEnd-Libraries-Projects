import React from 'react';

// import { Settings } from './Settings';
// import { Timer } from './Timer';

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
      timerColor: { color: 'black' },
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
}
