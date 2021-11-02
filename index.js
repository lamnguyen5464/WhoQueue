/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { log } from '@utils/Log';
import { LogBox } from 'react-native';

if (__DEV__) {
    console.logg = log;
}

LogBox.ignoreAllLogs();

AppRegistry.registerComponent(appName, () => App);
