import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './home';
import FindQueueScreen from './findqueue';
import MainScreen from './main';
import QueueDetail from './queue-detail';

const Stack = createStackNavigator();

const SCREENS = {
    MainScreen,
    HomeScreen,
    FindQueueScreen,
    QueueDetail,
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
