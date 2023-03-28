import react from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
    Image,
     TextInput 
  } from 'react-native';

  import React, {useState,useEffect} from 'react';
  // import { useNavigation } from '@react-navigation/native';
  import AsyncStorage from '@react-native-async-storage/async-storage';


  const Account = ({navigation}) => {
  // export default function Account(props) {

    const [dataFromNextScreen, setDataFromNextScreen] = useState('');
    // const [dataFromNextScreen, dataFromNextScreen] = useState('');
    // const navigation = useNavigation();
  
    const handleSubmit = () => {
      navigation.popToTop();
    }

    const handleDataFromNextScreen = (data) => {
      setDataFromNextScreen(data);
    };
    
    useEffect(() => {
      const readData = async () => {
        try {
          console.log("Inside READ")
          const value = await AsyncStorage.getItem("@user_name");
          console.log({value});
          if (value !== null) {
            setDataFromNextScreen(value);
          }
        } catch (e) {
          //alert('Failed to fetch the input from storage');
        }
      };
      readData();
    },[dataFromNextScreen]);


    return( 
  <View style={styles.container}>
  <View style={styles.avatarContainer}>
    <Image
      style={styles.avatar}
      source={require('../assets/images/avatar-3.jpg')}
    />
    <Text style={styles.label}>{dataFromNextScreen}</Text>
    <TouchableOpacity style={styles.changeAvatarButton} onPress={() => {


navigation.navigate('UpdateAccount', {
  handleDataFromNextScreen: handleDataFromNextScreen,
})

       //navigation.navigate('UpdateAccount');

    }}>
      <Text style={styles.changeAvatarButtonText}>Edit Profile</Text>
    </TouchableOpacity>
  </View>
  <View style={styles.form}>

    <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
      <Text style={styles.buttonText}>Logout</Text>
    </TouchableOpacity>
  </View>

</View>
    );

  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
       justifyContent: 'center',
      marginTop: 20,
    },
    form: {
      width: '80%',
      marginTop: 400,
    },
    label: {
      marginTop: 20,
    },
    input: {
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      fontSize: 18,
    },
    button: {
      backgroundColor: '#1E90FF',
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 20,
      // justifyContent: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
    },
    avatarContainer: {
      marginTop: 0,
      alignItems: 'center',
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 50,
    },
    changeAvatarButton: {
      marginTop: 10,
    },
    changeAvatarButtonText: {
      color: '#1E90FF',
      fontSize: 18,
    },
  });
  


  export default Account;