import React, { useRef, useEffect, memo } from 'react';
import { Easing, Animated } from 'react-native';

const DURATION = 700;

const OFFSET = -100;

const AnimatedFadeDown = ({ children, style = {} }) => {
    const anmiatedValue = useRef(new Animated.Value(0));

    useEffect(() => {
        Animated.spring(anmiatedValue.current, {
            toValue: 1,
            duration: DURATION,
            useNativeDriver: true,
            friction: 5,
        }).start();
    }, []);

    const transform = [
        {
            translateY: anmiatedValue.current.interpolate({
                inputRange: [0, 1],
                outputRange: [OFFSET, 0],
            }),
        },
    ];

    return (
        <Animated.View opacity={anmiatedValue.current} style={[style, { transform }]}>
            {children}
        </Animated.View>
    );
};

export default memo(AnimatedFadeDown);
