import { Alert } from 'react-native';
import NavigationService from '../../NavigationService.js';

const ErrorAlert = (msg) => { 
      Alert.alert(
  'Something went wrong',
  msg ? msg : 'Please make sure you are logged in properly. If this keeps happening, refer to the IT team',
  // [
  //   {text: 'OK', onPress: () => NavigationService.navigate('Home')},
  // ],
  // { cancelable: false }
)};

export default ErrorAlert;