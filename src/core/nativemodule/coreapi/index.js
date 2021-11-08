import { NativeModules, NativeEventEmitter } from 'react-native';
const { CoreAPIModule = {} } = NativeModules;
const CoreAPIEmitter = new NativeEventEmitter(CoreAPIModule || {});

export default {
    listenNativeEmitter: callback => {
        return CoreAPIEmitter?.addListener(CoreAPIModule.COMMON_NATIVE_EMITTING, callback);
    },

    getDataFromDeepLink: () => {
        return CoreAPIModule.getOneShotStorage(CoreAPIModule.DATA_FROM_DEEPLINK);
    },

    getStorage: key => {
        return CoreAPIModule?.getStorage(key) || new Promise((_, reject) => reject());
    },
};
