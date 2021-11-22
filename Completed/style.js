import {StyleSheet} from 'react-native';
import {screenWidth, screenHeight} from '../../utils/helpers';
const styles = StyleSheet.create({
  headerTextStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    letterSpacing: 0.7,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingTop: 30,
    paddingRight: 15,
    backgroundColor: 'white',
    overflow: 'hidden',
    position: 'relative',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    top: undefined,
    left: 0,
    right: 0,
    width: '120%',
    height: 30,
  },
  cross: {
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 10,
  },
  textWrapper: {
    width: '40%',
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
    alignSelf: 'center',
    marginBottom: 20,
  },
  no: {
    alignSelf: 'center',
    marginTop: screenHeight / 3,
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    letterSpacing: 0.7,
    color: '#959595',
  },
});
export default styles;
