import { useRef, useLayoutEffect } from 'react';
import { useSelector, keySelector, useDispatch, actions } from '@core/context';
import AppNavigator from '@core/navigation/AppNavigator';
import ApiHelper from '@helpers/api/ApiHelper';

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
                if (refInputPassword.current?.getValue() === refInputPassword.current?.getValue()) {
                    throw Error('password is not match');
                }

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
