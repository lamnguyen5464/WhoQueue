const types = {
    SET_LOCALIZATION: 'SET_LOCALIZATION',
};

const actions = {
    setLocalization: ({ dispatch, payload }) => {
        dispatch({ type: types.SET_LOCALIZATION, payload });
    },
};

export { types, actions };
