// store.ts
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import counterReducer from './reducer';

const rootReducer = combineReducers({
  counter: counterReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;




/*import { applyMiddleware, compose, createStore } from "redux";

import rootReducer from "./reducer";
import thunk from "redux-thunk";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;*/