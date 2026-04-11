import AsyncStorage from '@react-native-async-storage/async-storage';

const ORDER_KEY = 'ORDES';

// ================= GET ORDERS =================
export const getOrders = async () => {
  try {
    const data = await AsyncStorage.getItem(ORDER_KEY);

    // luôn parse JSON an toàn
    const orders = data ? JSON.parse(data) : [];

    return orders;
  } catch (error) {
    console.log('GET ORDERS ERROR:', error);
    return [];
  }
};

// ================= SAVE ORDER =================
export const saveOrder = async (newOrder) => {
  try {
    const oldOrders = await getOrders();

    const updatedOrders = [
      {
        ...newOrder,
        id: newOrder.id || Date.now(),
        createdAt: newOrder.createdAt || new Date().toISOString(),
      },
      ...oldOrders,
    ];

    await AsyncStorage.setItem(
      ORDER_KEY,
      JSON.stringify(updatedOrders)
    );

    return updatedOrders;
  } catch (error) {
    console.log('SAVE ORDER ERROR:', error);
    return [];
  }
};

// ================= CLEAR ORDERS =================
export const clearOrders = async () => {
  try {
    await AsyncStorage.removeItem(ORDER_KEY);
    return true;
  } catch (error) {
    console.log('CLEAR ORDERS ERROR:', error);
    return false;
  }
};