import { useSelector, keySelector, useDispatch, actions } from '@context';
import { LOCALIZATION_ENUMS, CONTENT } from './constants';
import { KEY_STORAGE, getItem, setItem } from '@utils/StorageUtils';

const useLocalization = () => {
    const currentLocalization = useSelector(keySelector.localization) || LOCALIZATION_ENUMS.en;
    const dispatch = useDispatch();

    const initLocalization = () => {
        getItem(KEY_STORAGE.LOCALIZATION, key => {
            setLocalization(key ?? LOCALIZATION_ENUMS.en);
        });
    };

    const setLocalization = (localization = LOCALIZATION_ENUMS.en) => {
        actions.setLocalization({ dispatch, payload: localization });
        setItem(KEY_STORAGE.LOCALIZATION, localization);
    };

    const getLocalization = () => {
        return currentLocalization;
    };

    const LOCALIZED_CONTENT = CONTENT[currentLocalization] || {};

    return {
        LOCALIZATION_ENUMS,
        LOCALIZED_CONTENT,
        initLocalization,
        setLocalization,
        getLocalization,
    };
};

export default useLocalization;
