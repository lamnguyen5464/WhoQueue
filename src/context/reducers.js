import { types } from './actions';

const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.SET_TEST_VARIABLE:
            return { ...state, testVariable: payload };
        default:
            return state;
    }
};

export default reducer;
