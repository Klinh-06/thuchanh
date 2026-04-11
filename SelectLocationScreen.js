import React from 'react';
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

export default function SelectLocationScreen({ onBack, onNext }) {
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

              {/* Back */}
              <TouchableOpacity style={styles.backButton} onPress={onBack}>
                <Image 
                  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/271/271220.png' }} 
                  style={styles.backIcon} 
                />
              </TouchableOpacity>

              {/* Content */}
              <View style={styles.content}>

                {/* Illustration */}
                <Image 
                  source={require('./assets/location.png')} 
                  style={styles.illustration}
                />

                {/* Title */}
                <Text style={styles.title}>
                  Select Your Location
                </Text>

                {/* Subtitle */}
                <Text style={styles.subtitle}>
                  Switch on your location to stay in tune with{'\n'}
                  what’s happening in your area
                </Text>

                {/* YOUR ZONE */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Your Zone</Text>

                  <View style={styles.inputRow}>
                    <TextInput
                      style={styles.input}
                      placeholder="Banasree"
                      placeholderTextColor="#030303"
                    />
                    <Image
                      source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2985/2985150.png' }}
                      style={styles.icon}
                    />
                  </View>
                </View>

                {/* YOUR AREA */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Your Area</Text>

                  <View style={styles.inputRow}>
                    <TextInput
                      style={styles.input}
                      placeholder="Types of your area"
                      placeholderTextColor="#B1B1B1"
                    />
                    <Image
                      source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2985/2985150.png' }}
                      style={styles.icon}
                    />
                  </View>
                </View>

              </View>

              {/* Submit Button */}
              <View style={styles.footer}>
                <TouchableOpacity 
                  style={styles.button} 
                  onPress={() => onNext()} // 👉 sang LoginScreen
                >
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>

            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container: {
    flex: 1,
  },

  inner: {
    flex: 1,
  },

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
    marginTop: 50,
    paddingHorizontal: 25,
    alignItems: 'center',
  },

  illustration: {
    width: 220,
    height: 160,
    resizeMode: 'contain',
    marginBottom: 30,
  },

  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#181725',
    textAlign: 'center',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22, // fix giãn dòng đẹp
    color: '#7C7C7C',
    textAlign: 'center',
    marginBottom: 45,
  },

  inputGroup: {
    width: '100%',
    marginBottom: 30,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
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
    letterSpacing: 0, // 🔥 fix chữ không bị thưa
  },

  icon: {
    width: 18,
    height: 18,
    tintColor: '#7C7C7C',
  },

  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
  },

  button: {
    width: 364,
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
});