// Login.js
import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import App from './App';

const Login = ({ onLogin }) => {
  const handleLogin = () => {
    // Add your login logic here
    // For simplicity, let's consider a basic check for a username and password
    const username = 'yourUsername'; // Replace with your actual username
    const password = 'yourPassword'; // Replace with your actual password

    if (username === 'yourUsername' && password === 'yourPassword') {
      onLogin(); // Callback to notify the parent component that login is successful
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {/* Add TextInput for username and password */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        // onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        // onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:150,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    marginBottom: 50,
    marginTop:50,
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius:12,
    fontSize:17,
    marginLeft:12
    
  },
  loginButton: {
    backgroundColor: 'rgb(136, 84, 192)',
    borderRadius: 14,
    padding: 10,
    width:120,
    marginTop:12
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign:"center",
    fontSize:23
    
  },
});

export default Login;
