import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthHome from './auth-home';
import AuthSignIn from './auth-sign-in';
import AuthEmailVerify from './auth-email-verify';
import AuthRegister from './auth-register';

const SCREENS = {
    AuthHome,
    AuthSignIn,
    AuthEmailVerify,
    AuthRegister,
};

const Stack = createStackNavigator();

const StackNavigator = () => {
    const getStackScreens = () =>
        Object.entries(SCREENS)?.map(([key, component]) => (
            <Stack.Screen key={`AuthStack_${key}`} name={key} component={component} />
        ));

    return (
        <Stack.Navigator screenOptions={{ animationEnabled: true }}>
            {getStackScreens()}
        </Stack.Navigator>
    );
};

export const AUTH_STACKS_ENUMS = Object.keys(SCREENS).reduce((previousValue = {}, currentValue) => {
    return {
        ...previousValue,
        [currentValue]: currentValue,
    };
}, {});

export default StackNavigator;
