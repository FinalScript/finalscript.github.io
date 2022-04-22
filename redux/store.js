import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import blockchainReducer from './blockchain/blockchainReducer';
import dataReducer from './data/dataReducer';
import { createWrapper } from 'next-redux-wrapper';

const rootReducer = combineReducers({
    blockchain: blockchainReducer,
    contractData: dataReducer,
});

const middleware = [thunk];
const composeEnhancers = compose(applyMiddleware(...middleware));

export const store = createStore(rootReducer, composeEnhancers);

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
