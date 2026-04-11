import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

const { width } = Dimensions.get('window');

export default function SignupScreen({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {/* Background */}
      <Image
        source={require('./assets/anhnen.png')}
        style={styles.topImage}
        resizeMode="cover"
      />

      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>

              {/* Logo */}
              <View style={styles.logoContainer}>
                <Image
                  source={require('./assets/carrot.png')}
                  style={styles.logo}
                />
              </View>

              <View style={styles.content}>
                {/* Title */}
                <Text style={styles.title}>Sign Up</Text>
                <Text style={styles.subtitle}>
                  Enter your credentials to continue
                </Text>

                {/* USERNAME */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Username</Text>
                  <View style={styles.inputRow}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your username"
                      placeholderTextColor="#B1B1B1"
                      value={username}
                      onChangeText={setUsername}
                    />
                  </View>
                </View>

                {/* EMAIL */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email</Text>
                  <View style={styles.inputRow}>
                    <TextInput
                      style={[styles.input, email === '' && styles.dimText]}
                      value={email}
                      onChangeText={setEmail}
                      placeholder="Enter your email"
                      placeholderTextColor="#B1B1B1"
                      keyboardType="email-address"
                    />

                    {/* ✔ Tick */}
                    {email !== '' && (
                      <Image
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/190/190411.png' }}
                        style={styles.checkIcon}
                      />
                    )}
                  </View>
                </View>

                {/* PASSWORD */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.inputRow}>
                    <TextInput
                      style={[styles.input, password === '' && styles.dimText]}
                      value={password}
                      onChangeText={setPassword}
                      placeholder="Enter your password"
                      placeholderTextColor="#B1B1B1"
                      secureTextEntry={!showPassword}
                    />

                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      <Image
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/709/709612.png' }}
                        style={styles.eyeIcon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* TERMS */}
                <Text style={styles.terms}>
                  By continuing you agree to our{' '}
                  <Text style={styles.link}>Terms of Service</Text>{'\n'}
                  and <Text style={styles.link}>Privacy Policy</Text>.
                </Text>

                {/* BUTTON SIGN UP */}
                <TouchableOpacity style={styles.button} onPress={() => alert('Signed Up!')}>
                  <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                {/* LOGIN */}
                <View style={styles.loginRow}>
                  <Text style={styles.loginText}>
                    Already have an account?
                  </Text>
                  <TouchableOpacity onPress={onLogin}>
                    <Text style={styles.loginLink}> Login</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1 },
  inner: { flex: 1 },

  topImage: {
    position: 'absolute',
    top: 0,
    width: width,
    height: 250,
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },

  logo: {
    width: 48,
    height: 56,
  },

  content: {
    marginTop: 50,
    paddingHorizontal: 25,
  },

  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#030303',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: '#7C7C7C',
    lineHeight: 22,
    marginBottom: 40,
  },

  inputGroup: {
    marginBottom: 30,
  },

  label: {
    fontSize: 16,
    color: '#7C7C7C',
    marginBottom: 6,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingBottom: 10,
  },

  input: {
    flex: 1,
    fontSize: 18,
    color: '#030303',
    padding: 0,
  },

  dimText: {
    color: '#B1B1B1',
  },

  eyeIcon: {
    width: 20,
    height: 20,
    tintColor: '#7C7C7C',
  },

  checkIcon: {
    width: 18,
    height: 18,
    tintColor: '#53B175',
  },

  terms: {
    fontSize: 14,
    lineHeight: 15,
    letterSpacing: 0.7,
    color: '#7C7C7C',
    textAlign: 'center',
    marginBottom: 20,
  },

  link: {
    color: '#53B175',
    fontWeight: '600',
  },

  button: {
    width: '100%',
    height: 67,
    backgroundColor: '#53B175',
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },

  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },

  loginText: {
    fontSize: 14,
    color: '#030303',
  },

  loginLink: {
    fontSize: 14,
    color: '#53B175',
    fontWeight: '600',
    letterSpacing: 0.7,
  },
});