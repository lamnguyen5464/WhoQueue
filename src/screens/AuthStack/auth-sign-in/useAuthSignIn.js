import { useLayoutEffect } from 'react';
import { useSelector, keySelector, useDispatch, actions } from '@context';
import Http from '@core/http';
import AppNavigator from '@core/navigation/AppNavigator';

const useAuthHome = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return {
        onPressSignIn: () => {},

        onBack: () => {
            navigation.pop();
        },
    };
};

export default useAuthHome;
