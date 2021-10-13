import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TestScreen2 } from '@screens';
import { useSelector, keySelector, useDispatch, actions } from '@context';

const TestScreen1 = ({ navigation }) => {
    const dispatch = useDispatch();
    const testVariable = useSelector(keySelector.testVariable);

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <TouchableOpacity
                onPress={() => {
                    navigation.push('TestScreen2');
                }}
            >
                <Text>Go to screen 2</Text>
            </TouchableOpacity>
            <Text>{testVariable}</Text>
            <TouchableOpacity
                onPress={() => {
                    actions.setTestVariable({ dispatch, payload: testVariable + 1 });
                }}
            >
                <Text>inc test variable</Text>
            </TouchableOpacity>
        </View>
    );
};

export default TestScreen1;
