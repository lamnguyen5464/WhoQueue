const types = {
    SET_LOCALIZATION: 'SET_LOCALIZATION',
    SET_NAVIGATION_STACK: 'SET_NAVIGATION_STACK',
    SET_USER_PROFILE: 'SET_USER_PROFILE',
};

const actions = {
    setNavigationStack: ({ dispatch, payload }) => {
        dispatch({ type: types.SET_NAVIGATION_STACK, payload });
    },

    setLocalization: ({ dispatch, payload }) => {
        dispatch({ type: types.SET_LOCALIZATION, payload });
    },

    setUserProfile: ({ dispatch, payload }) => {
        dispatch({ type: types.SET_USER_PROFILE, payload });
    },
};

export { types, actions };
