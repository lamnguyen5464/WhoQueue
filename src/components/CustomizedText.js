import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { TextSize } from '@utils/Constants';
import Colors from '@utils/Colors';

const CustomizedText = ({ type = null, textStyle = {}, children, size = null }) => {
    size = typeof size === 'number' ? size : TextSize[size];

    const appliedType = styles[type] || {};
    const appliedSize = !size ? {} : { fontSize: size };

    return <Text style={[appliedType, appliedSize, textStyle]}>{children}</Text>;
};

const styles = StyleSheet.create({
    header: {
        fontSize: TextSize.H1,
        color: Colors.black,
        fontWeight: 'bold',
    },
    content_header: {
        fontSize: TextSize.H4,
        color: Colors.black_12,
        fontWeight: 'bold',
    },
    title: {
        fontSize: TextSize.H3,
        color: Colors.white,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: TextSize.Title,
        color: Colors.white,
    },
    title_dark: {
        fontSize: TextSize.H3,
        color: Colors.black_15,
        fontWeight: 'bold',
    },
    subtitle_dark: {
        fontSize: TextSize.Title,
        color: Colors.black_15,
    },
    primary: {
        fontSize: TextSize.H4,
        color: Colors.white,
        fontWeight: 'bold',
    },
    secondary: {
        fontSize: TextSize.H4,
        color: Colors.primary_1,
        fontWeight: 'bold',
    },
    error: {
        fontSize: TextSize.SubTitle,
        color: Colors.error,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
    },
    simple: {
        fontSize: TextSize.Title,
        color: Colors.black,
        fontWeight: 'bold',
    },
    light_content: {
        fontSize: TextSize.Title,
        color: Colors.black_12,
    },
});

export default React.memo(CustomizedText);
