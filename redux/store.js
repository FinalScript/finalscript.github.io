import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import blockchainReducer from './blockchain/blockchainReducer';
import mintReducer from './mint/mintReducer';
import generalReducer from './general/generalReducer';
import { createWrapper } from 'next-redux-wrapper';

const rootReducer = combineReducers({
    blockchain: blockchainReducer,
    mintData: mintReducer,
    general: generalReducer,
});

const middleware = [thunk];
const composeEnhancers = compose(applyMiddleware(...middleware));

export const store = createStore(rootReducer, composeEnhancers);

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
