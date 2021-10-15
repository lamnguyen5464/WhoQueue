import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector, keySelector, useDispatch, actions } from '@context';
import axios from 'axios';
import Http from '@core/http';
import SingletonPromise from '@utils/SingletonPromise';
import AppNavigator from '@core/navigation/AppNavigator';

const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const testVariable = useSelector(keySelector.testVariable);

    React.useEffect(() => {
        console.log('aehaer');
    }, []);

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
                    // console.log(Object.keys(navigatorRef.current));
                    // console.log(navigatorRef.current.getRootState());
                    // navigatorRef.current?.navigate('MainAppStack');
                    AppNavigator.activateMainApp();
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
                <Text>inc test variable INNN AUTH STACK</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;
