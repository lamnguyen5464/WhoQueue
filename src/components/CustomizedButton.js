import React from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { DefaultSize } from '@utils/Constants';
import Colors from '@utils/Colors';

const CustomizedButton = ({
    type = 'orange',
    componentStyle = null,
    children,
    onPress = null,
    loading = false,
}) => {
    const appliedType = styles[type] || {};

    return (
        <TouchableOpacity
            style={[appliedType, componentStyle]}
            onPress={onPress}
            activeOpacity={0.9}
            disabled={!onPress}
        >
            {loading ? <ActivityIndicator /> : children}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({});

export default React.memo(CustomizedButton);
