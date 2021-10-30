import { useLayoutEffect, useEffect } from 'react';
import useLocalization from '@core/localization';
import CoreAPI from '@core/nativemodule/coreapi';
import useNavigationStack from '@core/navigation/useNavigationStack';

const AppSync = () => {
    const { initLocalization } = useLocalization();
    const { isLoginSuccess, navigationStack } = useNavigationStack();

    useLayoutEffect(() => {
        initLocalization();
    }, []);

    useEffect(() => {
        if (isLoginSuccess()) {
            syncFCMToken();
        }
    }, [navigationStack]);

    const syncFCMToken = () => {
        CoreAPI.getStorage('FCM_TOKEN_KEY')
            .then(res => {
                console.log('FCM_TOKEN_KEY', res);
            })
            .catch(e => {
                console.log('eee', e);
            });
    };

    return null;
};

export default AppSync;
