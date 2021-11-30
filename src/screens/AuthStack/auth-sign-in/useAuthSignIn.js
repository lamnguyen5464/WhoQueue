import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSelector, keySelector, useDispatch, actions } from '@core/context';
import AppNavigator from '@core/navigation/AppNavigator';
import AuthApiHelper from '@helpers/api/AuthApiHelper';
import FacebookSDK from '@core/nativemodule/facebooksdk';
import useUserData from '@core/data/userprofile/useUserData';

const useAuthSignIn = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const refInputEmail = useRef(null);
    const refInputPassword = useRef(null);
    const [errorText, setErrorText] = useState('');
    const profileData = useUserData();

    useEffect(() => {
        refInputEmail.current.setValue(profileData?.get()?.email || '');
    }, []);

    return {
        refInputEmail,
        refInputPassword,
        errorText,

        onPressSignIn: async () => {
            AppNavigator.showLoading();
            try {
                const response = await AuthApiHelper.signInByEmail({
                    email: refInputEmail.current?.getValue(),
                    password: refInputPassword.current?.getValue() || '123456',
                });
                // AppNavigator.activateMainApp();
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
                const res = await AuthApiHelper.signInByFacebook({ facebookToken: token });
                // AppNavigator.activateMainApp();
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
