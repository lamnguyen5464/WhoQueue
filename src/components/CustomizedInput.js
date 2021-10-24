import React, { memo, useState, forwardRef, useImperativeHandle, useLayoutEffect } from 'react';
import { TextInput, StyleSheet, View, Platform } from 'react-native';
import { DefaultSize, TextSize } from '@utils/Constants';
import Colors from '@utils/Colors';
import { Icon } from 'react-native-elements';

const CustomizedInput = forwardRef((props, ref) => {
    const {
        icon = '',
        tintIconColor = Colors.black_10,
        placeholder = '',
        containerStyle = {},
        isPassword = false,
        onChangeValue,
        autoCapitalize = 'none',
    } = props;

    const [value, setValue] = useState('');

    useLayoutEffect(() => {
        onChangeValue?.(value);
    }, [value]);

    const getValue = () => {
        return value;
    };

    useImperativeHandle(ref, () => ({
        getValue,
    }));

    return (
        <View style={[styles.container, containerStyle]}>
            <Icon name={icon} type="ionicon" color={tintIconColor} style={styles.icon} />
            <TextInput
                editable
                value={value}
                numberOfLines={1}
                autoCorrect={false}
                autoCapitalize={autoCapitalize}
                placeholder={placeholder}
                secureTextEntry={isPassword}
                style={styles.container_input}
                onChangeText={text => setValue(text)}
                placeholderTextColor={Colors.black_10}
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
        paddingHorizontal: DefaultSize.M,
    },
    icon: {},
    container_input: {
        flex: 1,
        marginLeft: DefaultSize.M,
        fontWeight: 'bold',
        fontSize: TextSize.Title,
        color: Colors.black_15,
        paddingVertical: Platform.OS === 'ios' ? DefaultSize.M : DefaultSize.S,
    },
});

export default memo(CustomizedInput);
