import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    setCalculatorState,
    clearCalculatorReducer
} from '../redux/calculatorReducer';

export const Buttons = () => {
    const {
        currentValue,
        formula,
        result
    } = useSelector(state => state);
    const dispatch = useDispatch();

    const regExp = /[+-/*]/;
    const lastTwoCharsIsOperator = formula.slice(-2).match(/[+-/*]/g);

    const onButtonHandler = e => {
        const eventValue = e.target.value;
        const isEventOperator = regExp.test(eventValue);

        if (currentValue === 'Digit Limit') return;
        else if (currentValue.length > 21 && !isEventOperator) {
            const previousValue = currentValue;

            dispatch(setCalculatorState({ currentValue: 'Digit Limit' }));

            setTimeout(() => dispatch(setCalculatorState({ currentValue: previousValue })), 1000);
        } else if (result === 'NAN') {
            if (isEventOperator) return;

            dispatch(setCalculatorState({
                currentValue: eventValue,
                formula: eventValue,
                result: ''
            }));
        } else if (result.toString()) {
            if (!isEventOperator) {
                dispatch(setCalculatorState({
                    currentValue: eventValue,
                    formula: eventValue,
                    result: ''
                }));
            } else if (eventValue === '.') {
                if (result.toString().includes('.')) return;

                const newValue = `${result}${eventValue}`;

                dispatch(setCalculatorState({
                    currentValue: newValue,
                    formula: newValue,
                    result: ''
                }));
            } else {
                dispatch(setCalculatorState({
                    currentValue: eventValue,
                    formula: `${result}${eventValue}`,
                    result: ''
                }));
            }
        } else if (formula.slice(-1) === eventValue && isEventOperator) return;
        else if (lastTwoCharsIsOperator && lastTwoCharsIsOperator.length === 2 && isEventOperator) {
            const newFormula = `${formula.slice(0, -2)}${eventValue}`;

            dispatch(setCalculatorState({
                currentValue: eventValue,
                formula: newFormula
            }));
        } else if (currentValue === '0' && isEventOperator && eventValue !== '-' && eventValue !== '.') return;
        else if (currentValue === '0' && eventValue === '0') {
            dispatch(setCalculatorState({
                formula: eventValue
            }));
        } else if (currentValue.includes('.') && eventValue === '.') return;
        else if (eventValue === '.' && regExp.test(formula.slice(-1))) {
            const newCurrentValue = `0${eventValue}`;
            const newFormula = `${formula}0${eventValue}`;

            dispatch(setCalculatorState({
                currentValue: newCurrentValue,
                formula: newFormula
            }));
        } else if (eventValue === '.') {
            const newCurrentValue = `${currentValue}${eventValue}`;
            const newFormula = !!formula ? `${formula}${eventValue}` : '0.';

            dispatch(setCalculatorState({
                currentValue: newCurrentValue,
                formula: newFormula
            }));
        } else if (regExp.test(formula.slice(-1)) && isEventOperator && eventValue !== '-' && eventValue !== '.') {
            const newFormula = `${formula.slice(0, -1)}${eventValue}`;

            dispatch(setCalculatorState({
                currentValue: eventValue,
                formula: newFormula
            }));
        } else if (isEventOperator) {
            const newFormula = `${formula}${eventValue}`;

            dispatch(setCalculatorState({
                currentValue: eventValue,
                formula: newFormula
            }));
        } else {
            const newFormula = currentValue === '0' ? eventValue : `${formula}${eventValue}`;
            const newCurrentValue = currentValue === '0' ? eventValue : regExp.test(currentValue.replace('.', ''))
                ? `${currentValue.slice(1)}${eventValue}` : `${currentValue}${eventValue}`;

            dispatch(setCalculatorState({
                currentValue: newCurrentValue,
                formula: newFormula
            }));
        }
    };

    const onEqualsHandler = () => {
        if (formula.length !== 1
            && ((lastTwoCharsIsOperator && lastTwoCharsIsOperator.length === 2) || regExp.test(formula.slice(-1)))) {

            const newFormula = lastTwoCharsIsOperator.length === 2 ? formula.slice(0, -2) : formula.slice(0, -1);
            const result = +eval(newFormula).toFixed(4);

            dispatch(setCalculatorState({
                formula: `${newFormula}=${result}`,
                result
            }));
        } else if (!formula || formula.includes('=') || (formula.length === 1 && regExp.test(formula))) {
            dispatch(setCalculatorState({
                formula: '=NaN',
                result: 'NAN'
            }));
        } else {
            const result = +eval(formula).toFixed(4);
            const newFormula = `${formula}=${result}`;

            dispatch(setCalculatorState({
                formula: newFormula,
                result
            }));
        }
    };

    const onClearHandler = () => {
        dispatch(clearCalculatorReducer());
    };

    return (
        <div className="buttons">
            <button id="clear" className="clear-button" onClick={onClearHandler}>AС</button>
            <button id="divide" className="operator-button" value="/" onClick={onButtonHandler}>/</button>
            <button id="multiply" className="operator-button" value="*" onClick={onButtonHandler}>x</button>
            <button id="seven" value="7" onClick={onButtonHandler}>7</button>
            <button id="eight" value="8" onClick={onButtonHandler}>8</button>
            <button id="nine" value="9" onClick={onButtonHandler}>9</button>
            <button id="subtract" className="operator-button" value="-" onClick={onButtonHandler}>-</button>
            <button id="four" value="4" onClick={onButtonHandler}>4</button>
            <button id="five" value="5" onClick={onButtonHandler}>5</button>
            <button id="six" value="6" onClick={onButtonHandler}>6</button>
            <button id="add" className="operator-button" value="+" onClick={onButtonHandler}>+</button>
            <button id="one" value="1" onClick={onButtonHandler}>1</button>
            <button id="two" value="2" onClick={onButtonHandler}>2</button>
            <button id="three" value="3" onClick={onButtonHandler}>3</button>
            <button id="equals" className="equals-button" onClick={onEqualsHandler}>=</button>
            <button id="zero" className="zero-button" value="0" onClick={onButtonHandler}>0</button>
            <button id="decimal" value="." onClick={onButtonHandler}>.</button>
        </div>
    );
};
