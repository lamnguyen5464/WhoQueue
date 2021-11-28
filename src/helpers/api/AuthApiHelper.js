import Http from '@core/http';
import UserData from '@core/data/userprofile/UserData';

module.exports = {
    requestOTP({ email = '' }) {
        return Http.request({
            method: Http.METHOD.POST,
            data: {
                email,
            },
            path: '/sign-up/post-email',
        });
    },

    verifyOTP({ email = '', otp = '' }) {
        return Http.request({
            method: Http.METHOD.POST,
            data: {
                email,
                otp,
            },
            path: '/sign-up/verify-otp',
        });
    },

    verifyFBToken({ facebookToken }) {
        return Http.request({
            method: Http.METHOD.POST,
            data: {
                facebookToken,
            },
            path: '/sign-up/use-facebook',
        });
    },

    createNewAccount({ email, fullname, password }) {
        return Http.request({
            method: Http.METHOD.POST,
            data: {
                email,
                fullname,
                password,
            },
            path: '/sign-up/create-account',
            headers: {
                token_otp: Http.getAccessToken(),
            },
        }).then(updateUserProfileData);
    },

    signInByEmail({ email, password }) {
        return Http.request({
            method: Http.METHOD.POST,
            data: {
                email,
                password,
            },
            path: '/login',
        }).then(updateUserProfileData);
    },

    signInByFacebook({ facebookToken }) {
        return Http.request({
            method: Http.METHOD.POST,
            data: {
                facebookToken,
            },
            path: '/login-facebook',
        }).then(updateUserProfileData);
    },

    updateFcmToken({ fcmToken }) {
        return Http.request({
            method: Http.METHOD.POST,
            data: {
                fcmToken,
            },
            path: '/users/update-fcm-token',
        });
    },
};

const updateUserProfileData = ({ data = {} }) => {
    if (!data?.jwtResponse || !data?.userInfo) {
        return;
    }
    const profile = {
        ...data?.jwtResponse,
        ...data?.userInfo,
    };
    UserData.setToStorage(profile);
};
