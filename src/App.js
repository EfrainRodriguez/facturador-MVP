import React from 'react';
// router
import { BrowserRouter as Router } from 'react-router-dom';
// redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './redux/store';
// routes
import { routes, renderRoutes } from './routes';
// theme
import ThemeConfig from './theme';
// components
import { NotistackProvider } from './components';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeConfig>
        <NotistackProvider>
          <Router>{renderRoutes(routes)}</Router>
        </NotistackProvider>
      </ThemeConfig>
    </PersistGate>
  </Provider>
);

export const reduxStore = store;

export default App;
