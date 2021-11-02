import Http from '@core/http';

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
        });
    },

    signInByEmail({ email, password }) {
        return Http.request({
            method: Http.METHOD.POST,
            data: {
                email,
                password,
            },
            path: '/login',
        });
    },

    signInByFacebook({ facebookToken }) {
        return Http.request({
            method: Http.METHOD.POST,
            data: {
                facebookToken,
            },
            path: '/login-facebook',
        });
    },
};
