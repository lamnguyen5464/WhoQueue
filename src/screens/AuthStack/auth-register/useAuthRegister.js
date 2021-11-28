import { useRef, useLayoutEffect } from 'react';
import AppNavigator from '@core/navigation/AppNavigator';
import AuthApiHelper from '@helpers/api/AuthApiHelper';

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
                if (
                    refInputPassword.current?.getValue() !== refConfirmPassword.current?.getValue()
                ) {
                    throw Error('password is not match');
                }

                const response = await AuthApiHelper.createNewAccount({
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
