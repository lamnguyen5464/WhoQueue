import React from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { DefaultSize } from '@utils/Constants';
import CustomizedContainer from './CustomizedContainer';
import CustomizedText from './CustomizedText';
import debounce from 'lodash/debounce';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const CustomizedButton = ({
    type = 'primary',
    containerStyle = {},
    componentStyle = {},
    children,
    onPress = null,
    loading = false,
}) => {
    const appliedComponentType = componentStyles[type] || {};

    const loadingContent = () => <ActivityIndicator color={componentStyle.color || Colors.white} />;

    const mainContent = () =>
        typeof children === 'string' ? (
            <CustomizedText type={type}>{children}</CustomizedText>
        ) : (
            children
        );

    return (
        <TouchableOpacity
            style={[containerStyle, containerSyle.default]}
            onPress={debounce(onPress, 300, { leading: true, trailing: false })}
            activeOpacity={0.9}
            disabled={!onPress || loading}
        >
            <CustomizedContainer
                type={type}
                containerStyle={[appliedComponentType, componentStyle]}
            >
                {loading ? loadingContent() : mainContent()}
            </CustomizedContainer>
        </TouchableOpacity>
    );
};

const containerSyle = StyleSheet.create({
    default: {
        width: '100%',
    },
});

const componentStyles = StyleSheet.create({
    primary: {
        paddingVertical: DefaultSize.M,
        borderRadius: DefaultSize.S,
    },
    secondary: {
        paddingVertical: DefaultSize.M,
        borderRadius: DefaultSize.S,
    },
});

export default React.memo(CustomizedButton);
