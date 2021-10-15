import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ROOT_STACKS_ENUM, STACKS } from './StackConstants';

const AppNavigation = forwardRef((props, ref) => {
    const [stack, setStack] = useState(ROOT_STACKS_ENUM.AuthStack);

    useImperativeHandle(ref, () => ({
        navigate,
    }));

    const navigate = (_stack = ROOT_STACKS_ENUM.AuthStack) => {
        setStack(_stack);
    };

    const CurrentStack = STACKS?.[stack] || STACKS.AuthStack;

    return (
        <NavigationContainer>
            <CurrentStack />
        </NavigationContainer>
    );
});

export default AppNavigation;
