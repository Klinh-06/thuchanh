import { memo } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Tách hằng số màu sắc để dễ quản lý và thay đổi sau này
const COLORS = {
  white: '#FFFFFF',
  black: '#030303',
  gray: '#828282',
  border: '#E2E2E2',
  placeholder: '#B1B1B1',
  google: '#5383EC',
  facebook: '#4A66AC',
};

// Cải tiến 1: Tách Component nút mạng xã hội để tái sử dụng
const SocialButton = ({ logo, text, backgroundColor, onPress, style }) => (
  <TouchableOpacity 
    style={[styles.socialBtn, { backgroundColor }, style]} 
    activeOpacity={0.8}
    onPress={onPress}
  >
    <Image source={logo} style={styles.socialLogo} />
    <Text style={styles.socialBtnText}>{text}</Text>
  </TouchableOpacity>
);

// Cải tiến 2: Tách Input Component số điện thoại
const PhoneInputButton = ({ onPress }) => (
  <TouchableOpacity 
    style={styles.inputSection} 
    activeOpacity={0.7}
    onPress={onPress}
  >
    <View style={styles.inputWrapper}>
      {/* Cải tiến 3: Dùng URL ổn định cho quốc kỳ Bangladesh */}
      <Image
        source={{ uri: 'https://flagcdn.com/w40/bd.png' }} 
        style={styles.flag}
        resizeMode="contain"
      />
      <Text style={styles.code}>+880</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Enter mobile number"
        placeholderTextColor={COLORS.placeholder}
        editable={false} // Chặn không cho gõ trực tiếp
        pointerEvents="none" // Đảm bảo sự kiện bấm thuộc về TouchableOpacity
      />
    </View>
  </TouchableOpacity>
);

// Cải tiến 4: Dùng React.memo để tối ưu hiệu năng (tránh re-render không cần thiết)
const SignInScreen = memo(({ onPhoneNumberPress, onSignInPress }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          source={require('../assets/anh1.png')}
          style={styles.topImage}
          resizeMode="contain"
        />

        <View style={styles.content}>
        <TouchableOpacity onPress={onSignInPress} activeOpacity={0.7}>
          <Text style={styles.signInLabel}>Sign in</Text>
        </TouchableOpacity>

        <Text style={styles.title}>
          Get your groceries{'\n'}with nectar
        </Text>

        <PhoneInputButton onPress={onPhoneNumberPress} />

        <Text style={styles.socialText}>Or connect with social media</Text>

        <SocialButton
          logo={require('../assets/logogmail.png')}
          text="Continue with Google"
          backgroundColor={COLORS.google}
          onPress={onSignInPress}
        />

        <SocialButton
          logo={require('../assets/logofb.png')}
          text="Continue with Facebook"
          backgroundColor={COLORS.facebook}
          onPress={onSignInPress}
        />

        <View style={styles.bottomRow}>
          <Text style={styles.bottomText}>Already have an account?</Text>
          <TouchableOpacity onPress={onSignInPress} activeOpacity={0.7}>
            <Text style={styles.bottomLink}> Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
});

// Thêm tên hiển thị để dễ debug
SignInScreen.displayName = 'SignInScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scroll: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  topImage: {
    width: '100%',
    height: 260,
  },
  content: {
    paddingHorizontal: 25,
  },
  signInLabel: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.black,
    marginTop: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: COLORS.black,
    lineHeight: 32,
    marginBottom: 20,
  },
  inputSection: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: 8,
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    width: 25,
    height: 18,
    marginRight: 10,
  },
  code: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.black,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
    color: COLORS.black,
    paddingVertical: Platform.OS === 'android' ? 0 : 5,
  },
  socialText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray,
    textAlign: 'center',
    marginVertical: 20,
  },
  socialBtn: {
    width: '100%',
    height: 60,
    borderRadius: 19,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  socialLogo: {
    width: 24,
    height: 24,
    marginRight: 12,
    resizeMode: 'contain',
  },
  socialBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  bottomText: {
    fontSize: 14,
    color: COLORS.gray,
  },
  bottomLink: {
    fontSize: 14,
    fontWeight: '700',
    color: '#53B175',
  },
});

export default SignInScreen;