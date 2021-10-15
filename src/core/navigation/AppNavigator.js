import { createRef } from 'react';
import { ROOT_STACKS_ENUM } from './StackConstants';

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
};
