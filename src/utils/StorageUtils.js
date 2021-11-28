import AsyncStorage from '@react-native-async-storage/async-storage';

export const KEY_STORAGE = {
    USER_PROFILE: 'USER_PROFILE',
    ONBOARDING_SHOW: 'ONBOARDING_SHOW',
    LOCALIZATION: 'LOCALIZATION',
};

export const setItem = async (key, value) => {
    return AsyncStorage.setItem(key, value);
};

export const getItem = key => {
    return AsyncStorage.getItem(key);
};
