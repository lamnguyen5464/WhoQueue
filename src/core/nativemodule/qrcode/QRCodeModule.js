import { NativeModules, NativeEventEmitter } from 'react-native';
const { QRCodeModule = {} } = NativeModules;

// setTimeout(() => {
//     QRCodeModule?.startScanning?.().then(res => {
//         console.log(res);
//     });
// }, 2000);

export default {};
