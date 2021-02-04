export const SET_CALCULATOR_STATE = 'calculatorReducer/SET_CALCULATOR_STATE';
export const CLEAR_CALCULATOR_REDUCER = 'calculatorReducer/CLEAR_CALCULATOR_REDUCER';

export const setCalculatorState = payload => ({ type: SET_CALCULATOR_STATE, payload });
export const clearCalculatorReducer = () => ({ type: CLEAR_CALCULATOR_REDUCER });

export const initialState = {
    currentValue: '0',
    formula: '',
    result: ''
};

const calculatorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CALCULATOR_STATE:
            return { ...state, ...action.payload };
        case CLEAR_CALCULATOR_REDUCER:
            return { ...state, ...initialState };
        default:
            return state;
    }
};

export default calculatorReducer;
