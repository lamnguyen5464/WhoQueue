import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { Keyboard } from 'react-native';
import AppNavigator from '@core/navigation/AppNavigator';
import { APP_STACKS_ENUMS } from '@screens/MainAppStack';
import useUserData from '@core/data/userprofile/useUserData';

const useHomeScreen = props => {
    const { navigation } = props;
    const [isSearching, setSearching] = useState(false);
    const [joinedQueue, setJoinedQueue] = useState(null);
    const refInputSearch = useRef(null);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    useEffect(() => {
        getJoinedQueue();
    }, []);

    const getJoinedQueue = () => {
        //call api here
        setJoinedQueue(DUMMY_QUEUE);
    };

    return {
        joinedQueue,
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

const DUMMY_QUEUE = [
    { hostName: 'Host 1' },
    { hostName: 'Host 2' },
    { hostName: 'Host 3' },
    { hostName: 'Host 5' },
    { hostName: 'Host 7' },
];
