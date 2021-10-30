import React, { forwardRef, useImperativeHandle } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import useNavigationStack from './useNavigationStack';

const AppNavigation = forwardRef((props, ref) => {
    const { CurrentStack, activateMainApp, deactivateMainAppStack } = useNavigationStack();

    useImperativeHandle(ref, () => ({
        deactivateMainAppStack,
        activateMainApp,
    }));

    return (
        <NavigationContainer>
            <CurrentStack />
        </NavigationContainer>
    );
});

export default AppNavigation;
