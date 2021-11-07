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

JSON.parseSafe = data => {
    let result = null;
    if (data) {
        if (typeof data === 'object') {
            return data;
        }
        try {
            result = JSON.parse(data);
        } catch (error) {
            console.logg?.(`[Cannot parse] data: ${data}`, 'red');
        }
    }
    return result;
};

LogBox.ignoreAllLogs();

AppRegistry.registerComponent(appName, () => App);
