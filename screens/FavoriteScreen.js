import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ChevronRight,
  ShoppingBag,
  Search,
  ShoppingCart,
  Heart,
  User
} from 'lucide-react-native';

import { productsData } from '../data';
import ErrorModal from '../components/Error';

const FavoriteScreen = ({ navigation }) => {
  const [errorVisible, setErrorVisible] = useState(false);

  const favoriteItems = productsData.filter(item =>
    ['Sprite Can', 'Diet Coke', 'Apple & Grape Juice', 'Coca Cola Can', 'Pepsi Can']
      .includes(item.name)
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemRow}>
      <View style={styles.imageBox}>
        <Image source={item.image} style={styles.itemImage} resizeMode="contain" />
      </View>

      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemWeight}>{item.weight}</Text>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        <ChevronRight color="#181725" size={20} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView style={{ flex: 1 }}>
        <Text style={styles.headerTitle}>Favourite</Text>
        <View style={styles.line} />

        <FlatList
          data={favoriteItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={{ paddingBottom: 180 }}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setErrorVisible(true)}
        >
          <Text style={styles.addButtonText}>Add All To Cart</Text>
        </TouchableOpacity>
      </SafeAreaView>

      {/* MODAL */}
      <ErrorModal
        visible={errorVisible}
        onClose={() => setErrorVisible(false)}
        navigation={navigation}
      />

      {/* BOTTOM MENU */}
      <View style={styles.bottomMenu}>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
          <ShoppingBag color="#181725" size={24} />
          <Text style={styles.menuText}>Shop</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Explore')}>
          <Search color="#181725" size={24} />
          <Text style={styles.menuText}>Explore</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Cart')}>
          <ShoppingCart color="#181725" size={24} />
          <Text style={styles.menuText}>Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Heart color="#53B175" size={24} />
          <Text style={[styles.menuText, { color: '#53B175' }]}>Favourite</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Account')}>
          <User color="#181725" size={24} />
          <Text style={styles.menuText}>Account</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default FavoriteScreen;

/* ===================== STYLE ===================== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#181725'
  },

  line: {
    height: 1,
    backgroundColor: '#F2F3F2'
  },

  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    height: 95
  },

  imageBox: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },

  itemImage: {
    width: '100%',
    height: '100%'
  },

  itemInfo: {
    flex: 1,
    marginLeft: 15
  },

  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#181725'
  },

  itemWeight: {
    fontSize: 14,
    color: '#7C7C7C',
    marginTop: 4
  },

  rightSection: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
    color: '#181725'
  },

  separator: {
    height: 1,
    backgroundColor: '#F2F3F2',
    marginHorizontal: 20
  },

  addButton: {
    position: 'absolute',
    bottom: 100,
    left: 25,
    right: 25,
    height: 60,
    backgroundColor: '#53B175',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600'
  },

  bottomMenu: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 90,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F2F3F2',
    paddingBottom: 20
  },

  menuItem: {
    alignItems: 'center'
  },

  menuText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600'
  }
});