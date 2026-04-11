import React, { memo } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';

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
const SignInScreen = memo(({ onPhoneNumberPress, onGooglePress, onFacebookPress }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Cải tiến 5: StatusBar tối ưu cho iOS/Android */}
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {/* Ảnh minh họa phía trên (anh1.png) */}
      <Image
        source={require('./assets/anh1.png')}
        style={styles.topImage}
        resizeMode="contain"
      />

      {/* Tiêu đề chính */}
      <Text style={styles.title}>
        Get your groceries{'\n'}with nectar
      </Text>

      {/* Khu vực nhập SĐT */}
      <PhoneInputButton onPress={onPhoneNumberPress} />

      {/* Dòng chữ kết nối mạng xã hội */}
      <Text style={styles.socialText}>Or connect with social media</Text>

      {/* Nút Google - Sử dụng Component SocialButton */}
      <SocialButton
        logo={require('./assets/logogmail.png')}
        text="Continue with Google"
        backgroundColor={COLORS.google}
        onPress={onGooglePress}
        style={{ top: 651.58 }} // Giữ nguyên tọa độ chuẩn
      />

      {/* Nút Facebook - Sử dụng Component SocialButton */}
      <SocialButton
        logo={require('./assets/logofb.png')}
        text="Continue with Facebook"
        backgroundColor={COLORS.facebook}
        onPress={onFacebookPress}
        style={{ top: 738.58 }} // Giữ nguyên tọa độ chuẩn
      />
    </SafeAreaView>
  );
});

// Thêm tên hiển thị để dễ debug
SignInScreen.displayName = 'SignInScreen';

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.white,
    // Tối ưu cho thiết bị Android không có SafeArea
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  topImage: {
    width: 414,
    height: 374,
    position: 'absolute',
    top: 0,
  },
  title: {
    position: 'absolute',
    width: 222,
    height: 63,
    top: 423.63,
    left: 25,
    fontSize: 26,
    // Cải tiến 6: Dùng font Gilroy SemiBold nếu đã cài đặt (thay fontWeight bằng fontFamily)
    fontWeight: '600', 
    color: COLORS.black,
    lineHeight: 30,
  },
  inputSection: {
    position: 'absolute',
    top: 517.24,
    left: 25,
    width: 364,
    height: 39.55,
    borderBottomWidth: 1, 
    borderBottomColor: COLORS.border, 
    justifyContent: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: { 
    width: 25, 
    height: 18, 
    marginRight: 10 
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
    // Fix lỗi hiển thị placeholder trên Android
    paddingVertical: Platform.OS === 'android' ? 0 : 5, 
  },
  socialText: {
    position: 'absolute',
    top: 590, 
    width: '100%',
    fontSize: 14,
    // Font Gilroy Medium nếu đã cài đặt
    fontWeight: '600', 
    color: COLORS.gray,
    textAlign: 'center',
    lineHeight: 14,
  },
  socialBtn: {
    position: 'absolute',
    width: 364,
    height: 67,
    left: 25,
    borderRadius: 19,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    // Đổ bóng cho Android (elevation)
    elevation: 3,
    // Đổ bóng cho iOS (shadow)
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  socialLogo: { 
    width: 24, 
    height: 24, 
    marginRight: 40,
    resizeMode: 'contain' 
  },
  socialBtnText: {
    color: COLORS.white,
    fontSize: 18,
    // Font Gilroy SemiBold nếu đã cài đặt
    fontWeight: '600',
    flex: 1, // Đảm bảo text được căn giữa
    textAlign: 'center',
    marginRight: 24, // Cân bằng với marginRight của logo để text nằm giữa nút
  },
});

export default SignInScreen;