import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, Image, TextInput, 
  ScrollView, TouchableOpacity, Dimensions, StatusBar, Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ShoppingBag, Search, ShoppingCart, Heart, User, MapPin, Plus } from 'lucide-react-native';

// 🔥 IMPORT STORAGE
import { getCart, saveCart } from '../services/storageService';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Shop');

  const hinhAnh = {
    logo_ca_rot: require('../assets/carrot.png'),
    anh_banner: require('../assets/banner.png'),
    chuoi_huu_co: require('../assets/chuoi.png'),
    tao_do: require('../assets/tao.png'),
    ot_chuong_do: require('../assets/ot.png'),
    gung_tuoi: require('../assets/gung.png'),
  };

  // 🔥 ADD TO CART
  const addToCart = async (product) => {
    try {
      let cart = await getCart();
      if (!cart) cart = [];

      const existing = cart.find(item => item.name === product.name);

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          ...product,
          id: Date.now(),
          quantity: 1,
        });
      }

      await saveCart(cart);

      // 🔥 thông báo nhẹ
      Alert.alert("✅", "Đã thêm vào giỏ");
    } catch (error) {
      console.log("ADD CART ERROR:", error);
    }
  };

  const ProductCard = ({ image, name, weight, price }) => (
    <TouchableOpacity
      style={styles.cardProduct}
      activeOpacity={0.85}
      onPress={() =>
        navigation.navigate('ProductDetail', { name, weight, price, image })
      }
    >
      <View style={styles.imgWrapper}>
        <Image source={image} style={styles.imgProduct} resizeMode="contain" />
      </View>

      <View style={styles.infoWrapper}>
        <Text style={styles.txtName} numberOfLines={1}>{name}</Text>
        <Text style={styles.txtWeight}>{weight}</Text>
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.txtPrice}>{price}</Text>

        <TouchableOpacity
          style={styles.btnPlus}
          onPress={(e) => {
            e.stopPropagation?.();
            addToCart({
              name,
              weight,
              price: parseFloat(price.replace('$', '')),
              image,
            });
          }}
        >
          <Plus color="#FFF" size={22} strokeWidth={3} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const MenuItem = ({ name, IconComponent, destination }) => {
    const isActive = activeTab === name;
    const color = isActive ? '#53B175' : '#181725';

    const handlePress = () => {
      setActiveTab(name);
      if (destination) {
        navigation.navigate(destination);
      }
    };

    return (
      <TouchableOpacity style={styles.menuItem} onPress={handlePress}>
        <IconComponent color={color} size={24} strokeWidth={isActive ? 2.5 : 2} />
        <Text style={[styles.txtMenu, { color }]}>{name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
          
          {/* HEADER */}
          <View style={styles.header}>
            <Image source={hinhAnh.logo_ca_rot} style={styles.iconCarrotLogo} />
            <View style={styles.locationWrapper}>
              <MapPin color="#4C4F4D" size={20} />
              <Text style={styles.locationText}>Dhaka, Banassre</Text>
            </View>
          </View>

          {/* STUDENT INFO */}
          <View style={styles.studentBox}>
            <Text style={styles.studentName}>Nguyễn Thị Khánh Linh</Text>
            <Text style={styles.studentMssv}>MSSV: 23810310394</Text>
          </View>

          {/* SEARCH */}
          <View style={styles.searchBox}>
            <Search color="#181725" size={20} />
            <TextInput 
              placeholder="Search Store" 
              placeholderTextColor="#7C7C7C"
              style={styles.searchInput} 
            />
          </View>

          {/* BANNER */}
          <Image source={hinhAnh.anh_banner} style={styles.banner} resizeMode="stretch" />

          {/* EXCLUSIVE */}
          <Section title="Exclusive Offer" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollHorizontal}>
            <ProductCard image={hinhAnh.chuoi_huu_co} name="Organic Bananas" weight="7pcs, Price" price="$4.99" />
            <ProductCard image={hinhAnh.tao_do} name="Red Apple" weight="1kg, Price" price="$4.99" />
          </ScrollView>

          {/* BEST SELLING */}
          <Section title="Best Selling" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollHorizontal}>
            <ProductCard image={hinhAnh.ot_chuong_do} name="Bell Pepper Red" weight="1kg, Price" price="$4.99" />
            <ProductCard image={hinhAnh.gung_tuoi} name="Ginger" weight="250g, Price" price="$4.99" />
          </ScrollView>

        </ScrollView>
      </SafeAreaView>

      {/* MENU */}
      <View style={styles.bottomMenu}>
        <MenuItem name="Shop" IconComponent={ShoppingBag} destination="Home" />
        <MenuItem name="Explore" IconComponent={Search} destination="Explore" />
        <MenuItem name="Cart" IconComponent={ShoppingCart} destination="Cart" />
        <MenuItem name="Favourite" IconComponent={Heart} destination="Favorite" />
        <MenuItem name="Account" IconComponent={User} destination="Account" />
      </View>
    </View>
  );
};

const Section = ({ title }) => (
  <View style={styles.sectionTitleRow}>
    <Text style={styles.txtTitle}>{title}</Text>
    <TouchableOpacity>
      <Text style={styles.txtSeeAll}>See all</Text>
    </TouchableOpacity>
  </View>
);

/* ===== STYLE GIỮ NGUYÊN ===== */
const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#FFF' },
  safeArea: { flex: 1 },

  header: { alignItems: 'center', marginTop: 10 },
  iconCarrotLogo: { width: 30, height: 35 },

  locationWrapper: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  locationText: { fontSize: 18, fontWeight: '600', color: '#4C4F4D', marginLeft: 5 },

  studentBox: {
    marginHorizontal: 25,
    marginTop: 10,
    marginBottom: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#EEF8F2',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#53B175',
  },
  studentName: { fontSize: 15, fontWeight: '700', color: '#181725' },
  studentMssv: { fontSize: 13, color: '#53B175', marginTop: 2, fontWeight: '600' },

  searchBox: { 
    backgroundColor: '#F2F3F2',
    height: 52,
    marginHorizontal: 25,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 20 
  },

  searchInput: { flex: 1, marginLeft: 10, fontSize: 14 },

  banner: {
    width: width - 50,
    height: 115,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 15
  },

  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginTop: 25
  },

  txtTitle: { fontSize: 24, fontWeight: 'bold', color: '#181725' },
  txtSeeAll: { color: '#53B175', fontSize: 16, fontWeight: '600' },

  scrollHorizontal: { paddingLeft: 25, marginTop: 15 },

  cardProduct: { 
    width: 173,
    height: 250,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 18,
    padding: 15,
    marginRight: 15,
    justifyContent: 'space-between'
  },

  imgWrapper: { height: 90, justifyContent: 'center', alignItems: 'center' },
  imgProduct: { width: '100%', height: '100%' },

  infoWrapper: { marginTop: 10 },

  txtName: { fontSize: 16, fontWeight: 'bold', color: '#181725' },
  txtWeight: { fontSize: 14, color: '#7C7C7C', marginTop: 3 },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  txtPrice: { fontSize: 18, fontWeight: 'bold', color: '#181725' },

  btnPlus: { 
    backgroundColor: '#53B175',
    width: 45,
    height: 45,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center'
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
    paddingBottom: 15
  },

  menuItem: { alignItems: 'center' },
  txtMenu: { fontSize: 12, marginTop: 4, fontWeight: '600' }
});

export default HomeScreen;