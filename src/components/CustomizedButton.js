import React from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { DefaultSize } from '@utils/Constants';
import Colors from '@utils/Colors';
import CustomizedContainer from './CustomizedContainer';
import CustomizedText from './CustomizedText';

const CustomizedButton = ({
    type = 'primary',
    containerStyle = {},
    componentStyle = {},
    children,
    onPress = null,
    loading = false,
}) => {
    const appliedComponentType = componentStyles[type] || {};

    const loadingContent = () => <ActivityIndicator />;

    const mainContent = () => (
        <CustomizedContainer type={type} containerStyle={[appliedComponentType, componentStyle]}>
            {typeof children === 'string' ? (
                <CustomizedText type={type}>{children}</CustomizedText>
            ) : (
                children
            )}
        </CustomizedContainer>
    );

    return (
        <TouchableOpacity
            style={[containerStyle, containerSyle.default]}
            onPress={onPress}
            activeOpacity={0.9}
            disabled={!onPress}
        >
            {loading ? loadingContent() : mainContent()}
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
