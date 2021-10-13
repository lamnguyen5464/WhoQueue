import { Dimensions, Platform } from 'react-native';

export default {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    isIphoneX: () => {
        const dimen = Dimensions.get('window');
        return (
            Platform.OS === 'ios' &&
            !Platform.isPad &&
            !Platform.isTVOS &&
            (dimen.height === 812 ||
                dimen.width === 812 ||
                dimen.height === 896 ||
                dimen.width === 896)
        );
    },
};
