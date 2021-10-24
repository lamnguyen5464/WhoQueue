import React, { createRef } from 'react';
import { ActivityIndicator } from 'react-native';
import { ROOT_STACKS_ENUM } from './StackConstants';
import debounce from 'lodash/debounce';

module.exports = {
    navigatorRef: createRef(null),
    overlayRef: createRef(null),

    setNavigator(ref) {
        this.navigatorRef.current = ref;
    },

    getNavigator() {
        return this.navigatorRef.current || {};
    },

    setOverlay(ref) {
        this.overlayRef.current = ref;
    },

    getOverlay() {
        return this.overlayRef.current || {};
    },

    activateMainApp() {
        this.getNavigator()?.navigate(ROOT_STACKS_ENUM.MainAppStack);
    },

    deactivateMainAppStack() {
        // back to login
        this.getNavigator()?.navigate(ROOT_STACKS_ENUM.AuthStack);
    },

    pushScreen: debounce(
        (navigation, screen, options = {}) => {
            navigation?.push(screen, options);
        },
        500,
        { leading: true, trailing: false }
    ),

    showLoading() {
        this.overlayRef.current.show({
            component: <ActivityIndicator />,
            cancelHandler: () => null,
        });
    },

    hideLoading() {
        this.overlayRef.current.hide();
    },
};
