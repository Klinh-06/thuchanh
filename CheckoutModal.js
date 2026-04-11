import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable
} from 'react-native';
import { X, ChevronRight } from 'lucide-react-native';

// ================= ROW ITEM =================
const CheckoutRow = ({ label, value, isPayment }) => (
  <View style={styles.rowItem}>
    <Text style={styles.rowLabel}>{label}</Text>

    <View style={styles.rowRight}>
      {isPayment ? (
        <View style={styles.cardIconPlaceholder} />
      ) : (
        <Text style={styles.rowValue}>{value}</Text>
      )}
      <ChevronRight color="#181725" size={20} />
    </View>
  </View>
);

// ================= MAIN MODAL =================
const CheckoutModal = ({
  visible,
  onClose,
  totalPrice,
  onPlaceOrder,
}) => {
  const safeTotal = totalPrice || 0;

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>

        {/* CLICK OUTSIDE TO CLOSE */}
        <Pressable style={styles.modalSpacer} onPress={onClose} />

        <View style={styles.modalContent}>

          {/* HEADER */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Checkout</Text>
            <TouchableOpacity onPress={onClose}>
              <X color="#181725" size={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.separator} />

          {/* ROWS */}
          <View style={styles.checkoutRows}>
            <CheckoutRow label="Delivery" value="Select Method" />
            <CheckoutRow label="Payment" value="MasterCard" isPayment />
            <CheckoutRow label="Promo Code" value="Pick discount" />
            <CheckoutRow
              label="Total Cost"
              value={`$${safeTotal.toFixed(2)}`}
            />
          </View>

          {/* TERMS */}
          <Text style={styles.termsText}>
            By placing an order you agree to our
            <Text style={styles.termsBold}> Terms And Conditions</Text>
          </Text>

          {/* BUTTON */}
          <TouchableOpacity
            style={[
              styles.placeOrderBtn,
              { opacity: safeTotal > 0 ? 1 : 0.5 }
            ]}
            onPress={onPlaceOrder}
            disabled={safeTotal <= 0}
          >
            <Text style={styles.placeOrderText}>Place Order</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

export default CheckoutModal;

// ================= STYLE =================
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end'
  },

  modalSpacer: {
    flex: 1
  },

  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    paddingBottom: 40
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#181725'
  },

  separator: {
    height: 1,
    backgroundColor: '#F2F3F2',
    marginVertical: 20
  },

  checkoutRows: {},

  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F3F2'
  },

  rowLabel: {
    fontSize: 16,
    color: '#7C7C7C',
    fontWeight: '600'
  },

  rowRight: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  rowValue: {
    fontSize: 16,
    color: '#181725',
    fontWeight: '600',
    marginRight: 10
  },

  cardIconPlaceholder: {
    width: 30,
    height: 18,
    backgroundColor: '#181725',
    borderRadius: 4,
    marginRight: 10
  },

  termsText: {
    fontSize: 13,
    color: '#7C7C7C',
    marginTop: 20,
    lineHeight: 18
  },

  termsBold: {
    fontWeight: '600',
    color: '#181725'
  },

  placeOrderBtn: {
    height: 65,
    backgroundColor: '#53B175',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25
  },

  placeOrderText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600'
  }
});