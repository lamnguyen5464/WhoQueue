import { NativeModules } from 'react-native';

const { FacebookSDKModule } = NativeModules;

export default {
    login: FacebookSDKModule?.login,
    getToken: FacebookSDKModule?.getToken,
};
