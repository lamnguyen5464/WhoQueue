import { View, Platform, requireNativeComponent } from 'react-native';

const QRCodeView = Platform.OS === 'android' ? requireNativeComponent('QRCodeView') : View;

export default QRCodeView;
