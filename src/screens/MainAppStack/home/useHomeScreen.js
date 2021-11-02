import { useRef, useLayoutEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import AppNavigator from '@core/navigation/AppNavigator';
import { APP_STACKS_ENUMS } from '@screens/MainAppStack';

const useHomeScreen = props => {
    const { navigation } = props;
    const [isSearching, setSearching] = useState(false);
    const refInputSearch = useRef(null);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return {
        isSearching,
        refInputSearch,

        startSearching: () => {
            setSearching(true);
        },

        stopSearching: () => {
            Keyboard.dismiss();
            setSearching(false);
        },

        onPressQr: () => {},
    };
};

export default useHomeScreen;
