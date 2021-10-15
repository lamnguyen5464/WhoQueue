import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';

const SCREENS = {
    LoginScreen,
};

const Stack = createStackNavigator();

const StackNavigator = () => {
    const getStackScreens = () =>
        Object.entries(SCREENS)?.map(([key, component]) => (
            <Stack.Screen key={`AuthStack_${key}`} name={key} component={component} />
        ));

    return <Stack.Navigator>{getStackScreens()}</Stack.Navigator>;
};

export const AUTH_STACKS_ENUMS = Object.keys(SCREENS).reduce((previousValue = {}, currentValue) => {
    return {
        ...previousValue,
        [currentValue]: currentValue,
    };
}, {});

export default StackNavigator;
