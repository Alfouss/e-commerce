import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore} from "redux";
import {Provider} from "react-redux"
import * as serviceWorker from './serviceWorker';
import userApp from "./reducer/reducers"
import {loadState, saveState} from "../src/reducer/localStorage"

const persistedState = loadState();
const store = createStore(userApp, persistedState);

store.subscribe(async () => {
    saveState(store.getState());
  });
  

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>
, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
