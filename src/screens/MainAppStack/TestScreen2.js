import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector, keySelector, useDispatch, actions } from '@context';

const TestScreen2 = ({ navigation }) => {
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
            <TouchableOpacity onPress={() => {}}></TouchableOpacity>
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

export default TestScreen2;
