import React from 'react';
import { 
  View, Text, StyleSheet, Image, ScrollView, 
  TouchableOpacity, Dimensions, SafeAreaView, StatusBar
} from 'react-native';
import { ChevronLeft, SlidersHorizontal, Plus } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const beveragesData = [
  { id: 1, name: 'Diet Coke', weight: '355ml', price: '$1.99', image: require('./assets/coke.png') },
  { id: 2, name: 'Sprite Can', weight: '325ml', price: '$1.50', image: require('./assets/sprite.png') },
  { id: 3, name: 'Apple & Grape Juice', weight: '2L', price: '$15.99', image: require('./assets/appjuice.png') },
  { id: 4, name: 'Orange Juice', weight: '2L', price: '$15.99', image: require('./assets/orange_juice.png') },
  { id: 5, name: 'Coca Cola Can', weight: '325ml', price: '$4.99', image: require('./assets/coca.png') },
  { id: 6, name: 'Pepsi Can', weight: '330ml', price: '$4.99', image: require('./assets/pepsi.png') },
];

const BeveragesScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" translucent={false} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5 }}>
          <ChevronLeft color="#181725" size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Beverages</Text>
        <TouchableOpacity style={{ padding: 5 }}>
          <SlidersHorizontal color="#181725" size={24} />
        </TouchableOpacity>
      </View>

      {/* Grid Content */}
      <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
        {beveragesData.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.imgWrap}>
              {/* ✅ CẬP NHẬT: Kích thước ảnh chuẩn 93.2 x 93.2 cho tất cả đồ uống */}
              <Image source={item.image} style={styles.productImg} resizeMode="contain" />
            </View>
            
            <View>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productWeight}>{item.weight}, Price</Text>
            </View>
            
            <View style={styles.cardFooter}>
              <Text style={styles.productPrice}>{item.price}</Text>
              <TouchableOpacity style={styles.plusBtn} activeOpacity={0.7}>
                <Plus color="#FFF" size={24} strokeWidth={3} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F3F2',
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#181725' },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  card: {
    width: (width - 55) / 2,
    height: 250,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 18,
    padding: 15,
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  imgWrap: { height: 100, alignItems: 'center', justifyContent: 'center' },
  
  // ✅ CẬP NHẬT: Chiều rộng và chiều cao ảnh là 93.2
  productImg: { 
    width: 93.2, 
    height: 93.2 
  }, 

  productName: {
    fontSize: 16,
    lineHeight: 18,
    color: '#181725',
    fontWeight: 'bold', // Gilroy-Bold
    letterSpacing: 0.1,
    marginTop: 10,
  },
  productWeight: {
    fontSize: 14,
    lineHeight: 18,
    color: '#7C7C7C',
    fontWeight: '500', // Gilroy-Medium
    marginTop: 3,
  },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  productPrice: {
    fontSize: 18,
    fontWeight: '600', // Gilroy Semibold
    color: '#181725',
    letterSpacing: 0.1,
  },
  plusBtn: {
    backgroundColor: '#53B175',
    width: 45,
    height: 45,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BeveragesScreen;