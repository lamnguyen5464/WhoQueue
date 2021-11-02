import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

const DURATION = 300;

const useFindQueueScreen = props => {
    const { requestClose = () => null } = props;
    const animatedRef = useRef(new Animated.Value(0));

    useEffect(() => {
        _show();

        // setTimeout(() => {
        //     _hide();
        // }, 2000);

        return () => {
            _hide();
        };
    }, []);

    const _show = () => {
        Animated.timing(animatedRef.current, {
            toValue: 1,
            duration: DURATION,
            useNativeDriver: true,
        }).start();
    };

    const _hide = () => {
        Animated.timing(animatedRef.current, {
            toValue: 0,
            duration: DURATION,
            useNativeDriver: true,
        }).start(() => {
            requestClose?.();
        });
    };

    return {
        animatedValue: animatedRef.current,
        onPressClose: _hide,
    };
};

export default useFindQueueScreen;
