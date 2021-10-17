import { types } from './actions';

const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.SET_LOCALIZATION:
            return { ...state, localization: payload };
        default:
            return state;
    }
};

export default reducer;
