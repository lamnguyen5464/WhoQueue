import { NativeModules, NativeEventEmitter } from 'react-native';
const { CoreAPIModule = {} } = NativeModules;
const CoreAPIEmitter = new NativeEventEmitter(CoreAPIModule || {});

export default {
    listenFCMToken: callback => {
        return CoreAPIEmitter?.addListener(CoreAPIModule?.FCM_TOKEN_EMITTER, callback);
    },
    getStorage: key => {
        return CoreAPIModule?.getStorage(key) || new Promise((_, reject) => reject());
    },
};
