import { compose, createStore } from 'redux';

import calculatorReducer from './calculatorReducer';

const store = createStore(calculatorReducer, compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;
