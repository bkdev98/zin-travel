import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import reducers from '../reducers';

const persistConfig = {
  key: 'zintravel',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
  persistedReducer,
  {},
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export const persistor = persistStore(store);

export default store;
