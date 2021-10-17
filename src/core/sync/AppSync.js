import { useLayoutEffect } from 'react';
import useLocalization from '@core/localization';

const AppSync = () => {
    const { initLocalization } = useLocalization();

    useLayoutEffect(() => {
        initLocalization();
    }, []);

    return null;
};

export default AppSync;
