import { useRef, useLayoutEffect } from 'react';
import { useSelector, keySelector, useDispatch, actions } from '@context';
import AppNavigator from '@core/navigation/AppNavigator';
import ApiHelper from '@helpers/ApiHelper';

const useAuthRegister = ({ navigation, route }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const { email } = route?.params || {};
    const refInputName = useRef(null);
    const refInputPassword = useRef(null);
    const refConfirmPassword = useRef(null);

    return {
        refInputName,
        refInputPassword,
        refConfirmPassword,

        onPressRegister: async () => {
            //TODO: VALIDATE confirm passs
            AppNavigator.showLoading();

            try {
                const response = await ApiHelper.createNewAccount({
                    email,
                    fullname: refInputName.current?.getValue(),
                    password: refInputPassword.current?.getValue(),
                });
                console.logg?.(response, 'yellow');
                AppNavigator.activateMainApp();
            } catch (e) {
                //TODO
                console.log(e);
            } finally {
                AppNavigator.hideLoading();
            }
        },

        onBack: () => {
            navigation.pop();
        },
    };
};

export default useAuthRegister;
