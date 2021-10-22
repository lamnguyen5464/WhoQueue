import { useLayoutEffect, useState, useRef, useEffect } from 'react';
import { useSelector, keySelector, useDispatch, actions } from '@context';
import AppNavigator from '@core/navigation/AppNavigator';
import ApiHelper from '@helpers/ApiHelper';
import debounce from 'lodash/debounce';

const useAuthEmailOTP = ({ navigation }) => {
    const PAGE_STATUS = {
        TYPING_EMAIL: 'TYPING_EMAIL',
        SENDING_EMAIL: 'SENDING_EMAIL',
        TYPING_OTP: 'TYPING_OTP',
        VERYFYING_OTP: 'VERYFYING_OTP',
    };

    const [pageStatus, setPageStatus] = useState(PAGE_STATUS.TYPING_EMAIL);

    const isShowOTPInput =
        pageStatus === PAGE_STATUS.TYPING_OTP || pageStatus === PAGE_STATUS.VERYFYING_OTP;

    const loadingCTA =
        pageStatus === PAGE_STATUS.SENDING_EMAIL || pageStatus === PAGE_STATUS.VERYFYING_OTP;

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

    const clearOTP = () => {
        refInputOTP.current?.reset();
    };

    return {
        PAGE_STATUS,
        refInputEmail,
        refInputOTP,
        isShowOTPInput,
        loadingCTA,

        onChangeEmail: debounce(() => {
            setPageStatus(PAGE_STATUS.TYPING_EMAIL);
        }, 300),

        onPressSendOTP: () => {
            const email = refInputEmail.current?.getValue() || 'ntlam19@apcs.fitus.edu.vn';
            setPageStatus(PAGE_STATUS.SENDING_EMAIL);
            ApiHelper.requestOTP({ email })
                .then(res => {
                    console.log('res', res);
                    setPageStatus(PAGE_STATUS.TYPING_OTP);
                })
                .catch(() => {
                    setPageStatus(PAGE_STATUS.TYPING_EMAIL);
                })
                .finally(() => {});
        },

        onPressConfirmOTP: () => {
            const email = refInputEmail.current?.getValue() || 'ntlam19@apcs.fitus.edu.vn';
            const otp = refInputOTP.current?.getValue();

            setPageStatus(PAGE_STATUS.VERYFYING_OTP);
            ApiHelper.verifyOTP({ email, otp })
                .then(res => {
                    // navigate
                    console.log('res', res);
                    setPageStatus(PAGE_STATUS.TYPING_OTP);
                })
                .catch(() => {
                    setPageStatus(PAGE_STATUS.TYPING_OTP);
                })
                .finally(() => {
                    clearOTP();
                });
        },
    };
};

export default useAuthEmailOTP;
