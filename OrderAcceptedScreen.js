import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const OrderAcceptedScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/bg.png')}
        style={styles.background}
      >
        <SafeAreaView style={styles.safeArea}>

          {/* TOP CONTENT */}
          <View style={styles.contentTop}>
            <Image
              source={require('./assets/button.png')}
              style={styles.checkIcon}
              resizeMode="contain"
            />

            <Text style={styles.title}>
              Your Order has been{"\n"}accepted
            </Text>

            <Text style={styles.subtitle}>
              Your items has been placed and is on{"\n"}
              it’s way to being processed
            </Text>
          </View>

          {/* BOTTOM BUTTONS */}
          <View style={styles.contentBottom}>

            {/* 🔥 CHỈ SỬA Ở ĐÂY */}
            <TouchableOpacity
              style={styles.trackOrderBtn}
              onPress={() => navigation.navigate('Orders')}
            >
              <Text style={styles.trackOrderText}>
                Track Order
              </Text>
            </TouchableOpacity>

            {/* BACK HOME */}
            <TouchableOpacity
              style={styles.backHomeBtn}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.backHomeText}>
                Back to home
              </Text>
            </TouchableOpacity>

          </View>

        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default OrderAcceptedScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },

  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  safeArea: {
    flex: 1,
  },

  contentTop: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },

  contentBottom: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingBottom: 40,
  },

  checkIcon: {
    width: 160,
    height: 160,
    marginBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    color: '#181725',
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#7C7C7C',
  },

  trackOrderBtn: {
    width: 364,
    height: 67,
    backgroundColor: '#53B175',
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  trackOrderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
  },

  backHomeBtn: {
    paddingVertical: 10,
  },

  backHomeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#181725',
  },
});