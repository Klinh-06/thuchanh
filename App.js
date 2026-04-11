import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// ===== STORAGE =====
import { getUser, saveUser, removeUser } from './services/storageService';

// ===== AUTH =====
import SplashScreen from './SplashScreen';
import OnboardingScreen from './OnboardingScreen';
import SignInScreen from './SignInScreen';
import MobileNumberScreen from './MobileNumberScreen';
import VerificationScreen from './VerificationScreen';
import SelectLocationScreen from './SelectLocationScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';

// ===== MAIN =====
import HomeScreen from './HomeScreen';
import ExploreScreen from './ExploreScreen';
import BeveragesScreen from './BeveragesScreen';
import SearchScreen from './SearchScreen';
import FilterScreen from './FilterScreen';
import CartScreen from './CartScreen';
import FavoriteScreen from './FavoriteScreen';
import OrderAcceptedScreen from './OrderAcceptedScreen';
import AccountScreen from './AccountScreen';
import OrdersScreen from './OrdersScreen';

// 🔥 FIX QUAN TRỌNG
import ProductDetail from './ProductDetail';

const Stack = createNativeStackNavigator();

export default function App() {
  const [screen, setScreen] = useState('splash');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initApp = async () => {
      try {
        const user = await getUser();

        if (user) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.log('AUTO LOGIN ERROR:', error);
        setIsLoggedIn(false);
      } finally {
        setTimeout(() => {
          setScreen('onboarding');
          setLoading(false);
        }, 1500);
      }
    };

    initApp();
  }, []);

  // ===== SPLASH =====
  if (loading || (!isLoggedIn && screen === 'splash')) {
    return <SplashScreen />;
  }

  // ===== AUTH FLOW =====
  if (!isLoggedIn) {
    if (screen === 'onboarding') {
      return <OnboardingScreen onGetStarted={() => setScreen('signin')} />;
    }

    if (screen === 'signin') {
      return <SignInScreen onPhoneNumberPress={() => setScreen('number')} />;
    }

    if (screen === 'number') {
      return (
        <MobileNumberScreen
          onBack={() => setScreen('signin')}
          onNext={() => setScreen('verification')}
        />
      );
    }

    if (screen === 'verification') {
      return (
        <VerificationScreen
          onBack={() => setScreen('number')}
          onVerify={() => setScreen('location')}
        />
      );
    }

    if (screen === 'location') {
      return (
        <SelectLocationScreen
          onBack={() => setScreen('verification')}
          onNext={() => setScreen('login')}
        />
      );
    }

    if (screen === 'login') {
      return (
        <LoginScreen
          onLoginSuccess={async () => {
            try {
              await saveUser({
                name: 'Linh',
                token: 'demo-token',
              });

              setIsLoggedIn(true);
            } catch (error) {
              console.log('LOGIN ERROR:', error);
            }
          }}
          onSignup={() => setScreen('signup')}
        />
      );
    }

    if (screen === 'signup') {
      return <SignupScreen onLogin={() => setScreen('login')} />;
    }

    return null;
  }

  // ===== MAIN APP =====
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>

          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Explore" component={ExploreScreen} />
          <Stack.Screen name="Beverages" component={BeveragesScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Filter" component={FilterScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Favorite" component={FavoriteScreen} />
          <Stack.Screen name="Orders" component={OrdersScreen} />

          {/* 🔥 FIX: thêm dòng này */}
          <Stack.Screen name="ProductDetail" component={ProductDetail} />

          <Stack.Screen name="OrderAccepted" component={OrderAcceptedScreen} />

          <Stack.Screen name="Account">
            {(props) => (
              <AccountScreen
                {...props}
                onLogout={async () => {
                  try {
                    await removeUser();
                    setIsLoggedIn(false);
                    setScreen('onboarding');
                  } catch (error) {
                    console.log('LOGOUT ERROR:', error);
                  }
                }}
              />
            )}
          </Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}