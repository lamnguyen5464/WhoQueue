import { useLayoutEffect, useState } from 'react';
import AppNavigator from '@core/navigation/AppNavigator';
import { APP_STACKS_ENUMS } from '@screens/MainAppStack';

const useHomeScreen = props => {
    const { navigation } = props;
    const [isSearching, setSearching] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return {
        isSearching,

        startSearching: () => {
            setSearching(true);
        },

        stopSearching: () => {
            setSearching(false);
        },
    };
};

export default useHomeScreen;
