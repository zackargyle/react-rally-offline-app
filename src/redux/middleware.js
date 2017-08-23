import debounce from 'lodash/debounce';
export const CACHE_KEY = '$$CACHED_STATE$$';

const persistState = debounce(state => {
  localStorage.setItem(CACHE_KEY, JSON.stringify(state));
}, 500);

export const persist = store => next => action => {
  next(action);
  persistState(store.getState());
};
