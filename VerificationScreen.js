import React, { useRef, useEffect, useState } from 'react';
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
  Keyboard,
  Animated,
  Platform
} from 'react-native';

const { width } = Dimensions.get('window');

export default function VerificationScreen({ onBack, onVerify }) {
  const inputRef = useRef(null);
  const [otp, setOtp] = useState('');

  const buttonBottom = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 500);

    const show = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        Animated.timing(buttonBottom, {
          toValue: e.endCoordinates.height + 20,
          duration: 250,
          useNativeDriver: false,
        }).start();
      }
    );

    const hide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        Animated.timing(buttonBottom, {
          toValue: 40,
          duration: 250,
          useNativeDriver: false,
        }).start();
      }
    );

    return () => {
      show.remove();
      hide.remove();
      clearTimeout(timer);
    };
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {/* Background top */}
      <Image 
        source={require('./assets/anhnen.png')} 
        style={styles.topImage} 
        resizeMode="cover"
      />

      <SafeAreaView style={styles.container}>
        
        {/* Back */}
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/271/271220.png' }} 
            style={styles.backIcon} 
          />
        </TouchableOpacity>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.mainTitle}>
            Enter your 4-digit code
          </Text>

          <View style={styles.inputArea}>
            <Text style={styles.label}>Code</Text>

            <View style={styles.inputRow}>
              <TextInput 
                ref={inputRef}
                style={styles.textInput} 
                keyboardType="number-pad"
                placeholder="- - - -"
                placeholderTextColor="#B1B1B1"
                maxLength={4}
                value={otp}
                onChangeText={(text) => {
                  setOtp(text);
                  if (text.length === 4) Keyboard.dismiss();
                }}
              />
            </View>
          </View>
        </View>

        {/* Button */}
        <Animated.View style={[styles.button, { bottom: buttonBottom }]}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onVerify()} // 🔥 chuyển sang SelectLocation
            disabled={otp.length < 4}
          >
            <Image 
              source={require('./assets/button.png')} 
              style={[
                styles.buttonImage, 
                { opacity: otp.length === 4 ? 1 : 0.5 }
              ]} 
            />
          </TouchableOpacity>
        </Animated.View>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1 },

  topImage: {
    position: 'absolute',
    top: 0,
    width: width,
    height: 250,
  },

  backButton: {
    marginTop: 20,
    marginLeft: 25,
  },

  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#000',
  },

  content: {
    marginTop: 80,
    paddingHorizontal: 25,
  },

  mainTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 40,
  },

  label: {
    fontSize: 16,
    color: '#7C7C7C',
    fontWeight: '600',
    marginBottom: 10,
  },

  inputRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingBottom: 10,
  },

  textInput: {
    fontSize: 18,
    letterSpacing: 25,
  },

  button: {
    position: 'absolute',
    right: 25,
    width: 67,
    height: 67,
  },

  buttonImage: {
    width: '100%',
    height: '100%',
  },
});