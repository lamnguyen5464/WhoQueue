import { NativeModules } from 'react-native';
const { QRCodeModule = {} } = NativeModules;

export default {
    startScanning(desc = '') {
        return new Promise((resolve, reject) => {
            this.isGrantedPermission()
                .then(() => {
                    QRCodeModule?.startScanning?.(desc).then(resolve).catch(reject);
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
