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
    giant: {
        fontWeight: 'bold',
        fontSize: TextSize.H0,
        color: Colors.base_5,
        backgroundColor: Colors.base_3,
    },
    header: {
        fontWeight: 'bold',
        fontSize: TextSize.H3,
    },
    title: {
        fontWeight: 'bold',
        fontSize: TextSize.H4,
        color: Colors.dark,
    },
    item: {
        fontWeight: 'bold',
        fontSize: TextSize.title,
        color: Colors.white,
    },
    place_holder: {
        fontWeight: 'bold',
        fontSize: TextSize.title,
        color: Colors.black_10,
    },
});

export default React.memo(CustomizedText);
