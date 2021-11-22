import React, {useState, useRef, useLayoutEffect} from 'react';
import * as yup from 'yup';
import {Text, View, TouchableOpacity} from 'react-native';
import {Formik, Field} from 'formik';
import {WithoutAuthLayout} from '_molecules';
import CustomInput from '../../components/atoms/custominput';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './style';
import {updatepasswordRequest} from './actions';
import {connect} from 'react-redux';
import Toast from 'react-native-easy-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import {useFocusEffect} from '@react-navigation/native';
import {jobscountRequest} from '../Home/actions';
import {Internetcomponent} from '../../utils/helpers';
const changePasswordValidationSchema = yup.object().shape({
  oldpass: yup
    .string()
    .required('Old Password is required')
    .min(6, 'Old Password must be atleast 6 characters long'),
  pass: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be atleast 6 characters long'),
  confirmpass: yup
    .string()
    .required('confirm password is required')
    .min(6, 'confirm password must be atleast 6 characters long')
    .oneOf([yup.ref('pass'), null], 'Passwords must match'),
});

const ChangePasswordScreen = props => {
  useLayoutEffect(() => {
    props.navigation.setOptions(<screenOptions />);
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      readData();
      return () => {};
    }, []),
  );

  const toastRef = useRef();
  const formikRef = useRef();
  const [token, settoken] = useState(null);

  const readData = async () => {
    try {
      formikRef.current?.resetForm();
      const tok = await AsyncStorage.getItem('Token');
      if (tok !== '') {
        props.jobscountRequest(tok);
        settoken(tok);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const jobsSuccess = data => {
    toastRef.current.show(data);
    setTimeout(() => props.navigation.goBack(), 1000);
  };
  const [fieldsBlur, setFieldsBlur] = React.useState({
    pass: false,
    confirmpass: false,
    oldpass: false,
  });

  const submitHandler = values => {
    props.updatepasswordRequest(
      token,
      values.oldpass,
      values.pass,
      jobsSuccess,
    );
  };


  return (
    <View style={styles.main}>
      {props.network === false ? <Internetcomponent /> : null}
      <WithoutAuthLayout
        mainHeading="Change password"
        subHeading="set your new password">
        <View style={styles.mainWrapper}>
          <Formik
            validationSchema={changePasswordValidationSchema}
            innerRef={formikRef}
            initialValues={{pass: '', confirmpass: '', oldpass: ''}}
            onSubmit={submitHandler}>
            {({
              handleSubmit,
              isValid,
            }) => (
              <>
                <Field
                  component={CustomInput}
                  name="oldpass"
                  placeholder="old password"
                  placeholderStyle={styles.textInputPlaceHolderStyle}
                  secureTextEntry={true}
                />
                <Field
                  component={CustomInput}
                  name="pass"
                  placeholder="password"
                  placeholderStyle={styles.textInputPlaceHolderStyle}
                  secureTextEntry={true}
                />

                <Field
                  component={CustomInput}
                  name="confirmpass"
                  placeholder="confirm password"
                  placeholderStyle={styles.textInputPlaceHolderStyle}
                  secureTextEntry={true}
                />
                <TouchableOpacity
                  onPress={
                    isValid
                      ? handleSubmit
                      : () => {
                          setFieldsBlur({
                            pass: true,
                            confirmpass: true,
                          });
                        }
                  }
                  style={{
                    ...styles.textWrapper,
                    backgroundColor: '#31AAB7',
                    borderWidth: 0,
                  }}>
                  <Text style={{color: '#FFFFFF'}}>Change Password</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
          <Spinner visible={props.loading} />
        </View>
      </WithoutAuthLayout>
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
    error: state.ChangePasswordReducer.error,
    loading: state.ChangePasswordReducer.loading,
    network: state.network.isConnected,
  };
};
const mapDispatchToProps = dispatch => ({
  updatepasswordRequest: (token, oldpass, newpass, success) =>
    dispatch(updatepasswordRequest(token, oldpass, newpass, success)),
  jobscountRequest: token => dispatch(jobscountRequest(token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePasswordScreen);
