import AsyncStorage from '@react-native-async-storage/async-storage';

export const KEY_STORAGE = {
    ONBOARDING_SHOW: 'ONBOARDING_SHOW',
};

export const setItem = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log('@error setItem', error);
    }
};

export const getItem = async (key, callback) => {
    try {
        const value = await AsyncStorage.getItem(key);
        callback?.(value);
    } catch (error) {
        callback?.(null);
    }
};
