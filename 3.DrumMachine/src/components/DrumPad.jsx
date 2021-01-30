import React from 'react';

import drumPadElements from '../data/drumPadElements';

export const DrumPad = ({ onPadClick }) => (
    <div className="drum-buttons">
        {drumPadElements.drumPad.map(i => {
            return (
                <div id={i.id} className="drum-pad" key={i.keyCode} onClick={onPadClick}>
                    <audio id={i.keyTrigger} className="clip" src={i.url} />
                    {i.keyTrigger}
                </div>
            );
        })}
    </div>
);
