import { configureStore } from '@reduxjs/toolkit';
// redux persist
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import settings from './slices/settings';
import common from './slices/common';
import inventory from './slices/inventory';
import auth from './slices/auth';
import persons from './slices/persons';
import sales from './slices/sales';

// persist config -------------------------------------------

const settingsPersistConfig = {
  key: 'settings',
  storage
};

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: [
    'user',
    'remember',
    'accessToken',
    'refreshToken',
    'isAuthenticated'
  ]
};

// ----------------------------------------------------------

const store = configureStore({
  reducer: {
    settings: persistReducer(settingsPersistConfig, settings),
    common,
    inventory,
    auth: persistReducer(authPersistConfig, auth),
    persons,
    sales
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false
    })
});

const persistor = persistStore(store);

export { store, persistor };
