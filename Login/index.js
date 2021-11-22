import React, {useRef, useState} from 'react';
import * as yup from 'yup';
import {
  Text,
  View,
  TouchableOpacity,
  BackHandler,
  Alert,
  Platform,
} from 'react-native';
import {WithoutAuthLayout} from '_molecules';
import {loginRequest} from './actions';
import {connect} from 'react-redux';
import Toast from 'react-native-easy-toast';
import styles from './style';
import Spinner from 'react-native-loading-spinner-overlay';
import {Formik, Field, Form} from 'formik';
import CustomInput from '../../components/atoms/custominput';
import AsyncStorageUtil from '../../utils/AsyncStorage';
import {useFocusEffect} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import {Internetcomponent} from '../../utils/helpers';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is required'),
  password: yup.string().required('Password is required'),
});

const LoginScreen = props => {
  useFocusEffect(
    React.useCallback(() => {
      const devicetype = Platform.OS === 'android' ? 'android' : 'ios';
      messaging()
        .getToken()
        .then(token => {
          setState({
            ...state,
            devicetoken: token,
            devicetype: devicetype,
          });
          console.log(devicetype);
          console.log(token);
        });
      BackHandler.addEventListener('hardwareBackPress', () =>
        handleBackPress(),
      );
      return () => {};
    }, []),
  );
  const [state, setState] = useState({
    email: '',
    password: '',
    devicetoken: '',
    devicetype: '',
  });
  const handleBackPress = () => {
    if (props.navigation.isFocused()) {
      Alert.alert(
        'Exit App',
        'Do you want to exit?',
        [
          {
            text: 'No',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Yes', onPress: () => BackHandler.exitApp()},
        ],
        {cancelable: false},
      );
      return true;
    } else {
      return false;
    }
  };

  const [fieldsBlur, setFieldsBlur] = React.useState({
    email: false,
    password: false,
  });
  const toastRef = useRef();
  const submitHandler = (values, {resetForm}) => {
    props.loginRequest(
      values.email,
      values.password,
      loginSuccess,
      state.devicetoken,
      state.devicetype,
    );
    resetForm();
  };

  const loginSuccess = (status, data) => {
    if (status === '1') {
      if (data.ongoing_job === '') {
        AsyncStorageUtil.storetoken(data.token);
        props.navigation.navigate('LoggedInHome', {screen: 'Home'});
      } else if (data.ongoing_job !== '') {
        AsyncStorageUtil.storejobstatus('Started', String(data.ongoing_job));
        AsyncStorageUtil.storetoken(data.token);
        props.navigation.navigate('LoggedInHome', {screen: 'Home'});
      }
    } else if (status === '2') {
      toastRef.current.show(data.message);
    } else {
      toastRef.current.show(data);
    }
  };

 

  const onforgotPress = resetForm => {
    props.navigation.navigate('ForgotPassword');
    resetForm();
  };
  const onregisterPress = resetForm => {
    props.navigation.navigate('Register');
    resetForm();
  };

  return (
    <View style={styles.flexx}>
      {props.network === false ? <Internetcomponent /> : null}
      <WithoutAuthLayout
        mainHeading="Welcome to Fleet"
        subHeading="Sign in to continue">
        <View style={styles.mainWrapper}>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{email: state.email, password: state.password}}
            onSubmit={submitHandler}>
            {({
              handleSubmit,
              values,
              isValid,
              resetForm,
            }) => (
              <>
                <Field
                  component={CustomInput}
                  name="email"
                  placeholder="john.example@gmail.com"
                  keyboardType="email-address"
                  placeholderStyle={styles.textInputPlaceHolderStyle}
                />

                <Field
                  component={CustomInput}
                  name="password"
                  placeholder="●●●●●●●●●●●●●●"
                  secureTextEntry={true}
                  placeholderStyle={styles.textInputPlaceHolderStyle}
                />

                <TouchableOpacity
                  onPress={
                    isValid
                      ? handleSubmit
                      : () => {
                          console.log(values);
                        }
                  }
                  style={{
                    ...styles.textWrapper,
                    ...styles.wrap
                  }}>
                  <Text style={styles.txt}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onforgotPress(resetForm)}
                  style={styles.for}>
                  <Text style={styles.forgot}>Forgot password</Text>
                </TouchableOpacity>
                <View
                  style={styles.dac}>
                  <Text style={styles.noac}>Don’t have an account!</Text>
                  <TouchableOpacity
                    onPress={() => onregisterPress(resetForm)}
                    style={styles.log}>
                    <Text style={styles.reg}> Register</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
      </WithoutAuthLayout>
      <Spinner visible={props.loading} />
      <Toast
        ref={toastRef}
        position="bottom"
        fadeInDuration={750}
        fadeOutDuration={2000}
        opacity={0.8}
      />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    error: state.LoginReducer.error,
    loading: state.LoginReducer.loading,
    network: state.network.isConnected,
  };
};
const mapDispatchToProps = dispatch => ({
  loginRequest: (email, password, success, devicetoken, devicetype) =>
    dispatch(loginRequest(email, password, success, devicetoken, devicetype)),
  clearError: () => dispatch(clearError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
