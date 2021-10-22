import { useLayoutEffect, useState, useRef, useEffect } from 'react';
import { useSelector, keySelector, useDispatch, actions } from '@context';
import Http from '@core/http';
import AppNavigator from '@core/navigation/AppNavigator';

const useAuthEmailOTP = ({ navigation }) => {
    const PAGE_STATUS = {
        INPUT_EMAIL: 'INPUT_EMAIL',
        WAIT_OTP: 'WAIT_OTP',
        CONFIRM_OTP: 'CONFIRM_OTP',
    };

    const [pageStatus, setPageStatus] = useState(PAGE_STATUS.INPUT_EMAIL);

    const isShowOTPInput = pageStatus !== PAGE_STATUS.INPUT_EMAIL;

    const refInputEmail = useRef(null);

    const refInputOTP = useRef(null);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    useEffect(() => {
        if (isShowOTPInput) {
            refInputOTP.current?.focus();
        }
    }, [pageStatus]);

    return {
        PAGE_STATUS,
        refInputEmail,
        refInputOTP,
        isShowOTPInput,

        onPressSendOTP: () => {
            console.log('email:', refInputEmail.current?.getValue());
            setPageStatus(PAGE_STATUS.WAIT_OTP);
        },

        onPressConfirmOTP: () => {
            console.log('otp:', refInputEmail.current?.getValue());
        },
    };
};

export default useAuthEmailOTP;
