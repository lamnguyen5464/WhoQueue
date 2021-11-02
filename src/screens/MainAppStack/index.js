import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TestScreen1 from './TestScreen1';
import TestScreen2 from './TestScreen2';
import HomeScreen from './home';
import FindQueueScreen from './findqueue';

const Stack = createStackNavigator();

const SCREENS = {
    HomeScreen,
    FindQueueScreen,
    TestScreen1,
    TestScreen2,
};

const StackNavigator = () => {
    const getStackScreens = () =>
        Object.entries(SCREENS)?.map(([key, component]) => (
            <Stack.Screen key={`MainAppStack_${key}`} name={key} component={component} />
        ));

    return <Stack.Navigator>{getStackScreens()}</Stack.Navigator>;
};

export const APP_STACKS_ENUMS = Object.keys(SCREENS).reduce((previousValue = {}, currentValue) => {
    return {
        ...previousValue,
        [currentValue]: currentValue,
    };
}, {});

export default StackNavigator;
