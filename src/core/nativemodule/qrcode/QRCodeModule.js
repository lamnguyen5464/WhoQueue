import { NativeModules } from 'react-native';
const { QRCodeModule = {} } = NativeModules;

export default {
    startScanning() {
        return new Promise((resolve, reject) => {
            QRCodeModule?.checkCameraPermission()
                .then(() => {
                    QRCodeModule?.startScanning?.().then(resolve).catch(reject);
                })
                .catch(reject);
        });
    },

    isGrantedPermission() {
        return new Promise((resolve, reject) => {
            QRCodeModule?.checkCameraPermission()
                .then(res => {
                    if (res === 'granted') {
                        resolve(res);
                    } else {
                        reject(res);
                    }
                })
                .catch(reject);
        });
    },
};
