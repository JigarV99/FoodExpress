import React, { useState ,useEffect} from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const UpdateAccount = ({navigation})  => {
    const profile = {
        first: 'Jane Doe',
        last:'kdksd',
        email: 'jane.doe@example.com',
        phoneNo: '982992',
      }
  
      const [input, setInput] = useState('');
  
      const [first, setFirst] = useState(profile.first);
      const [loading, setLoading] = useState(false);
      const [errortext, setErrortext] = useState('');
      const [last, setLast] = useState(profile.last);
      const [email, setEmail] = useState(profile.email);
      const [emailNew, setEmailNew] = useState(profile.email);
      const [phoneNo, setphoneNo] = useState(profile.phoneNo);
      const [userName, setUserName] = useState('');
      const [json, setJson] = useState('');
      useEffect(() => {
        const saveData = async () => {
          try {
            console.log(userName);
            
            await AsyncStorage.setItem("@user_name",  userName);
            // alert('Data successfully saved')
          } catch (e) {
            // alert('Failed to save the data to the storage')
          }
        };
        saveData();
    },[]);

    useEffect(() => {
        const user = async () => {
        try {
          const value = await AsyncStorage.getItem("@data");
          console.log(value);
          console.log("---99");
          if (value !== null) {
              // We have data!!
              console.log(JSON.parse(value));
              console.log("----");
              setJson(value);
              //profile.first = va
          }
       } catch (error) {
          // Error retrieving data
          console.log("---00");
       }
      };
      user();
      },[]);

//   const handleSubmit = () => {

//     navigation.pop();
//   }

  const handleSubmit = () => {
    
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    let regP = /^[@#](?=.{7,13}$)(?=\w{7,13})(?=[^aeiou_]{7,13})(?=.*[A-Z])(?=.*\d)/;
    let regPhone = /.?(\\d{3}).*(\\d{3}).*(\\d{4})/;
    setErrortext('');
    if (!first) {
      alert('Please fill First Name');
      return;
    }

    if (!last) {
      alert('Please fill Last Name');
      return;
    }
    if (!email) {
      alert('Please fill Email');
      return;
    }
     if (reg.test(email) === false) {
      alert('enter valid email address');
      return;
    } 
  
    // if (!userPhoneNumber) {
    //   alert('Please fill PhoneNumber');
    //   return;
    // }


    if (phoneNo.length != 10 ){
      alert('enter valid phoneNumber');
      return;
    }


    setErrortext('');
   
     setLoading(true);

    let dataToSend = 
    JSON.stringify({
      newEmail : email,
      email: "jane.doe@example.com",
      firstName: first,
      lastName:last,
      phoneNumber:phoneNo,
    });
      console.log(dataToSend);
      //aws sucks  ec2-18-234-107-170
    fetch('http://ec2-18-234-107-170.compute-1.amazonaws.com:8080/FoodExpressApplication/foodexpressuser/update', {
      method: 'POST',
      body:  dataToSend,
      headers: {
        //Header Defination
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.status.statusResponse == "Success") {
          if (responseJson.userDetailsList != null) {
            console.log('lsls');
            setUserName(responseJson.userDetailsList[0].firstName + ' ' + responseJson.userDetailsList[0].lastName ) 
          }
         
          navigation.pop();
        } else {
          // setErrortext('Please check your email id or password');
          // console.log('Please check your email id or password');
           alert(responseJson.status.responseMessage);
          return;
          
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
   };
  

  return (
    <View style={styles.container}>
    
      <View style={styles.form}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter First"
          value={first}
          onChangeText={setFirst}
        />

      <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Last"
          value={last}
          onChangeText={setLast}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Phone Number</Text>
        <TextInput  
          style={styles.input}
          placeholder="Enter Phone Number"
          value={phoneNo}
          onChangeText={setphoneNo}
        />
        <TouchableOpacity style={styles.button} onPress={() => handleSubmit({first, email, last, phoneNo})}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    marginTop:20,
    width: '80%',
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
    marginTop: 20,
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default UpdateAccount;