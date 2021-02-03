import React from 'react';
import { useSelector } from 'react-redux';

import { Buttons } from './Buttons';

export const App = () => {
    const { currentValue, result, formula } = useSelector(state => state);

    return (
        <div className="calculator">
            <div className="formula">
                {formula}
            </div>
            <div id="display" className="output">
                {result || currentValue}
            </div>
            <Buttons />
        </div>
    );
};
