import { useEffect } from 'react';
import { useSelector, keySelector, useDispatch, actions } from '@core/context';
import UserData from './UserData';

const useUserData = forceReload => {
    const userProfile = useSelector(keySelector.userProfile);
    const dispatch = useDispatch();

    useEffect(() => {
        if (forceReload) {
            reload();
        }

        if (!UserData.reloadInstance) {
            UserData.reloadInstance = () => reload();
        }
    }, []);

    const get = () => {
        return userProfile;
    };

    const set = _userProfile => {
        actions.setUserProfile({ dispatch: useDispatch(), payload: _userProfile });
        UserData.setToStorage(_userProfile);
    };

    const reload = () => {
        const rawUserProfile = UserData.getDataInstance();
        if (rawUserProfile) {
            actions.setUserProfile({ dispatch, payload: rawUserProfile });
        } else {
            UserData.getFromStorage().then(data => {
                actions.setUserProfile({ dispatch, payload: data });
            });
        }
    };

    return {
        set,
        get,
        reload,
    };
};

export default useUserData;
