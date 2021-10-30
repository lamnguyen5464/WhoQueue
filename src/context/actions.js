const types = {
    SET_LOCALIZATION: 'SET_LOCALIZATION',
    SET_NAVIGATION_STACK: 'SET_NAVIGATION_STACK',
};

const actions = {
    setNavigationStack: ({ dispatch, payload }) => {
        dispatch({ type: types.SET_NAVIGATION_STACK, payload });
    },

    setLocalization: ({ dispatch, payload }) => {
        dispatch({ type: types.SET_LOCALIZATION, payload });
    },
};

export { types, actions };
