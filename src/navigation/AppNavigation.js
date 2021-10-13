import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SCREENS from '@screens';

const Stack = createStackNavigator();

const StackNavigator = () => {
    const getStackScreens = () =>
        Object.keys(SCREENS)?.map(key => (
            <Stack.Screen key={`${key}Screen`} name={key} component={SCREENS?.[key]} />
        ));

    return <Stack.Navigator>{getStackScreens()}</Stack.Navigator>;
};

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    );
};

export default AppNavigation;
