import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  Alert
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ChevronLeft,
  Share,
  Heart,
  Minus,
  Plus,
  ChevronRight,
  Star
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function ProductDetail({ navigation, route }) {

  const params = route?.params ?? {};

  const name = params.name ?? "Natural Apple";
  const price = params.price ?? "$4.99";
  const image = params.image ?? require('./assets/tao.png');

  const [qty, setQty] = useState(1);
  const [fav, setFav] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* IMAGE */}
        <View style={styles.imageBox}>

          <SafeAreaView style={styles.topBar}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ChevronLeft color="#000" size={28} />
            </TouchableOpacity>

            <TouchableOpacity>
              <Share color="#000" size={24} />
            </TouchableOpacity>
          </SafeAreaView>

          <Image source={image} style={styles.img} resizeMode="contain" />

        </View>

        {/* CONTENT */}
        <View style={styles.content}>

          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{name}</Text>
              <Text style={styles.sub}>1kg, Price</Text>
            </View>

            <TouchableOpacity onPress={() => setFav(!fav)}>
              <Heart
                color={fav ? "#F3603F" : "#999"}
                fill={fav ? "#F3603F" : "none"}
                size={24}
              />
            </TouchableOpacity>
          </View>

          {/* QUANTITY + PRICE */}
          <View style={styles.row2}>

            <View style={styles.qtyBox}>
              <TouchableOpacity onPress={() => qty > 1 && setQty(qty - 1)}>
                <Minus color="#53B175" size={24} />
              </TouchableOpacity>

              <Text style={styles.qty}>{qty}</Text>

              <TouchableOpacity onPress={() => setQty(qty + 1)}>
                <Plus color="#53B175" size={24} />
              </TouchableOpacity>
            </View>

            <Text style={styles.price}>{price}</Text>

          </View>

          <View style={styles.line} />

          {/* DETAIL */}
          <Text style={styles.section}>Product Detail</Text>
          <Text style={styles.desc}>
            Apples are nutritious fruit that helps health and weight loss.
          </Text>

          {/* NUTRITION */}
          <View style={styles.accordion}>
            <Text style={styles.section}>Nutrition</Text>
            <ChevronRight color="#181725" size={20} />
          </View>

          {/* REVIEW */}
          <View style={styles.accordion}>
            <Text style={styles.section}>Review</Text>
            <View style={{ flexDirection: 'row' }}>
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={14} color="#F3603F" fill="#F3603F" />
              ))}
            </View>
          </View>

          {/* BUTTON */}
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              Alert.alert("Thành công", "Đã thêm sản phẩm vào giỏ 🛒");
            }}
          >
            <Text style={styles.btnText}>Add To Basket</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </View>
  );
}

/* ================= STYLE ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  imageBox: {
    width: width,
    height: height * 0.4,
    backgroundColor: '#F2F3F2',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  topBar: {
    position: 'absolute',
    top: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10,
  },

  img: {
    width: width * 0.7,
    height: '60%',
  },

  content: {
    padding: 25,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#181725',
  },

  sub: {
    color: '#7C7C7C',
    marginTop: 5,
  },

  qtyBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  qty: {
    marginHorizontal: 15,
    fontSize: 18,
    fontWeight: '600',
  },

  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#181725',
  },

  line: {
    height: 1,
    backgroundColor: '#E2E2E2',
    marginVertical: 20,
  },

  section: {
    fontSize: 16,
    fontWeight: '600',
    color: '#181725',
  },

  desc: {
    fontSize: 13,
    color: '#7C7C7C',
    marginTop: 10,
    lineHeight: 20,
  },

  accordion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
  },

  btn: {
    backgroundColor: '#53B175',
    height: 65,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },

  btnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});