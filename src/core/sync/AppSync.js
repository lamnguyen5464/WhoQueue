import { useLayoutEffect, useEffect } from 'react';
import useLocalization from '@core/localization';
import CoreAPI from '@core/nativemodule/coreapi';
import useNavigationStack from '@core/navigation/useNavigationStack';
import ApiHelper from '@helpers/ApiHelper';

const AppSync = () => {
    const { initLocalization } = useLocalization();
    const { isLoginSuccess, navigationStack } = useNavigationStack();

    useLayoutEffect(() => {
        initLocalization();
        syncDeepLink();

        // const nativeEmittingListener = subscribeListeners();

        // return () => {
        //     nativeEmittingListener?.remove?.();
        // };
    }, []);

    useEffect(() => {
        if (isLoginSuccess()) {
            syncFCMToken();
        }
    }, [navigationStack]);

    const syncFCMToken = async () => {
        try {
            const fcmToken = await CoreAPI.getStorage('FCM_TOKEN_KEY');
            console.log('FCM_TOKEN_KEY: ', fcmToken);
            const response = await ApiHelper.updateFcmToken({ fcmToken });
        } catch (e) {
            console.log('eee', e);
        }
    };

    const syncDeepLink = () => {
        CoreAPI?.getDataFromDeepLink()?.then(res => {
            console.logg?.(JSON.parseSafe(res), 'green', '[syncDeepLink]');
        });
    };

    const subscribeListeners = () => {
        return CoreAPI?.listenNativeEmitter(res => {
            console.logg?.(JSON.parseSafe(res), 'green', '[listenNativeEmitter]');
        });
    };

    return null;
};

export default AppSync;
