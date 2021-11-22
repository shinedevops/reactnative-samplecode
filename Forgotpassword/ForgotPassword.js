import React, {useRef} from 'react';
import * as yup from 'yup';
import {Text, View, TouchableOpacity} from 'react-native';
import {Formik, Field} from 'formik';
import {WithoutAuthLayout} from '_molecules';
import CustomInput from '../../components/atoms/custominput';
import styles from './style';
import Toast from 'react-native-easy-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import {forgotRequest} from './actions';
import {connect} from 'react-redux';
import {Internetcomponent} from '../../utils/helpers';
const forgotPasswordValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is required'),
});

const ForgotPasswordScreen = props => {
  const [fieldsBlur, setFieldsBlur] = React.useState({email: false});
  const msgRef = useRef();
  const submitHandler = values => {
    props.forgotRequest(values.email, loginSuccess);
  };
  const loginSuccess = (status, data) => {
    if (status === '1') {
      msgRef.current.show(data.message);
    } else if (status === '2') {
      msgRef.current.show(data.message);
    } else {
      msgRef.current.show('Something went wrong !');
    }
  };

  return (
    <View style={{flex: 1}}>
      {props.network === false ? <Internetcomponent /> : null}
      <WithoutAuthLayout
        mainHeading="Forgot password"
        subHeading="please enter your email">
        <View style={styles.mainWrapper}>
          <Formik
            validationSchema={forgotPasswordValidationSchema}
            initialValues={{email: ''}}
            onSubmit={submitHandler}>
            {({
              handleSubmit,
              isValid,
            }) => (
              <>
                <Field
                  component={CustomInput}
                  name="email"
                  placeholder="john.example@gmail.com"
                  keyboardType="email-address"
                  placeholderStyle={styles.textInputPlaceHolderStyle}
                />
                <TouchableOpacity
                  onPress={
                    isValid
                      ? handleSubmit
                      : () => {
                          setFieldsBlur({email: true});
                        }
                  }
                  style={{
                    ...styles.textWrapper,
                   ...styles.wrap
                  }}>
                  <Text style={styles.txt}>Reset Password</Text>
                </TouchableOpacity>
                <View style={styles.vv}>
                  <Text style={styles.backto}>Back to</Text>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('Login')}
                    style={styles.log}>
                    <Text style={styles.login}> Login</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
          <Spinner visible={props.loading} />
          <Toast
            ref={msgRef}
            position="center"
            fadeInDuration={750}
            fadeOutDuration={4000}
            opacity={0.8}
          />
        </View>
      </WithoutAuthLayout>
    </View>
  );
};
const mapStateToProps = state => {
  return {
    error: state.ForgotReducer.error,
    loading: state.ForgotReducer.loading,
    network: state.network.isConnected,
  };
};
const mapDispatchToProps = dispatch => ({
  forgotRequest: (email, success) => dispatch(forgotRequest(email, success)),
  clearError: () => dispatch(clearError()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPasswordScreen);
