import { useLayoutEffect } from 'react';
import { useSelector, keySelector, useDispatch, actions } from '@core/context';
import Http from '@core/http';
import AppNavigator from '@core/navigation/AppNavigator';
import debounce from 'lodash/debounce';
import AUTH_STACKS_ENUMS from '@screens/AuthStack/enums';

const useAuthHome = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return {
        onPressSignIn: () => {
            AppNavigator.pushScreen(navigation, AUTH_STACKS_ENUMS.AuthSignIn);
        },

        onPressSignUp: () => {
            AppNavigator.pushScreen(navigation, AUTH_STACKS_ENUMS.AuthEmailVerify);
        },
    };
};

export default useAuthHome;
