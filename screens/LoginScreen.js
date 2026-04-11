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
  Keyboard,
  Alert
} from 'react-native';

const { width } = Dimensions.get('window');

export default function LoginScreen({ onSignup, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert('Error', 'Vui lòng nhập email và mật khẩu');
        return;
      }

      // 🔥 FIX: tạo user object đúng chuẩn AsyncStorage
      const user = {
        email,
        token: 'demo-token',
        loginTime: Date.now(),
      };

      await onLoginSuccess(user); // 👈 QUAN TRỌNG
    } catch (error) {
      console.log('LOGIN ERROR:', error);
      Alert.alert('Error', 'Đăng nhập thất bại');
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      <Image
        source={require('../assets/anhnen.png')}
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

              <View style={styles.logoContainer}>
                <Image
                  source={require('../assets/carrot.png')}
                  style={styles.logo}
                />
              </View>

              <View style={styles.content}>

                <Text style={styles.mainTitle}>Login</Text>
                <Text style={styles.subTitle}>
                  Enter your email and password
                </Text>

                {/* EMAIL */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your email"
                    placeholderTextColor="#B1B1B1"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                  />
                </View>

                {/* PASSWORD */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Password</Text>

                  <View style={styles.passwordRow}>
                    <TextInput
                      style={styles.passwordInput}
                      placeholder="Enter your password"
                      placeholderTextColor="#B1B1B1"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                    />

                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Image
                        source={{
                          uri: 'https://cdn-icons-png.flaticon.com/512/709/709612.png',
                        }}
                        style={styles.eyeIcon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* LOGIN BUTTON */}
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={handleLogin}
                >
                  <Text style={styles.loginButtonText}>Log In</Text>
                </TouchableOpacity>

                {/* SIGNUP */}
                <View style={styles.signupContainer}>
                  <Text style={styles.noAccountText}>
                    Don’t have an account?
                  </Text>

                  <TouchableOpacity onPress={onSignup}>
                    <Text style={styles.signupText}> Sign Up</Text>
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

/* ================= STYLE (GIỮ NGUYÊN UI) ================= */
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1 },
  inner: { flex: 1 },

  topImage: {
    position: 'absolute',
    top: 0,
    width: width,
    height: 220,
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },

  logo: {
    width: 56,
    height: 64,
  },

  content: {
    marginTop: 50,
    paddingHorizontal: 25,
  },

  mainTitle: {
    fontSize: 26,
    fontWeight: '600',
    color: '#181725',
    marginBottom: 10,
  },

  subTitle: {
    fontSize: 16,
    color: '#7C7C7C',
    marginBottom: 40,
  },

  inputGroup: {
    marginBottom: 25,
  },

  label: {
    fontSize: 16,
    color: '#7C7C7C',
    marginBottom: 5,
  },

  textInput: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingBottom: 8,
    color: '#181725',
  },

  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingBottom: 8,
  },

  passwordInput: {
    flex: 1,
    fontSize: 18,
    color: '#181725',
    padding: 0,
  },

  eyeIcon: {
    width: 22,
    height: 22,
    tintColor: '#7C7C7C',
    marginLeft: 10,
  },

  loginButton: {
    backgroundColor: '#53B175',
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  noAccountText: {
    color: '#181725',
  },

  signupText: {
    color: '#53B175',
    fontWeight: '600',
  },
});