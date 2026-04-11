import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

export default function OnboardingScreen({ onGetStarted }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ImageBackground
        source={require('../assets/background.png')}
        style={styles.background}
        imageStyle={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Logo nhỏ */}
        <Image
          source={require('../assets/carot.png')}
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
    width: SCREEN_W,
    height: SCREEN_H,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 60,
  },
  backgroundImage: {
    width: SCREEN_W,
    height: SCREEN_H,
  },

  logoSmall: {
    width: 48,
    height: 56,
    marginBottom: 16,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 50,
    marginBottom: 12,
  },

  subtitle: {
    color: '#FCFCFC',
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: 24,
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
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
