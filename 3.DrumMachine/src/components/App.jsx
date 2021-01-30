import React, { useState, useEffect } from 'react';

import { DrumPad } from './DrumPad';

export const App = () => {
    const [displayValue, setDisplayValue] = useState('');

    useEffect(() => {
        document.addEventListener('keydown', padHandler);

        return () => document.removeEventListener('keydown', padHandler);
    }, []);

    const padHandler = e => {
        const target = e.key ? e.key.toUpperCase() : e.target.innerText;
        const sound = document.getElementById(target);

        if (!sound) return;

        sound.parentElement.classList.add('active');

        setTimeout(() => sound.parentElement.classList.remove('active'), 100);

        setDisplayValue(sound.parentElement.id);

        sound.play();
    };

    return (
        <div id="drum-machine">
            <div id="display">{displayValue}</div>
            <DrumPad onPadClick={padHandler} />
        </div>
    );
};
