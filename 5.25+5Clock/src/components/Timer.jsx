import React from 'react';

export const Timer = ({ type, timerColor, calculateTime, onReset, onStartStop }) => (
    <div className="timer">
        <div id="timer-label" style={timerColor}>{type}</div>
        <div id="time-left" style={timerColor}>{calculateTime()}</div>
        <div>
            <button id="start_stop" onClick={onStartStop}>
                <i className="fa fa-play fa-2x" />
                <i className="fa fa-pause fa-2x" />
            </button>
            <button id="reset" onClick={onReset}>
                <i className="fa fa-refresh fa-2x" />
            </button>
        </div>
    </div>
);
