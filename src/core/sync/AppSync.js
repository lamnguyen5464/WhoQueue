import { useLayoutEffect, useEffect } from 'react';
import useLocalization from '@core/localization';
import CoreAPI from '@core/nativemodule/coreapi';
import useNavigationStack from '@core/navigation/useNavigationStack';
import AuthApiHelper from '@helpers/api/AuthApiHelper';
import useUserData from '@core/data/userprofile/useUserData';

const AppSync = () => {
    const { initLocalization } = useLocalization();
    const { isLoginSuccess, navigationStack, activateMainApp, deactivateMainAppStack } =
        useNavigationStack();
    const userProfile = useUserData(true);

    useLayoutEffect(() => {
        initLocalization();
        syncDeepLink();

        // const nativeEmittingListener = subscribeListeners();

        // return () => {
        //     nativeEmittingListener?.remove?.();
        // };
    }, []);

    useEffect(() => {
        console.logg?.(userProfile.get(), 'yellow', 'profile');
        const data = userProfile.get() || {};
        const { accessToken } = data;

        if (!!accessToken) {
            activateMainApp();
        } else {
            deactivateMainAppStack();
        }
    }, [userProfile.get()]);

    useEffect(() => {
        if (isLoginSuccess()) {
            syncFCMToken();
        }
    }, [navigationStack]);

    const syncFCMToken = async () => {
        try {
            const fcmToken = await CoreAPI.getStorage('FCM_TOKEN_KEY');
            // console.log('FCM_TOKEN_KEY: ', fcmToken);
            const response = await AuthApiHelper.updateFcmToken({ fcmToken });
        } catch (e) {
            // console.log('eee', e);
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
