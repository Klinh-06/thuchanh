import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { X } from 'lucide-react-native';

const ErrorModal = ({ visible, onClose, navigation }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Nút X đóng Modal */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <X color="#181725" size={24} />
          </TouchableOpacity>

          {/* Ảnh túi đồ ăn lỗi fail.png */}
          <Image 
            source={require('./assets/fail.png')} 
            style={styles.image} 
            resizeMode="contain" 
          />

          <View style={styles.textContainer}>
            <Text style={styles.title}>Oops! Order Failed</Text>
            <Text style={styles.subtitle}>Something went tembly wrong.</Text>
          </View>

          {/* Nút Please Try Again - Đóng modal để thử lại */}
          <TouchableOpacity style={styles.actionBtn} onPress={onClose}>
            <Text style={styles.actionBtnText}>Please Try Again</Text>
          </TouchableOpacity>

          {/* Nút Back to home - Quay về màn hình Favorite */}
          <TouchableOpacity 
            style={styles.backBtn} 
            onPress={() => {
              onClose(); // Đóng modal trước
              navigation.navigate('Favorite'); // Quay về màn hình Yêu thích
            }}
          >
            <Text style={styles.backBtnText}>Back to home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 364,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
  },
  closeBtn: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  image: {
    width: 222,
    height: 222,
    marginBottom: 30,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 28,
    fontWeight: '600',
    color: '#181725',
    textAlign: 'center',
    lineHeight: 28,
  },
  subtitle: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 16,
    fontWeight: '400',
    color: '#7C7C7C',
    textAlign: 'center',
    lineHeight: 21,
    marginTop: 15,
  },
  actionBtn: {
    width: 313,
    height: 67,
    backgroundColor: '#53B175',
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Gilroy-SemiBold',
  },
  backBtn: {
    marginTop: 20,
    paddingVertical: 10,
  },
  backBtnText: {
    color: '#181725',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Gilroy-SemiBold',
  },
});

export default ErrorModal;