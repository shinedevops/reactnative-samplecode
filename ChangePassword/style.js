import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  textWrapper: {
    width: "90%",
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: "#A5A5A5",
    borderRadius: 6,
    height: 45,
    backgroundColor: "#FFFFFF",
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textInputStyle: {
    width: "98%",
    height: "90%",
    fontFamily: "Poppins-Regular",
    fontSize: 10,
    color: "#B5B5B5",
  },
  textInputPlaceHolderStyle: {
    fontFamily: "Poppins-Regular",
    fontSize: 10,
    color: "#B5B5B5",
  },
  mainWrapper: {
    display: "flex",
    alignItems: "center",
    marginTop: 15,
  },
  main: {
    flex: 1,
  },
});
export default styles;
