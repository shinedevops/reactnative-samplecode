import React, {useState, useRef} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import Toast from 'react-native-easy-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  ModalSheet,
  UploadSheet,
  smartAlbums,
  Internetcomponent,
} from '../../utils/helpers';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/AntDesign';
import Iconn from 'react-native-vector-icons/FontAwesome5';
import {Item} from '_molecules';
import {ProfiledetailRequest, editimageRequest} from './actions';
import styles from './style';
import {useFocusEffect} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import {LoadingImage} from '../../utils/LoadingImage';
import {jobscountRequest} from '../Home/actions';
const ProfileScreen = props => {
  useFocusEffect(
    React.useCallback(() => {
      setData('');
      readData();
      return () => {};
    }, []),
  );

  const alertRef = useRef();
  const options = useRef();
  const picRef = useRef();
  const [token, settoken] = useState(null);
  const [Data, setData] = useState('');
  const [image, setimage] = useState('');
  const [profile, setprofile] = useState('');
  const readData = async () => {
    try {
      const tok = await AsyncStorage.getItem('Token');
      if (tok !== '') {
        props.jobscountRequest(tok);
        settoken(tok);
        props.ProfiledetailRequest(tok, detailSuccess);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const detailSuccess = (data, status) => {
    console.log(data);
    if (status === '1') {
      setData(data);
      const prof = {
        path: data.user_detail.carrier_photo,
        mime: 'image/jpeg',
        filename: data.user_detail.carrier_photo,
      };
      setprofile(prof);
    } else {
      alertRef.current.show('something went wrong');
    }
  };

  const openModel = image => {
    setimage(image);
    options.current.open();
  };
  const applySuccess = data => {
    alertRef.current.show(data);
  };
  const onoptionSelect = id => {
    if (id === 1) {
      picRef.current.close();
      setTimeout(() => {
        ImagePicker.openCamera({
          width: 500,
          height: 500,
          mediaType: 'photo',
        })
          .then(image => {
            setprofile(image);
            props.editimageRequest(token, applySuccess, image, Data);
          })
          .catch(e => console.log(e));
      }, 500);
    } else if (id === 2) {
      picRef.current.close();
      setTimeout(() => {
        ImagePicker.openPicker({
          width: 500,
          height: 500,
          mediaType: 'photo',
          smartAlbums: smartAlbums,
        })
          .then(image => {
            setprofile(image);
            props.editimageRequest(token, applySuccess, image, Data);
          })
          .catch(e => console.log(e));
      }, 500);
    } else {
      picRef.current.close();
    }
  };

  return (
    <SafeAreaView style={styles.fx}>
      {Data !== '' ? (
        <View style={styles.fx}>
          {props.network === false ? <Internetcomponent /> : null}
          <View style={styles.bg}></View>
          <View style={styles.imgCont}>
            <LoadingImage
              source={{
                uri: profile.path,
              }}
              style={styles.img}
            />
            <TouchableWithoutFeedback onPress={() => picRef.current.open()}>
              <View style={styles.camview}>
                <Icon name="camera" size={13} color="#787777" solid />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => props.navigation.navigate('EditProfile')}>
            <Text style={styles.btntxt}>Edit Profile</Text>
          </TouchableOpacity>
          <View style={styles.key}>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.main}>
                <View style={styles.cont}>
                  <Item
                    title="Name"
                    subtitle={`${Data.first_name} ${Data.last_name}`}
                    icon="user"
                  />
                  <Item
                    title="Email Address"
                    subtitle={Data.email}
                    icon="envelope"
                  />

                  <Item
                    title="Phone Number"
                    subtitle={
                      Data.user_detail !== null
                        ? Data.user_detail.mobile
                            .match(new RegExp('.{1,4}', 'g'))
                            .join('-')
                        : ''
                    }
                    icon="phone-alt"
                  />
                  <Item
                    title="Id Number"
                    subtitle={
                      Data.user_detail !== null
                        ? Data.user_detail.id_number !== null
                          ? Data.user_detail.id_number
                          : ''
                        : ''
                    }
                    subtitle={
                      Data.user_detail !== null
                        ? Data.user_detail.id_number
                        : ''
                    }
                    icon="phone-alt"
                  />
                  <Item
                    title="Id proof 1"
                    icon="id-card"
                    type="btn"
                    openmodel={() =>
                      Data.user_detail !== null
                        ? openModel(Data.user_detail.id_proof_1)
                        : console.log('')
                    }
                  />
                  <Item
                    title="Id proof 2"
                    icon="id-card"
                    type="btn"
                    openmodel={() =>
                      Data.user_detail !== null
                        ? openModel(Data.user_detail.id_proof_2)
                        : console.log('')
                    }
                  />
                  <Item
                    title="Address"
                    subtitle={
                      Data.user_detail !== null ? Data.user_detail.address : ''
                    }
                    icon="map-marker-alt"
                  />
                </View>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                  <View style={styles.backButtonContainer}>
                    <Iconn
                      name="arrow-left"
                      size={13}
                      color="#787777"
                      regular
                    />
                    <Text style={styles.backButtonText}>BACK</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </KeyboardAwareScrollView>
            <Spinner visible={props.loading} />

            <UploadSheet
              ref={picRef}
              onPress={grid => onoptionSelect(grid.id)}
            />
            <ModalSheet
              ref={options}
              onPress={() => options.current.close()}
              source={image}
            />
          </View>
        </View>
      ) : null}
      <Toast
        ref={alertRef}
        position="bottom"
        fadeInDuration={750}
        fadeOutDuration={2000}
        opacity={0.8}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    error: state.ProfileDetailReducer.error,
    loading: state.ProfileDetailReducer.loading,
    network: state.network.isConnected,
  };
};
const mapDispatchToProps = dispatch => ({
  ProfiledetailRequest: (token, success) =>
    dispatch(ProfiledetailRequest(token, success)),
  editimageRequest: (token, success, image, data) =>
    dispatch(editimageRequest(token, success, image, data)),
  jobscountRequest: token => dispatch(jobscountRequest(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
