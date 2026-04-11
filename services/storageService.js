import AsyncStorage from '@react-native-async-storage/async-storage';

/* ===================== KEYS ===================== */
const USER_KEY = 'USER';
const CART_KEY = 'CART';
const ORDER_KEY = 'ORDERS';

/* ===================== AUTH ===================== */
export const saveUser = async (user) => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (err) {
    console.log('saveUser error:', err);
  }
};

export const getUser = async () => {
  try {
    const data = await AsyncStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.log('getUser error:', err);
    return null;
  }
};

export const removeUser = async () => {
  try {
    await AsyncStorage.multiRemove([USER_KEY, CART_KEY, ORDER_KEY]);
  } catch (err) {
    console.log('removeUser error:', err);
  }
};

/* ===================== CART ===================== */
export const getCart = async () => {
  try {
    const data = await AsyncStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.log('getCart error:', err);
    return [];
  }
};

export const saveCart = async (cart) => {
  try {
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (err) {
    console.log('saveCart error:', err);
  }
};

// 🔥 THÊM CÁI NÀY (QUAN TRỌNG)
export const removeCart = async () => {
  try {
    await AsyncStorage.removeItem(CART_KEY);
  } catch (err) {
    console.log('removeCart error:', err);
  }
};

/* ===================== ORDERS ===================== */
export const getOrders = async () => {
  try {
    const data = await AsyncStorage.getItem(ORDER_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.log('getOrders error:', err);
    return [];
  }
};

// Order schema: { id, createdAt, items, total }
export const saveOrder = async ({ items, total }) => {
  try {
    const oldOrders = await getOrders();

    const newOrder = {
      id: Date.now(),
      createdAt: new Date().toLocaleString(),
      items,
      total,
    };

    const newOrders = [newOrder, ...oldOrders];

    await AsyncStorage.setItem(ORDER_KEY, JSON.stringify(newOrders));
    return newOrder;
  } catch (err) {
    console.log('saveOrder error:', err);
    return null;
  }
};