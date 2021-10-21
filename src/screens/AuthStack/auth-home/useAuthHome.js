import { useLayoutEffect } from 'react';
import { useSelector, keySelector, useDispatch, actions } from '@context';
import Http from '@core/http';
import AppNavigator from '@core/navigation/AppNavigator';
import { AUTH_STACKS_ENUMS } from '@screens/AuthStack';

const useAuthHome = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return {
        onPressSignIn: () => {
            console.log('ahaergae');
            navigation.push(AUTH_STACKS_ENUMS.AuthSignIn);
        },

        onPressSignUp: () => {},
    };
};

export default useAuthHome;
