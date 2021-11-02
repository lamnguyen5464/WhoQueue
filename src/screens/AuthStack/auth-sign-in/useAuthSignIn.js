import { useLayoutEffect, useRef, useState } from 'react';
import { useSelector, keySelector, useDispatch, actions } from '@context';
import AppNavigator from '@core/navigation/AppNavigator';
import ApiHelper from '@helpers/ApiHelper';
import FacebookSDK from '@core/nativemodule/facebooksdk';

const useAuthSignIn = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const refInputEmail = useRef(null);
    const refInputPassword = useRef(null);
    const [errorText, setErrorText] = useState('');

    return {
        refInputEmail,
        refInputPassword,
        errorText,

        onPressSignIn: async () => {
            AppNavigator.showLoading();
            try {
                const response = await ApiHelper.signInByEmail({
                    email: refInputEmail.current?.getValue(),
                    password: refInputPassword.current?.getValue(),
                });
                AppNavigator.activateMainApp();
            } catch (e) {
                console.log(e);
                setErrorText(e.description);
            } finally {
                AppNavigator.hideLoading();
            }
        },

        onPressFacebook: async () => {
            try {
                const { token } = await FacebookSDK.getToken?.();
                AppNavigator.showLoading();
                const res = await ApiHelper.signInByFacebook({ facebookToken: token });
                AppNavigator.activateMainApp();
            } catch (e) {
                setErrorText(e.description);
            } finally {
                AppNavigator.hideLoading();
            }
        },

        onBack: () => {
            navigation.pop();
        },
    };
};

export default useAuthSignIn;
