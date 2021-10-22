import { useLayoutEffect } from 'react';
import { useSelector, keySelector, useDispatch, actions } from '@context';
import Http from '@core/http';
import AppNavigator from '@core/navigation/AppNavigator';
import { AUTH_STACKS_ENUMS } from '@screens/AuthStack';
import debounce from 'lodash/debounce';

const useAuthHome = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return {
        onPressSignIn: debounce(() => {
            navigation.push(AUTH_STACKS_ENUMS.AuthSignIn);
        }, 500),

        onPressSignUp: () => {},
    };
};

export default useAuthHome;
