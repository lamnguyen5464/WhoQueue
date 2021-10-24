import { useRef, useLayoutEffect } from 'react';
import { useSelector, keySelector, useDispatch, actions } from '@context';
import Http from '@core/http';
import AppNavigator from '@core/navigation/AppNavigator';

const useAuthRegister = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const refInputName = useRef(null);
    const refInputPassword = useRef(null);
    const refConfirmPassword = useRef(null);

    return {
        refInputName,
        refInputPassword,
        refConfirmPassword,

        onPressRegister: () => {
            AppNavigator.showLoading();

            setTimeout(() => {
                AppNavigator.activateMainApp();
                AppNavigator.hideLoading();
            }, 2000);
        },

        onBack: () => {
            navigation.pop();
        },
    };
};

export default useAuthRegister;
