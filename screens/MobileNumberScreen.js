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
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

const { width } = Dimensions.get('window');

export default function MobileNumberScreen({ onBack, onNext }) {
  const inputRef = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  // Tự động mở bàn phím khi vào màn hình
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Xử lý khi nhấn nút Next
  const handlePressNext = () => {
    if (phoneNumber.length >= 10) {
      onNext(phoneNumber);
    } else {
      // Có thể thêm hiệu ứng rung hoặc thông báo lỗi nhẹ ở đây
      console.log("Số điện thoại chưa đủ độ dài");
    }
  };

  return (
    <View style={styles.root}>
      {/* 1. Thiết lập thanh trạng thái */}
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {/* 2. Thành phần đồ họa nền (Top Background) */}
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

              {/* 3. Nút điều hướng quay lại */}
              <TouchableOpacity 
                style={styles.backButton} 
                onPress={onBack}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Image 
                  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/271/271220.png' }} 
                  style={styles.backIcon} 
                />
              </TouchableOpacity>

              {/* 4. Khu vực nội dung chính */}
              <View style={styles.content}>
                <Text style={styles.mainTitle}>Enter your mobile number</Text>
                
                <View style={styles.inputArea}>
                  <Text style={styles.label}>Mobile Number</Text>

                  <View style={styles.inputRow}>
                    {/* Quốc kỳ & Mã vùng */}
                    <View style={styles.countryPicker}>
                      <Image 
                        source={{ uri: 'https://flagcdn.com/w40/bd.png' }} 
                        style={styles.flagIcon} 
                      />
                      <Text style={styles.countryCode}>+880</Text>
                    </View>

                    {/* Ô nhập liệu chính */}
                    <TextInput 
                      ref={inputRef}
                      style={styles.textInput} 
                      keyboardType="phone-pad"
                      placeholder="0123456789"
                      placeholderTextColor="#B1B1B1"
                      maxLength={10}
                      value={phoneNumber}
                      onChangeText={setPhoneNumber}
                      selectionColor="#53B175" // Màu con trỏ xanh theo thương hiệu
                    />
                  </View>
                </View>
              </View>

              {/* 5. Nút bấm nổi (Floating Action Button) */}
              <View style={styles.buttonWrapper}>
                <TouchableOpacity 
                  style={[
                    styles.floatingButton, 
                    { opacity: phoneNumber.length >= 10 ? 1 : 0.6 } // Làm mờ nếu chưa đủ số
                  ]}
                  onPress={handlePressNext}
                  activeOpacity={0.8}
                  disabled={phoneNumber.length < 10}
                >
                  <Image 
                    source={require('../assets/button.png')} 
                    style={styles.buttonImage} 
                  />
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
    backgroundColor: '#FFFFFF',
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
    left: 0,
    width: width,
    height: 250,
  },
  backButton: {
    marginTop: 20,
    marginLeft: 25,
    width: 32,
    height: 32,
    justifyContent: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#030303',
  },
  content: {
    marginTop: 70,
    paddingHorizontal: 25,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: '600',
    color: '#181725',
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    color: '#7C7C7C',
    fontWeight: '600',
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: '#E2E2E2',
    paddingBottom: 12,
  },
  countryPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  flagIcon: {
    width: 28,
    height: 20,
    borderRadius: 2,
    marginRight: 10,
  },
  countryCode: {
    fontSize: 18,
    fontWeight: '500',
    color: '#030303',
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    color: '#030303',
    fontWeight: '500',
    padding: 0,
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 25,
    paddingBottom: 30, // Khoảng cách đẹp mắt với bàn phím
  },
  floatingButton: {
    width: 67,
    height: 67,
    borderRadius: 33.5,
    // Thêm đổ bóng nhẹ cho nút chuyên nghiệp hơn
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});