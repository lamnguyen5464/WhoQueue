import { createRef } from 'react';
import { setItem, getItem, KEY_STORAGE } from '@utils/StorageUtils';

const KEYS = {
    accessToken: 'accessToken',
};

module.exports = {
    dataInstance: createRef(),
    reloadInstanceRef: createRef(),

    getFromStorage() {
        return new Promise((resolve, reject) => {
            getItem(KEY_STORAGE.USER_PROFILE)
                .then(_userProfile => {
                    const parsedData = JSON.parseSafe(_userProfile) || {};
                    this.setDataInstance(parsedData);
                    resolve(parsedData);
                })
                .catch(reject);
        });
    },

    setToStorage(_userProfile) {
        this.setDataInstance(_userProfile);
        this.reloadInstance();
        return setItem(KEY_STORAGE.USER_PROFILE, JSON.stringify(_userProfile));
    },

    setAccessToken(accessToken) {
        const data = {
            ...this.getDataInstance(),
            [KEYS.accessToken]: accessToken,
        };

        this.setToStorage(data);
    },

    clearAccessToken() {
        this.setAccessToken(null);
    },

    getAccessToken() {
        return this.dataInstance.current?.[KEYS.accessToken] || '';
    },

    setReloadInstance(reloadFunc) {
        this.reloadInstanceRef.current = reloadFunc;
    },

    reloadInstance() {
        if (typeof this.reloadInstanceRef.current === 'function') {
            this.reloadInstanceRef.current();
        }
    },

    getDataInstance() {
        return this.dataInstance.current;
    },

    setDataInstance(value) {
        this.dataInstance.current = value;
    },
};
