import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSelector, keySelector, useDispatch, actions } from '@core/context';
import AppNavigator from '@core/navigation/AppNavigator';
import AuthApiHelper from '@helpers/api/AuthApiHelper';
import FacebookSDK from '@core/nativemodule/facebooksdk';
import useUserData from '@core/data/userprofile/useUserData';

const useQueueDetail = ({ navigation, route }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const { name, theme, address, hostName, status, startDate, endDate, id } = route?.params || {};

    const refInputEmail = useRef(null);
    const refInputPassword = useRef(null);
    const [errorText, setErrorText] = useState('');
    const profileData = useUserData();

    useEffect(() => {}, []);

    return {
        refInputEmail,
        refInputPassword,
        errorText,

        name,
        theme,
        address,
        hostName,
        status,
        startDate,
        endDate,
        roomId: id,
        userId: profileData?.get()?.id,
        haveJoined: true,

        onPressJoin: async () => {},

        onBack: () => {
            navigation.pop();
        },
    };
};

export default useQueueDetail;
