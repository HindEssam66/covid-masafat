
import {StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#172774',
   
  },
  container: {
    flex: 1,
    // justifyContent:'center',
    // alignContent:'center',
    // alignItems:'center',
    // backgroundColor: '#EEEEEE',
    backgroundColor: '#172774',

  },
  boxheader:{
      flex: .3,
      alignItems: 'center',
  },
  tinyLogo: {
    width: 275,
    height: 275,
  },
  loginbox:{
      flex:.7
  },
  login:{
    width:width-40,
    height:50,
    borderRadius:25,
    backgroundColor:'#32E0C4',
    alignSelf:'center',
    alignContent:'center',
    justifyContent:'center',
    marginTop:10,
    marginBottom:20
  },
  button:{
    width:width-40,
    height:50,
    borderRadius:25,
    backgroundColor:'#32E0C4',
    alignSelf:'center',
    alignContent:'center',
    justifyContent:'center',
    marginTop:10,
    paddingLeft:25
  },
  tile:{
      fontSize:26,
      color:'#FFFF',
      marginLeft:20,
      marginTop:25
    //  fontWeight: 'bold' 
  }

});

export default styles; 