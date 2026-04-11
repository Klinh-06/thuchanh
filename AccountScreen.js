import React, { useEffect, useState } from 'react';
import { 
  View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, StatusBar 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, LogOut, ShoppingBag, Search, ShoppingCart, Heart, User } from 'lucide-react-native';

import { getUser } from './services/storageService';

const AccountScreen = ({ navigation, onLogout }) => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const data = await getUser();
      setUser(data);
    };

    loadUser();
  }, []);

  const menuItems = [
    { id: '1', title: 'Orders', icon: require('./assets/order.png') },
    { id: '2', title: 'My Details', icon: require('./assets/detail.png') },
    { id: '3', title: 'Delivery Address', icon: require('./assets/address.png') },
    { id: '4', title: 'Payment Methods', icon: require('./assets/payment.png') },
    { id: '5', title: 'Promo Card', icon: require('./assets/card.png') },
    { id: '6', title: 'Notifications', icon: require('./assets/noti.png') },
    { id: '7', title: 'Help', icon: require('./assets/help.png') },
    { id: '8', title: 'About', icon: require('./assets/about.png') },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>

        <ScrollView contentContainerStyle={styles.scrollContent}>

          {/* HEADER */}
          <View style={styles.header}>
            <Image source={require('./assets/avt.png')} style={styles.avatar} />
            <View style={styles.userInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.userName}>
                  {user?.name || 'Guest'}
                </Text>
                <TouchableOpacity>
                  <Text style={styles.editIcon}>✎</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.userEmail}>
                {user?.email || 'No email'}
              </Text>
            </View>
          </View>

          <View style={styles.topDivider} />

          {/* MENU */}
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.menuItem}
              onPress={() => {
                if (item.title === 'Orders') {
                  navigation.navigate('Orders'); // 🔥 FIX
                }
              }}
            >
              <View style={styles.menuLeft}>
                <Image source={item.icon} style={styles.iconImage} />
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              <ChevronRight color="#181725" size={20} />
            </TouchableOpacity>
          ))}

          {/* LOG OUT */}
          <TouchableOpacity 
            style={styles.logOutBtn}
            onPress={async () => {
              console.log('Logging out...');
              await onLogout();
            }}
          >
            <View style={styles.logOutContent}>
              <LogOut color="#53B175" size={22} style={styles.logOutIcon} />
              <Text style={styles.logOutText}>Log Out</Text>
            </View>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>

      {/* BOTTOM MENU */}
      <View style={styles.bottomMenu}>

        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.menuBottom}>
          <ShoppingBag color="#181725" size={24}/>
          <Text style={styles.menuText}>Shop</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Explore')} style={styles.menuBottom}>
          <Search color="#181725" size={24}/>
          <Text style={styles.menuText}>Explore</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.menuBottom}>
          <ShoppingCart color="#181725" size={24}/>
          <Text style={styles.menuText}>Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Favorite')} style={styles.menuBottom}>
          <Heart color="#181725" size={24}/>
          <Text style={styles.menuText}>Favourite</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Account')} style={styles.menuBottom}>
          <User color="#53B175" size={24}/>
          <Text style={[styles.menuText, {color:'#53B175'}]}>Account</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  scrollContent: { paddingBottom: 120 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 20,
    marginTop: 10
  },

  avatar: { width: 64, height: 64, borderRadius: 27 },
  userInfo: { marginLeft: 20 },

  nameRow: { flexDirection: 'row', alignItems: 'center' },

  userName: { fontSize: 20, color: '#181725' },
  editIcon: { color: '#53B175', fontSize: 18, marginLeft: 10 },

  userEmail: { fontSize: 16, color: '#7C7C7C', marginTop: 4 },

  topDivider: { height: 1, backgroundColor: '#F2F3F2' },

  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F3F2'
  },

  menuLeft: { flexDirection: 'row', alignItems: 'center' },

  iconImage: { width: 20, height: 20 },

  menuTitle: { marginLeft: 20, fontSize: 18, color: '#181725' },

  logOutBtn: {
    width: 364,
    height: 67,
    backgroundColor: '#F2F3F2',
    borderRadius: 19,
    alignSelf: 'center',
    marginTop: 30,
    justifyContent: 'center'
  },

  logOutContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  logOutIcon: { position: 'absolute', left: 25 },

  logOutText: {
    color: '#53B175',
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

  menuBottom: { alignItems: 'center' },

  menuText: { fontSize: 12, marginTop: 4 }
});

export default AccountScreen;