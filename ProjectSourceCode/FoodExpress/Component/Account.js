import react from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity
  } from 'react-native';

  import React, {useState,useEffect} from 'react';
  import { icons, images, SIZES, COLORS, FONTS } from '../constants'

  import AsyncStorage from '@react-native-async-storage/async-storage';
  export default function Account(props) {
    const [input, setInput] = useState('');

  
    useEffect(() => {
      const readData = async () => {
        try {
          
          const value = await AsyncStorage.getItem("@user_name");
          console.log(value);
          if (value !== null) {
            setInput(value);
          }
        } catch (e) {
          //alert('Failed to fetch the input from storage');
        }
      };
      readData();
    }, []);

    return(
      //  <View style = {[styles.sectionContainer]}> 
      //  <View style = {[styles.items]}> 
      //   <Text onPress={()=> props.navigation.popToTop()}>Logout</Text>
      //  </View>

      //  </View>
    
      
   <View style = {[styles.sectionContainer]}> 
    <Text style = {{...FONTS.h1}}>{input}</Text>  
   <TouchableOpacity style={styles.loginBtn}>
     <Text onPress={()=> props.navigation.popToTop()} >Logout</Text> 
   </TouchableOpacity>
   </View>
    );

  }
  const styles = StyleSheet.create({
    sectionContainer: {
      flex : 1,
      backgroundColor : '#fffff',
      padding : 5,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
    items : {
     flex : 0.1,
     justifyContent: 'center',
     backgroundColor : '#f0f8ff',
     padding : 10,
    },
    separteView : {
      hieght : 2,
      width :"100%",
    },
    loginBtn: {
      width: "100%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 550,
      marginLeft : 40,
      backgroundColor: "#1e90ff",
    },
  });
