import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

export default function OnboardingScreen({ onGetStarted }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ImageBackground
        source={require('./assets/background.png')}
        style={styles.background}
      >
        {/* Logo nhỏ */}
        <Image
          source={require('./assets/carot.png')}
          style={styles.logoSmall}
          resizeMode="contain"
        />

        {/* Title */}
        <Text style={styles.title}>
          Welcome{'\n'}to our store
        </Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Get your groceries in as fast as one hour
        </Text>

        {/* Button */}
        <TouchableOpacity 
          style={styles.button}
          onPress={onGetStarted} // 🔥 QUAN TRỌNG
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  background: {
    width: 414,
    height: 896.35,
    position: 'relative',
  },

  logoSmall: {
    width: 48,
    height: 56,
    position: 'absolute',
    top: 480,
    left: 183,
  },

  title: {
    position: 'absolute',
    top: 550,
    left: 40,
    width: 334,

    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 56,
  },

  subtitle: {
    position: 'absolute',
    width: 295,

    top: 682.28,
    left: 59.5,

    color: '#FCFCFC',
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  },

  button: {
    width: 353,
    height: 67,
    backgroundColor: '#53B175',
    borderRadius: 19,

    position: 'absolute',
    top: 720,
    left: 30.5,

    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
