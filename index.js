/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { log } from '@utils/Log';

if (__DEV__) {
    console.logg = log;
}

AppRegistry.registerComponent(appName, () => App);
