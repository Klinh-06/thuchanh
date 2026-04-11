import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  X,
  Plus,
  Minus,
  ShoppingBag,
  Search,
  ShoppingCart,
  Heart,
  User,
} from 'lucide-react-native';

import { getCart, saveCart, removeCart } from './services/storageService';
import CheckoutModal from './CheckoutModal';

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [checkoutVisible, setCheckoutVisible] = useState(false);

  // ================= LOAD CART =================
  const loadCart = async () => {
    const data = await getCart();
    setCartItems(data);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadCart();
    });

    return unsubscribe;
  }, [navigation]);

  // ================= UPDATE QUANTITY =================
  const updateQuantity = async (id, type) => {
    const newCart = cartItems.map(item => {
      if (item.id === id) {
        const newQty =
          type === 'plus' ? item.quantity + 1 : item.quantity - 1;

        return {
          ...item,
          quantity: newQty > 0 ? newQty : 1,
        };
      }
      return item;
    });

    setCartItems(newCart);
    await saveCart(newCart);
  };

  // ================= REMOVE ITEM =================
  const removeItem = async (id) => {
    const newCart = cartItems.filter(item => item.id !== id);
    setCartItems(newCart);
    await saveCart(newCart);
  };

  // ================= TOTAL =================
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ================= CHECKOUT =================
  const handleCheckout = async () => {
    setCheckoutVisible(false);

    await removeCart();
    setCartItems([]);

    navigation.navigate('OrderAccepted');
  };

  // ================= RENDER ITEM =================
  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.rowBetween}>
          <Text style={styles.itemName}>{item.name}</Text>

          <TouchableOpacity onPress={() => removeItem(item.id)}>
            <X color="#B3B3B3" size={20} />
          </TouchableOpacity>
        </View>

        <Text style={styles.itemWeight}>{item.weight}</Text>

        <View style={styles.rowBetween}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => updateQuantity(item.id, 'minus')}>
              <Minus color="#53B175" size={20} />
            </TouchableOpacity>

            <Text style={styles.quantityText}>{item.quantity}</Text>

            <TouchableOpacity onPress={() => updateQuantity(item.id, 'plus')}>
              <Plus color="#53B175" size={20} />
            </TouchableOpacity>
          </View>

          <Text style={styles.itemPrice}>
            ${(item.price * item.quantity).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={styles.headerTitle}>My Cart</Text>
        <View style={styles.separator} />

        {cartItems.length === 0 ? (
          <Text style={styles.emptyText}>Cart is empty</Text>
        ) : (
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 150 }}
          />
        )}

        {cartItems.length > 0 && (
          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={() => setCheckoutVisible(true)}
          >
            <Text style={styles.checkoutText}>Go to Checkout</Text>
            <Text style={styles.priceTagText}>
              ${totalPrice.toFixed(2)}
            </Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>

      {/* CHECKOUT MODAL */}
      <CheckoutModal
        visible={checkoutVisible}
        onClose={() => setCheckoutVisible(false)}
        totalPrice={totalPrice}
        navigation={navigation}
        onPlaceOrder={handleCheckout} // 🔥 chuẩn
      />

      {/* BOTTOM MENU */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.menuItem}>
          <ShoppingBag color="#181725" size={24} />
          <Text style={styles.menuText}>Shop</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Explore')} style={styles.menuItem}>
          <Search color="#181725" size={24} />
          <Text style={styles.menuText}>Explore</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <ShoppingCart color="#53B175" size={24} />
          <Text style={[styles.menuText, { color: '#53B175' }]}>Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Favorite')} style={styles.menuItem}>
          <Heart color="#181725" size={24} />
          <Text style={styles.menuText}>Favourite</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Account')} style={styles.menuItem}>
          <User color="#181725" size={24} />
          <Text style={styles.menuText}>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;

/* ================= STYLE ================= */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
  },

  separator: {
    height: 1,
    backgroundColor: '#F2F3F2',
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#7C7C7C',
    fontSize: 16,
  },

  cartItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F3F2',
  },

  imageContainer: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },

  detailsContainer: {
    flex: 1,
    marginLeft: 15,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#181725',
  },

  itemWeight: {
    fontSize: 13,
    color: '#7C7C7C',
    marginVertical: 5,
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: '600',
  },

  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  checkoutBtn: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    height: 60,
    backgroundColor: '#53B175',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  checkoutText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },

  priceTagText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  bottomMenu: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F2F3F2',
  },

  menuItem: {
    alignItems: 'center',
  },

  menuText: {
    fontSize: 12,
    marginTop: 3,
  },
});