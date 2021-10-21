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
        onPressSignIn: () => {
            console.log('ahaergae');
        },

        onBack: () => {
            navigation.pop();
        },
    };
};

export default useAuthHome;
