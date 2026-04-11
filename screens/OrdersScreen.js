import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { getOrders } from '../services/storageService';

const OrdersScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      const data = await getOrders();

      setOrders(
        Array.isArray(data)
          ? data.filter(o => o && o.id && o.items)
          : []
      );
    } catch (error) {
      console.log(error);
      setOrders([]);
    }
  };

  useEffect(() => {
    loadOrders();
    const unsubscribe = navigation?.addListener?.('focus', loadOrders);
    return unsubscribe;
  }, [navigation]);

  const renderOrder = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.time}>🕒 {item.createdAt}</Text>

      {item.items.map((p, index) => (
        <View key={index} style={styles.row}>
          <Image source={p.image} style={styles.image} />

          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{p.name}</Text>
            <Text style={styles.qty}>x{p.quantity}</Text>
          </View>

          <Text style={styles.price}>
            ${(p.price * p.quantity).toFixed(2)}
          </Text>
        </View>
      ))}

      <View style={styles.totalRow}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalPrice}>
          ${item.total.toFixed(2)}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ChevronLeft color="#181725" size={28} />
        </TouchableOpacity>
        <Text style={styles.header}>My Orders</Text>
        <View style={styles.backBtn} />
      </View>

      <Text style={styles.countText}>
        Tổng số đơn: <Text style={styles.countNumber}>{orders.length}</Text>
      </Text>

      <FlatList
        data={orders}
        keyExtractor={item => item.id.toString()}
        renderItem={renderOrder}
        ListEmptyComponent={
          <Text style={styles.empty}>Chưa có đơn hàng</Text>
        }
      />
    </SafeAreaView>
  );
};

export default OrdersScreen;

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 5,
  },

  backBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },

  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#181725',
  },

  countText: {
    fontSize: 14,
    color: '#7C7C7C',
    textAlign: 'center',
    marginBottom: 15,
  },

  countNumber: {
    color: '#53B175',
    fontWeight: '700',
    fontSize: 16,
  },

  card: {
    backgroundColor: '#F8F8F8',
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 15,
    borderRadius: 16,
  },

  time: {
    fontSize: 12,
    color: '#777',
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },

  image: {
    width: 45,
    height: 45,
    borderRadius: 10,
    marginRight: 10,
  },

  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#181725',
  },

  qty: {
    fontSize: 12,
    color: '#777',
  },

  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#181725',
  },

  totalRow: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  totalText: {
    fontSize: 14,
    fontWeight: '600',
  },

  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#53B175',
  },

  empty: {
    textAlign: 'center',
    marginTop: 50,
    color: '#777',
  },
};