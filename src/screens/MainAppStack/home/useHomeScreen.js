import { useRef, useLayoutEffect, useState, useEffect, useCallback } from 'react';
import { Keyboard } from 'react-native';
import AppNavigator from '@core/navigation/AppNavigator';
import useUserData from '@core/data/userprofile/useUserData';
import QRCodeModule from '@core/nativemodule/qrcode/QRCodeModule';
import QueueApiHelper from '@helpers/api/QueueApiHelper';
import APP_STACKS_ENUMS from '@screens/MainAppStack/enums';

const useHomeScreen = props => {
    const { navigation } = props;
    const [isSearching, setSearching] = useState(false);
    const [joinedQueue, setJoinedQueue] = useState([]);
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
        QueueApiHelper.getJoinedQueue()
            .then(({ data = [] }) => {
                setJoinedQueue(data);
            })
            .catch(e => {});
    };

    const goToQueueDetail = useCallback(queueData => {
        AppNavigator.pushScreen(navigation, APP_STACKS_ENUMS.QueueDetail, queueData);
    }, []);

    return {
        joinedQueue,
        isSearching,
        refInputSearch,

        goToQueueDetail,

        startSearching: () => {
            setSearching(true);
        },

        stopSearching: () => {
            Keyboard.dismiss();
            setSearching(false);
        },

        onPressQr: async () => {
            try {
                const res = await QRCodeModule.startScanning(
                    'Day la mo ta Day la mo ta Day la mo ta Day la mo ta Day la mo taDay la mo taDay la mo taDay la mo taDay la mo taDay la mo ta'
                );
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
