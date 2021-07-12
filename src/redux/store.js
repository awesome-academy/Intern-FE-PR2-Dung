import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import Saga from "./midlewareSaga";
import { Reducer } from "./reducer";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
export const store = createStore(Reducer, applyMiddleware(sagaMiddleware));

// then run the saga
sagaMiddleware.run(Saga);

// render the application
