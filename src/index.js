import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { persist, CACHE_KEY } from './redux/middleware';
import { api, feeds, pins } from './redux/reducers';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import 'gestalt/dist/gestalt.css';

const { user, board } = window.location.search ? window.location.search.slice(1).split('&').reduce((qs, query) => {
  const [key, val] = query.split('=');
  qs[key.trim()] = val.trim();
  return qs;
}, {}) : { user: 'zackargyle', board: 'sexy-steaks' };

const cachedState = window.localStorage.getItem(CACHE_KEY);
const initialState = cachedState ? JSON.parse(cachedState) : {};
const devtools = window.devToolsExtension ? window.devToolsExtension() : f => f;
const middleware = compose(applyMiddleware(thunk, persist), devtools);

const store = createStore(combineReducers({
  api: api(initialState.api || {}),
  feeds: feeds(initialState.feeds || {}),
  pins: pins(initialState.pins || {}),
}), middleware);

ReactDOM.render((
  <Provider store={store}>
    <App user={user} board={board} />
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
