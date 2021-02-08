import React from 'react';

export const Settings = ({ breakLength, sessionLength, onLengthChange }) => (
    <div className="settings">
        <div className="break">
            <div id="break-label">Break Length</div>
            <div className="controller">
                <i id="break-decrement" className="fa fa-arrow-down fa-2x" onClick={onLengthChange} />
                <span id="break-length">{breakLength}</span>
                <i id="break-increment" className="fa fa-arrow-up fa-2x" onClick={onLengthChange} />
            </div>
        </div>
        <div className="session">
            <div id="session-label">Session Length</div>
            <div className="controller">
                <i id="session-decrement" className="fa fa-arrow-down fa-2x" onClick={onLengthChange} />
                <span id="session-length">{sessionLength}</span>
                <i id="session-increment" className="fa fa-arrow-up fa-2x" onClick={onLengthChange} />
            </div>
        </div>
    </div>
);
