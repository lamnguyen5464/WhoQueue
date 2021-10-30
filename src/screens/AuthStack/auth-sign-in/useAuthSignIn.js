import { useLayoutEffect } from 'react';
import { useSelector, keySelector, useDispatch, actions } from '@context';
import Http from '@core/http';
import AppNavigator from '@core/navigation/AppNavigator';

const useAuthSignIn = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return {
        onPressSignIn: () => {
            AppNavigator.activateMainApp();
        },

        onBack: () => {
            navigation.pop();
        },
    };
};

export default useAuthSignIn;
