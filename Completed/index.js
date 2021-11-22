import React, {useState, useRef} from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  Text,
  RefreshControl,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {newList} from '_molecules';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './style';
import {
  jobcompleteRequest,
  nextjobcompleteRequest,
  refreshjobcompleteRequest,
  updatepage,
} from './actions';
import {connect} from 'react-redux';
import Toast from 'react-native-easy-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import {useFocusEffect} from '@react-navigation/native';
import {
  LoadingFooter,
  RightHeader,
  Internetcomponent,
} from '../../utils/helpers';
import * as RootNavigation from '../../../RootNavigation';
import {jobscountRequest} from '../Home/actions';
const HomeScreen = props => {
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: props => (
        <RightHeader
          onsearchPress={() => RootNavigation.navigate('CompleteSearch')}
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

  const readData = async () => {
    try {
      const tok = await AsyncStorage.getItem('Token');
      if (tok !== '') {
        settoken(tok);
        props.jobcompleteRequest(tok, jobsSuccess);
        props.jobscountRequest(tok);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const jobsSuccess = data => {
    props.updatepage(2);
    setData(data);
  };

  const onEnd = () => {
    const {pageno, footer, nextjobcompleteRequest} = props;
    if (pageno !== 0 && footer === false) {
      nextjobcompleteRequest(token, nextjobsSuccess, props.pageno);
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
    props.refreshjobcompleteRequest(token, refreshSuccess);
  };

  const refreshSuccess = data => {
    props.updatepage(2);
    setData(data);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{flex: 1}}>
        {props.network === false ? <Internetcomponent /> : null}
        <View style={styles.container}>
          {props.completedjobs > 0 ? (
            <View style={styles.headerContainer}>
              <Text style={{...styles.headerTextStyle, color: '#31AAB7'}}>
                {props.completedjobs > 1
                  ? `${props.completedjobs} Jobs Completed`
                  : `${props.completedjobs} Job Completed`}
              </Text>
            </View>
          ) : null}
          <SafeAreaView style={{marginTop: 15}}>
            {Data.length > 0 ? (
              <FlatList
                renderItem={({item}) =>
                  newList(item, props.navigation, '', '', '', 'completed')
                }
                data={Data}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                style={{marginBottom: 30}}
                bounces={false}
                onEndReached={onEnd}
                onEndReachedThreshold={1}
                ListFooterComponent={renderFooter}
                refreshControl={
                  <RefreshControl
                    refreshing={props.refreshing}
                    onRefresh={onRefresh}
                  />
                }
              />
            ) : (
              <Text style={styles.no}>No Completed Jobs</Text>
            )}
          </SafeAreaView>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0)', '#FFFFFF']}
            style={styles.bottomGradient}></LinearGradient>
          <Spinner visible={props.loading} />
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
    error: state.CompletedReducer.error,
    loading: state.CompletedReducer.loading,
    pageno: state.CompletedReducer.pageno,
    footer: state.CompletedReducer.footer,
    refreshing: state.CompletedReducer.refreshing,
    completedjobs: state.HomeReducer.completedjobs,
    network: state.network.isConnected,
  };
};
const mapDispatchToProps = dispatch => ({
  jobcompleteRequest: (token, success) =>
    dispatch(jobcompleteRequest(token, success)),
  nextjobcompleteRequest: (token, success, pageno) =>
    dispatch(nextjobcompleteRequest(token, success, pageno)),
  refreshjobcompleteRequest: (token, success) =>
    dispatch(refreshjobcompleteRequest(token, success)),
  updatepage: pageno => dispatch(updatepage(pageno)),
  jobscountRequest: token => dispatch(jobscountRequest(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
