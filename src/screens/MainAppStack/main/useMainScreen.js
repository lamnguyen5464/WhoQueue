import { useRef, useLayoutEffect, useState } from 'react';
import AppNavigator from '@core/navigation/AppNavigator';
import { APP_STACKS_ENUMS } from '@screens/MainAppStack';

const useMainScreen = props => {
    const { navigation } = props;

    useLayoutEffect(() => {}, []);

    return {
        navigation,
        onPressCreate: () => {},
    };
};

export default useMainScreen;
