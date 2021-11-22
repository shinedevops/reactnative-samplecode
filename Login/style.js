import {StyleSheet} from 'react-native';
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
    fontSize: 12,
    color: '#636363',
    paddingBottom: 0,
    paddingTop: 0,
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
  flexx: {
    flex: 1,
  },
  email: {
    fontSize: 10,
    color: 'red',
    fontFamily: 'Poppins-Regular',
  },
  forgot: {
    color: '#31AAB7',
    textAlign: 'right',
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    marginTop: 10,
  },
  noac: {
    color: '#A2A2A2',
    textAlign: 'right',
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    marginTop: 25,
    flex: 0.75,
  },
  reg: {
    color: '#31AAB7',
    textAlign: 'right',
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    textAlign: 'left',
  },
  dac: {
    display: 'flex',
    flexDirection: 'row',
    width: '75%',
  },
  log: {
    marginTop: 25,
  },
  for: {
    width: '75%',
  },
  wrap: {
    backgroundColor: '#31AAB7',
    borderWidth: 0,
  },
  txt: {
    color: '#FFFFFF',
  },
});
export default styles;
