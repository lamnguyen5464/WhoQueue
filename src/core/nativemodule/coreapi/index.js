import { NativeModules, NativeEventEmitter } from 'react-native';
const { CoreAPIModule = {} } = NativeModules;
const CoreAPIEmitter = new NativeEventEmitter(CoreAPIModule || {});

export default {
    listenNotificationEmitter: callback => {
        return CoreAPIEmitter?.addListener(CoreAPIModule?.NOTIFICATION_EMITTER, callback);
    },
    getStorage: key => {
        return CoreAPIModule?.getStorage(key) || new Promise((_, reject) => reject());
    },
};
