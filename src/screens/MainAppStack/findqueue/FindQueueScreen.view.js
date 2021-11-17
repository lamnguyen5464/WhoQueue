import React, { useRef } from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Animated,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import useFindQueueScreen from './useFindQueueScreen';
import { CustomizedText, CustomizedContainer } from '@components';
import { DefaultSize } from '@utils/Constants';
import CustomizedInput from '@components/CustomizedInput';

const FindQueueScreen = props => {
    const { animatedValue, onPressClose, inputSearchRef, headerHeight } = useFindQueueScreen(props);

    const { posYTabSearch } = props;
    console.log(posYTabSearch);

    const inputTransformation = {
        transform: [
            {
                translateY: animatedValue?.interpolate({
                    inputRange: [0, 1],
                    outputRange: [posYTabSearch || 0, 0],
                }),
            },
        ],
    };

    const opacityValue = animatedValue?.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 0.75, 1],
    });

    const _renderInputHeader = () => (
        <View style={styles.header(headerHeight)}>
            <View style={styles.container_input}>
                <CustomizedInput
                    ref={inputSearchRef}
                    icon={'search'}
                    containerStyle={styles.search_bar}
                    onFocus={() => {}}
                    placeholder={'Search your queue here'}
                />
                <TouchableOpacity activeOpacity={0.8} onPress={onPressClose}>
                    <CustomizedText type={'simple'}>Close</CustomizedText>
                </TouchableOpacity>
            </View>
        </View>
    );

    const _renderResultView = () => (
        <Animated.View style={[styles.result_view]}>
            <CustomizedText>loading...</CustomizedText>
        </Animated.View>
    );

    return (
        <Animated.View style={[styles.container, inputTransformation]} opacity={opacityValue}>
            {_renderInputHeader()}
            {_renderResultView()}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    result_view: {
        // flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: 'white',
        paddingHorizontal: DefaultSize.XL,
    },
    container_input: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    header: headerHeight => ({
        height: headerHeight,
        justifyContent: 'flex-end',
    }),
    search_bar: {
        width: '85%',
    },
});

export default FindQueueScreen;
