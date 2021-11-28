import { types } from './actions';

const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.SET_LOCALIZATION:
            return { ...state, localization: payload };
        case types.SET_NAVIGATION_STACK:
            return { ...state, navigationStack: payload };
        case types.SET_USER_PROFILE:
            return { ...state, userProfile: payload };
        default:
            return state;
    }
};

export default reducer;
