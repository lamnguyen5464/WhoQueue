import React, { useLayoutEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, Animated, Image, TouchableOpacity, View } from 'react-native';
import { DefaultSize } from '@utils/Constants';
import Colors from '@utils/Colors';
import { useHeaderHeight } from '@react-navigation/stack';
import ShareStyles from '@utils/SharedStyles';
import assets from '@assets';
import { CustomizedText } from '@components';
import { Icon } from 'react-native-elements';

const AnimatedHeader = forwardRef((props, ref) => {
    const { navigation, title = '', iconRight = '', onPressHeaderRight = () => null } = props;
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

    const _renderIconLeft = (color = 'black') => (
        <TouchableOpacity onPress={onPressBack} style={styles.ic_left}>
            <Icon name="arrow-back-outline" type="ionicon" color={color} />
        </TouchableOpacity>
    );

    const _renderIconRight = (color = 'black') => (
        <TouchableOpacity onPress={onPressHeaderRight} style={styles.ic_right}>
            <Icon name={iconRight} type="ionicon" color={color} />
        </TouchableOpacity>
    );

    const _renderTitle = () => <CustomizedText type="title">{title}</CustomizedText>;

    return (
        <>
            <View style={[styles.transparent_container, { height: headerHeight || 0 }]}>
                {_renderIconLeft('white')}
                {_renderIconRight('white')}
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
        marginLeft: DefaultSize.XL,
    },
    ic_right: {
        marginRight: DefaultSize.XL,
    },
});

export default AnimatedHeader;
