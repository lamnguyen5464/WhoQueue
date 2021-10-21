import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { DefaultSize, TextSize } from '@utils/Constants';
import Colors from '@utils/Colors';
import { Icon } from 'react-native-elements';

const CustomizedInput = forwardRef((props, ref) => {
    const { tintIconColor = Colors.black_10, placeholder = 'Email' } = props;

    const [value, setValue] = useState('');

    const getValue = () => {
        return value;
    };

    useImperativeHandle(ref, () => ({
        getValue,
    }));

    return (
        <View style={styles.container}>
            <Icon name="mail" type="ionicon" color={tintIconColor} />
            <TextInput
                value={value}
                numberOfLines={1}
                autoCapitalize={'none'}
                onChangeText={text => setValue(text)}
                editable
                placeholder={placeholder}
                style={styles.container_input}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: DefaultSize.S,
        backgroundColor: Colors.black_03,
        paddingVertical: DefaultSize.S,
        paddingHorizontal: DefaultSize.M,
    },
    container_input: {
        flex: 1,
        marginLeft: DefaultSize.M,
        fontWeight: 'bold',
        fontSize: TextSize.Title,
        color: Colors.black_15,
    },
});

export default CustomizedInput;
