import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector, keySelector, useDispatch, actions } from '@context';
import axios from 'axios';
import Http from '@core/http';
import SingletonPromise from '@utils/SingletonPromise';
import AppNavigator from '@core/navigation/AppNavigator';
import useLocalization from '@core/localization';

const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const testVariable = useSelector(keySelector.testVariable);

    const { LOCALIZATION_ENUMS, LOCALIZED_CONTENT, setLocalization } = useLocalization();

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
                <Text>{LOCALIZED_CONTENT.test}</Text>
            </TouchableOpacity>
            <Text>{testVariable}</Text>
            <TouchableOpacity
                onPress={() => {
                    setLocalization(
                        LOCALIZED_CONTENT.test === 'Tieng Anh'
                            ? LOCALIZATION_ENUMS.vi
                            : LOCALIZATION_ENUMS.en
                    );
                }}
            >
                <Text>Change localize</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;
