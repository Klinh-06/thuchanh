import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, Image, TextInput, 
  FlatList, TouchableOpacity, StatusBar 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Search, SlidersHorizontal, Plus, 
  ShoppingBag, ShoppingCart, Heart, User 
} from 'lucide-react-native';

// Import dữ liệu từ data.js
import { productsData } from './data'; 

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('Egg');

  // Lấy tất cả sản phẩm có liên quan đến "Egg" để hiện đủ danh sách như ảnh thiết kế
  const exploreProducts = productsData.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderProduct = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.imgWrapper}>
        <Image 
          source={item.image} 
          style={styles.img} 
          resizeMode="contain" 
        />
      </View>
      
      <View style={styles.infoWrapper}>
        <Text style={styles.txtName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.txtWeight}>{item.weight}</Text>
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.txtPrice}>${item.price.toFixed(2)}</Text>
        <TouchableOpacity style={styles.btnAdd}>
          <Plus color="#FFF" size={20} strokeWidth={3} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        
        <View style={styles.header}>
          <View style={styles.searchBar}>
            <Search color="#181725" size={20} />
            <TextInput 
              style={styles.input}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search Store"
            />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
            <SlidersHorizontal color="#181725" size={22} style={{ marginLeft: 15 }} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={exploreProducts}
          keyExtractor={item => item.id}
          renderItem={renderProduct}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>

      {/* Menu đáy - Đã sửa lỗi bấm vào Favourite */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuItem}>
          <ShoppingBag color="#181725" size={24} />
          <Text style={styles.menuText}>Shop</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Search color="#53B175" size={24} />
          <Text style={[styles.menuText, { color: '#53B175' }]}>Explore</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Cart')}>
          <ShoppingCart color="#181725" size={24} />
          <Text style={styles.menuText}>Cart</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => navigation.navigate('Favorite')} // Chuyển sang trang Favorurite
        >
          <Heart color="#181725" size={24} />
          <Text style={styles.menuText}>Favourite</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <User color="#181725" size={24} />
          <Text style={styles.menuText}>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 25, marginTop: 10, marginBottom: 20 },
  searchBar: { flex: 1, height: 51.6, backgroundColor: '#F2F3F2', borderRadius: 15, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 },
  input: { flex: 1, marginLeft: 10, fontSize: 16, fontWeight: '600', color: '#181725' },
  listContent: { paddingHorizontal: 15, paddingBottom: 110 },
  card: { width: '46%', height: 250, margin: '2%', padding: 15, borderRadius: 18, borderWidth: 1, borderColor: '#E2E2E2', backgroundColor: '#FFF', justifyContent: 'space-between' },
  imgWrapper: { height: 90, justifyContent: 'center', alignItems: 'center' },
  img: { width: 100, height: 80 },
  txtName: { fontSize: 16, fontWeight: 'bold', color: '#181725' },
  txtWeight: { fontSize: 14, color: '#7C7C7C' },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  txtPrice: { fontSize: 18, fontWeight: '600', color: '#181725' },
  btnAdd: { backgroundColor: '#53B175', width: 45, height: 45, borderRadius: 17, justifyContent: 'center', alignItems: 'center' },
  bottomMenu: { position: 'absolute', bottom: 0, width: '100%', height: 90, backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#F2F3F2', paddingBottom: 20 },
  menuItem: { alignItems: 'center' },
  menuText: { fontSize: 12, marginTop: 4, fontWeight: '600' }
});

export default SearchScreen;