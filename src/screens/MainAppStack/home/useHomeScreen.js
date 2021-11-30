import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { Keyboard } from 'react-native';
import AppNavigator from '@core/navigation/AppNavigator';
import { APP_STACKS_ENUMS } from '@screens/MainAppStack';
import useUserData from '@core/data/userprofile/useUserData';
import QRCodeModule from '@core/nativemodule/qrcode/QRCodeModule';
import QueueApiHelper from '@helpers/api/QueueApiHelper';

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
        QueueApiHelper.getJoinedQueue().then(res => {
            console.log(JSON.stringify(res, null, 2));
        });
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

        onPressQr: async () => {
            try {
                const res = await QRCodeModule.startScanning();
                console.log(res);
            } catch (e) {
                console.log('e', e);
            }
        },
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
