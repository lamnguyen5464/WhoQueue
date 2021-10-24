import React, { memo } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import LottieView from 'lottie-react-native';
import assets from '@assets';
import Colors from '@utils/Colors';

const AnimatedLoading = () => {
    // return <LottieView autoPlay loop source={assets.loading_circle} style={styles.container} />;
    return <ActivityIndicator color={Colors.white} style={'large'} />;
};

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: 100,
    },
});

export default memo(AnimatedLoading);
