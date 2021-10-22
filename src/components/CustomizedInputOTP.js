import React, { useState, forwardRef, useImperativeHandle, useEffect, memo, useRef } from 'react';
import { TextInput, StyleSheet, View, Platform, Text } from 'react-native';
import { DefaultSize, TextSize } from '@utils/Constants';
import Colors from '@utils/Colors';

const EMPTY_VALUE = '-';

const CustomizedInputOTP = forwardRef((props, ref) => {
    const {
        containerStyle = {},
        maxLength = 6,
        keyboardType = 'number-pad',
        onDone,
        onChangeValue,
    } = props;

    const refInput = useRef(null);

    const [value, setValue] = useState('');

    useEffect(() => {
        if (value.length === maxLength) {
            onDone?.();
        }
        onChangeValue?.(value);
    }, [value]);

    const getValue = () => {
        return value;
    };

    const reset = () => {
        setValue('');
    };

    const focus = () => {
        refInput.current?.focus();
    };

    useImperativeHandle(ref, () => ({
        getValue,
        focus,
        reset,
    }));

    const _renderCells = () => {
        const currentValue = value.split('');
        const currentLength = Math.min(maxLength - 1, currentValue.length);
        const parsedValue = [...currentValue, ...new Array(maxLength - currentValue.length)];

        return parsedValue.map((item, index) => {
            return (
                <OTPCell
                    key={`otp_cel_${index}_${item}_${index === currentLength}`}
                    isCurrentPosition={index === currentLength}
                    value={item ?? EMPTY_VALUE}
                />
            );
        });
    };

    const _renderOverlay = () => (
        <TextInput
            editable
            value={value}
            ref={refInput}
            numberOfLines={1}
            caretHidden={true}
            autoCorrect={false}
            maxLength={maxLength}
            autoCapitalize={'none'}
            keyboardType={keyboardType}
            style={styles.container_input}
            onChangeText={text => setValue(text)}
            placeholderTextColor={Colors.black_10}
        />
    );

    return (
        <View style={[styles.container, containerStyle]}>
            {_renderCells()}
            {_renderOverlay()}
        </View>
    );
});

const OTPCell = memo(({ value = '', isCurrentPosition = false }) => {
    return (
        <View style={[styles.container_cell, isCurrentPosition ? styles.focus_cell : {}]}>
            <Text
                style={[styles.text_otp, value === EMPTY_VALUE ? { color: Colors.black_10 } : {}]}
            >
                {value}
            </Text>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'transparent',
    },
    container_cell: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.black_03,
        padding: DefaultSize.L,
        borderRadius: DefaultSize.S,
    },
    focus_cell: {
        borderWidth: DefaultSize.XXS / 2,
        borderColor: Colors.black_10,
    },
    text_otp: {
        fontWeight: 'bold',
        fontSize: TextSize.Title,
        color: Colors.black_15,
    },
    container_input: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        color: 'transparent',
    },
});

export default memo(CustomizedInputOTP);
