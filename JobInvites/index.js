import React, {useState, useRef} from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  Text,
  RefreshControl,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './style';
import {
  jobinviteRequest,
  nextjobinviteRequest,
  refreshjobinviteRequest,
  updatepage,
  rejectinviteRequest,
  acceptRequest,
} from './actions';
import {connect} from 'react-redux';
import Toast from 'react-native-easy-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import {useFocusEffect} from '@react-navigation/native';
import {
  LoadingFooter,
  AlertSheet,
  RightHeader,
  customStyles,
  Internetcomponent,
} from '../../utils/helpers';
import moment from 'moment';
import Modal from 'react-native-modal';
import Iconn from 'react-native-vector-icons/AntDesign';
import * as yup from 'yup';
import * as RootNavigation from '../../../RootNavigation';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import {jobscountRequest} from '../Home/actions';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import StepIndicator from 'react-native-step-indicator';
const labels = ['Cart', 'Delivery Address'];
const JobInviteScreen = props => {
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: props => (
        <RightHeader
          onsearchPress={() => RootNavigation.navigate('InviteSearch')}
          onPress={() => RootNavigation.navigate('Home', {screen: 'Home'})}
        />
      ),
    });
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      props.updatepage(0);
      setData([]);
      readData();
      return () => {};
    }, []),
  );

  const toastRef = useRef();

  const [token, settoken] = useState(null);
  const [Data, setData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [id, setid] = useState(null);
  const [Visible, setVisible] = useState(false);
  const [fieldsBlur, setFieldsBlur] = React.useState({
    bidprice: '',
    message: '',
  });
  const toggleModal = id => {
    setModalVisible(!isModalVisible);
    setid(id);
  };
  const closeModal = () => {
    setModalVisible(!isModalVisible);
  };
  const readData = async () => {
    try {
      const tok = await AsyncStorage.getItem('Token');
      if (tok !== '') {
        settoken(tok);
        props.jobinviteRequest(tok, jobsSuccess);
        props.jobscountRequest(tok);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const jobsSuccess = data => {
    props.jobscountRequest(token);
    props.updatepage(2);
    setData(data);
  };

  const onEnd = () => {
    const {pageno, footer, nextjobinviteRequest} = props;
    if (pageno !== 0 && footer === false) {
      nextjobinviteRequest(token, nextjobsSuccess, props.pageno);
    }
  };
  const nextjobsSuccess = data => {
    if (data.length > 0) {
      props.updatepage(props.pageno + 1);
      setData([...Data, ...data]);
    } else {
      props.updatepage(0);
    }
  };
  const renderFooter = () => {
    const {footer} = props;
    return footer ? <LoadingFooter /> : null;
  };

  const onRefresh = () => {
    props.refreshjobinviteRequest(token, refreshSuccess);
  };
  const refreshSuccess = data => {
    props.updatepage(2);
    setData(data);
  };

  const listItem = item => {
    const data = [
      {
        label: '',
        status: item.job.pickup_location,
        dateTime: moment(item.job.pickup_date).format('DD MMM YYYY hh:mm A'),
      },
      {
        label: '',
        status: item.job.delivery_location,
        dateTime: moment(item.job.delivery_date).format('DD MMM YYYY hh:mm A'),
      },
    ];

    if (item.id == 'emptyItem') {
      return (
        <View
          style={{...styles.itemContainer, borderWidth: 0, height: 100}}></View>
      );
    }

    return (
      <TouchableWithoutFeedback
        onPress={() =>
          props.navigation.navigate('JobDetails', {
            id: item.job_id,
            screen: 'reject',
            nav: 'Job Invites',
          })
        }>
        <View style={styles.itemContainer}>
          <View style={styles.itemHeaderContainer}>
            {item.job.distance !== null ? (
              <Text style={styles.itemHeaderTextStyle} numberOfLines={1}>
                {`${item.job.distance} km`}
              </Text>
            ) : null}
          </View>
          <View
            style={styles.sub}>
            <View style={styles.subb}>
              <View style={styles.subtop}>
                <StepIndicator
                  customStyles={customStyles}
                  currentPosition={3}
                  labels={labels}
                  direction="vertical"
                  stepCount={2}
                  renderLabel={({
                    position,
                  }) => {
                    return (
                      <View style={styles.labelContainer}>
                        <Text style={styles.labelText} numberOfLines={1}>
                          {data[position].label}
                        </Text>
                        <Text
                          style={[styles.status, {marginTop: 5}]}
                          numberOfLines={1}>
                          {data[position].status}
                        </Text>
                        <Text style={styles.status} numberOfLines={1}>
                          {data[position].dateTime}
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.itemFooterContainer}>
            <View style={styles.itemFooterButtonsContainer}>
              <TouchableOpacity
                onPress={() => toggleModal(item.job.id)}
                style={{marginRight: 10}}>
                <View
                  style={{
                    backgroundColor: '#31AAB7',
                    ...styles.itemFooterButton,
                  }}>
                  <Text style={styles.buttonText}>Accept Now</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => rejectReq(item)}>
                <View
                  style={{
                    backgroundColor: '#959595',
                    ...styles.itemFooterButton,
                  }}>
                  <Text style={styles.buttonText}>Reject Now</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const rejectReq = item => {
    setid(item.job.id);
    setVisible(true);
  };

  const rejectRequested = () => {
    setVisible(false);
    props.rejectinviteRequest(
      token,
      applySuccess,
      id,
      props.jobinviteRequest,
      jobsSuccess,
    );
  };

  const ValidationSchema = yup.object().shape({
    message: yup
      .string()
      .required('Message is required')
      .min(10, 'Message must be atleast 10 characters long'),
    bidprice: yup
      .string()
      .required('Bid price is required')
      .matches(/^\d{0,8}(\.\d{1,4})?$/, 'Bid price can only contain numbers'),
  });

 
  const applySuccess = data => {
    toastRef.current.show(data);
  };

  const onAccept = vid => {
    setModalVisible(!isModalVisible);
    props.acceptRequest(
      token,
      applySuccess,
      id,
      vid,
      props.jobinviteRequest,
      jobsSuccess,
    );
  };
  const gotoAdd = () => {
    closeModal();
    props.navigation.navigate('Vehicles', {
      screen: 'Add Vehicles',
    });
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{flex: 1}}>
        {props.network === false ? <Internetcomponent /> : null}
        <View style={styles.container}>
          {props.invites > 0 ? (
            <View style={styles.headerContainer}>
              <Text style={{...styles.headerTextStyle, color: '#31AAB7'}}>
                {props.invites}{' '}
                {`${props.invites > 1 ? 'Jobs' : 'Job'} Invitation`}
              </Text>
            </View>
          ) : null}
          <SafeAreaView style={{marginTop: 15}}>
            {Data.length > 0 ? (
              <FlatList
                renderItem={({item}) => listItem(item)}
                data={Data}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                style={{marginBottom: 30}}
                bounces={false}
                onEndReached={onEnd}
                onEndReachedThreshold={0.1}
                ListFooterComponent={renderFooter}
                refreshControl={
                  <RefreshControl
                    refreshing={props.refreshing}
                    onRefresh={onRefresh}
                  />
                }
              />
            ) : (
              <Text style={styles.no}>No Job Invites</Text>
            )}
          </SafeAreaView>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0)', '#FFFFFF']}
            style={styles.bottomGradient}></LinearGradient>
          <Modal
            isVisible={isModalVisible}
            animationIn="slideInLeft"
            animationOut="slideOutRight">
            <View
              style={styles.vehCont}>
              <Text style={styles.vehtype}>Select Vehicle</Text>
              {props.MyVehicles.length > 0 ? (
                <KeyboardAwareScrollView>
                  <View style={styles.gridContainer}>
                    {props.MyVehicles.map(grid => (
                      <TouchableOpacity
                        key={grid.id}
                        onPress={() => onAccept(grid.id)}
                        style={styles.gridButtonContainer}>
                        <View
                          style={[
                            styles.gridButton,
                            {
                              backgroundColor: '#31aab7',
                            },
                          ]}>
                          <FAIcon name="truck" style={styles.gridIcon} />
                        </View>
                        <Text style={styles.gridLabel} numberOfLines={1}>
                          {grid.length !== null
                            ? `${grid.name} - ${grid.length}`
                            : `${grid.name}`}
                        </Text>
                        <Text
                          style={[
                            styles.gridLabel,
                            {paddingTop: 0, color: '#ed4b62'},
                          ]}
                          numberOfLines={1}>
                          {`${grid.vehicle_number}`}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </KeyboardAwareScrollView>
              ) : (
                <View>
                  <Text
                    style={[styles.vehtype, {color: 'ed4b62', fontSize: 14}]}>
                    No Vehicle Found
                  </Text>
                  <TouchableOpacity onPress={() => gotoAdd()}>
                    <View
                      style={styles.gta}>
                      <Text style={[styles.buttonsText, {fontSize: 15}]}>
                        Add Vehicle
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              <TouchableOpacity
                onPress={() => closeModal()}
                style={styles.cmod}>
                <Iconn
                  name="closecircle"
                  size={20}
                  color="#787777"
                  solid
                />
              </TouchableOpacity>
            </View>
          </Modal>
          <AlertSheet
            isVisible={Visible}
            onnopress={() => setVisible(false)}
            onyespress={() => rejectRequested()}
            title="Are you sure to reject this invite ?"
          />
          <Spinner visible={props.loading || props.load || props.loadd} />
          <Toast
            ref={toastRef}
            position="bottom"
            fadeInDuration={750}
            fadeOutDuration={2000}
            opacity={0.8}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const mapStateToProps = state => {
  return {
    error: state.JobInviteReducer.error,
    loading: state.JobInviteReducer.loading,
    pageno: state.JobInviteReducer.pageno,
    footer: state.JobInviteReducer.footer,
    refreshing: state.JobInviteReducer.refreshing,
    loadd: state.JobDetailReducer.loading,
    load: state.HomeReducer.loading,
    MyVehicles: state.HomeReducer.MyVehicles,
    invites: state.HomeReducer.invites,
    network: state.network.isConnected,
  };
};
const mapDispatchToProps = dispatch => ({
  jobinviteRequest: (token, success) =>
    dispatch(jobinviteRequest(token, success)),
  nextjobinviteRequest: (token, success, pageno) =>
    dispatch(nextjobinviteRequest(token, success, pageno)),
  refreshjobinviteRequest: (token, success) =>
    dispatch(refreshjobinviteRequest(token, success)),
  updatepage: pageno => dispatch(updatepage(pageno)),
  applyRequest: (token, id, successTwo, bidprice, msg) =>
    dispatch(applyRequest(token, id, successTwo, bidprice, msg)),
  rejectinviteRequest: (token, success, id, successOne, successTwo) =>
    dispatch(rejectinviteRequest(token, success, id, successOne, successTwo)),
  acceptRequest: (token, success, id, vid, successOne, successTwo) =>
    dispatch(acceptRequest(token, success, id, vid, successOne, successTwo)),
  jobscountRequest: token => dispatch(jobscountRequest(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(JobInviteScreen);
