import MainAppStack from '@screens/MainAppStack';
import AuthStack from '@screens/AuthStack';

export const STACKS = {
    MainAppStack,
    AuthStack,
};

export const ROOT_STACKS_ENUM = Object.keys(STACKS).reduce((previousValue = {}, currentValue) => {
    return {
        ...previousValue,
        [currentValue]: currentValue,
    };
}, {});
