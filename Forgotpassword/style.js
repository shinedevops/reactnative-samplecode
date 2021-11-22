import {StyleSheet} from 'react-native';
import {screenWidth} from '../../utils/helpers';
const styles = StyleSheet.create({
  textWrapper: {
    width: '90%',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: '#A5A5A5',
    borderRadius: 6,
    height: 45,
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputStyle: {
    width: '98%',
    height: '90%',
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: '#B5B5B5',
  },
  textInputPlaceHolderStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: '#B5B5B5',
  },
  mainWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 15,
  },
  backto: {
    color: '#A2A2A2',
    textAlign: 'right',
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    marginTop: 25,
    flex: 0.6,
  },
  login: {
    color: '#31AAB7',
    textAlign: 'right',
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    textAlign: 'left',
  },
  vv: {
    display: 'flex',
    flexDirection: 'row',
    width: '75%',
  },
  wrap: {
    backgroundColor: '#31AAB7',
    borderWidth: 0,
  },
  txt: {
    color: '#FFFFFF',
  },
  log: {
    marginTop: 25,
  },
});

export default styles;
