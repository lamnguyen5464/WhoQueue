import React, { useLayoutEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, Animated, Image, TouchableOpacity, View } from 'react-native';
import { DefaultSize } from '@utils/Constants';
import Colors from '@utils/Colors';
import { useHeaderHeight } from '@react-navigation/stack';
import ShareStyles from '@utils/SharedStyles';
import assets from '@assets';
import { CustomizedText } from '@components';

const AnimatedHeader = forwardRef((props, ref) => {
    const { navigation, title = '' } = props;
    const headerHeight = useRef(useHeaderHeight()).current;
    const opacityAnimated = useRef(new Animated.Value(0)).current;

    useLayoutEffect(() => {
        navigation?.setOptions?.({
            headerShown: false,
        });
    }, []);

    const setOpacity = value => {
        opacityAnimated.setValue(value);
    };

    const onPressBack = () => {
        navigation?.canGoBack() && navigation?.goBack();
    };

    useImperativeHandle(ref, () => ({
        setOpacity,
    }));

    const _renderIconLeft = () => (
        <TouchableOpacity onPress={onPressBack}>
            <Image source={assets.ic_back} style={styles.ic_left} />
        </TouchableOpacity>
    );

    const _renderIconRight = () => (
        <TouchableOpacity onPress={onPressBack}>
            <Image source={null} style={styles.ic_right} />
        </TouchableOpacity>
    );

    const _renderTitle = () => <CustomizedText type="title">{title}</CustomizedText>;

    return (
        <>
            <View style={[styles.transparent_container, { height: headerHeight || 0 }]}>
                {_renderIconLeft()}
                {_renderIconRight()}
            </View>
            <Animated.View
                style={[styles.container, { height: headerHeight || 0, opacity: opacityAnimated }]}
            >
                {_renderIconLeft()}
                {_renderTitle()}
                {_renderIconRight()}
            </Animated.View>
        </>
    );
});

const styles = StyleSheet.create({
    container: {
        ...ShareStyles.shadow,
        position: 'absolute',
        width: '100%',
        backgroundColor: Colors.white,
        zIndex: 10,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        borderBottomLeftRadius: DefaultSize.XS,
        borderBottomRightRadius: DefaultSize.XS,
        paddingBottom: DefaultSize.M,
    },
    transparent_container: {
        width: '100%',
        position: 'absolute',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        zIndex: 9,
        paddingBottom: DefaultSize.M,
    },
    ic_left: {
        width: DefaultSize.L,
        height: DefaultSize.L,
        marginLeft: DefaultSize.XL,
    },
    ic_right: {
        width: DefaultSize.L,
        height: DefaultSize.L,
        marginRight: DefaultSize.XL,
    },
});

export default AnimatedHeader;
