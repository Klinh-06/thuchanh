import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Search,
  ShoppingBag,
  ShoppingCart,
  Heart,
  User
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const categories = [
  { name: 'Fresh Fruits\n& Vegetable', image: require('../assets/raucu.png'), color: '#EEF8F2', border: '#53B175' },
  { name: 'Cooking Oil\n& Ghee', image: require('../assets/dau.png'), color: '#FFF6EE', border: '#F8A44C' },
  { name: 'Meat & Fish', image: require('../assets/thit.png'), color: '#FDE9E7', border: '#F7A593' },
  { name: 'Bakery & Snacks', image: require('../assets/banh_mi.png'), color: '#F4EBF7', border: '#D3B0E0' },
  { name: 'Dairy & Eggs', image: require('../assets/trung.png'), color: '#FFF9E5', border: '#FDE598' },
  { name: 'Beverages', image: require('../assets/nuoc_ngot.png'), color: '#EDF7FC', border: '#B7DFF5' },
];

const ExploreScreen = ({ navigation }) => {

  const MenuItem = ({ label, Icon, screen, active }) => {
    return (
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate(screen)}
      >
        <Icon
          color={active ? '#53B175' : '#181725'}
          size={24}
          strokeWidth={active ? 2.5 : 2}
        />
        <Text style={[styles.txtMenu, { color: active ? '#53B175' : '#181725' }]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>

        {/* HEADER */}
        <Text style={styles.headerTitle}>Find Products</Text>

        {/* SEARCH */}
        <View style={styles.searchWrapper}>
          <View style={styles.searchBox}>
            <Search color="#181725" size={20} />
            <TextInput
              placeholder="Search Store"
              placeholderTextColor="#7C7C7C"
              style={styles.searchInput}
            />
          </View>
        </View>

        {/* CATEGORY GRID */}
        <ScrollView
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
        >
          {categories.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.card,
                { backgroundColor: item.color, borderColor: item.border }
              ]}
              onPress={() => navigation.navigate('Beverages')}
            >
              <Image source={item.image} style={styles.catImage} resizeMode="contain" />
              <Text style={styles.catName}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

      </SafeAreaView>

      {/* BOTTOM MENU */}
      <View style={styles.bottomMenu}>

        <MenuItem label="Shop" Icon={ShoppingBag} screen="Home" active={false} />
        <MenuItem label="Explore" Icon={Search} screen="Explore" active={true} />
        <MenuItem label="Cart" Icon={ShoppingCart} screen="Cart" active={false} />
        <MenuItem label="Favourite" Icon={Heart} screen="Favorite" active={false} />
        <MenuItem label="Account" Icon={User} screen="Account" active={false} />

      </View>
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#FFF' },
  safeArea: { flex: 1 },

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
    color: '#181725'
  },

  searchWrapper: { paddingHorizontal: 25, marginTop: 15 },

  searchBox: {
    height: 52,
    backgroundColor: '#F2F3F2',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14
  },

  grid: {
    paddingHorizontal: 25,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 110
  },

  card: {
    width: (width - 65) / 2,
    height: 190,
    borderRadius: 18,
    borderWidth: 1,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },

  catImage: { width: 95, height: 75, marginBottom: 15 },

  catName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#181725',
    textAlign: 'center'
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

  menuItem: { alignItems: 'center' },

  txtMenu: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600'
  }
});