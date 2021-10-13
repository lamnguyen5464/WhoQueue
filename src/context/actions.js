const types = {
    SET_TEST_VARIABLE: 'SET_TEST_VARIABLE',
};

const actions = {
    setTestVariable: ({ dispatch, payload }) => {
        dispatch({ type: types.SET_TEST_VARIABLE, payload });
    },
};

export { types, actions };
