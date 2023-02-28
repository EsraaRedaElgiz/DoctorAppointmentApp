/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import store from './src/Redux/store'
import { Provider } from 'react-redux'
import React from 'react';
const ConnectedApp = () =>
    <Provider store={store}>
        <App />
    </Provider>

AppRegistry.registerComponent(appName, () => ConnectedApp);
