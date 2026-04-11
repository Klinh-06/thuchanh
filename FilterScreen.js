import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { X, Check } from 'lucide-react-native';

const FilterOption = ({ label, isSelected, onSelect }) => (
  <TouchableOpacity style={styles.optionRow} onPress={onSelect}>
    <View style={[styles.checkbox, isSelected && styles.checkboxActive]}>
      {isSelected && <Check color="#FFF" size={12} strokeWidth={4} />}
    </View>
    <Text style={[styles.optionText, isSelected && styles.optionTextActive]}>{label}</Text>
  </TouchableOpacity>
);

const FilterScreen = ({ navigation }) => {
  const [categories, setCategories] = useState({ eggs: true, noodles: false, chips: false, fastFood: false });
  const [brands, setBrands] = useState({ individual: false, cocola: true, ifad: false, kazi: false });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <X color="#181725" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filters</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FilterOption label="Eggs" isSelected={categories.eggs} onSelect={() => setCategories({...categories, eggs: !categories.eggs})} />
          <FilterOption label="Noodles & Pasta" isSelected={categories.noodles} onSelect={() => setCategories({...categories, noodles: !categories.noodles})} />
          <FilterOption label="Chips & Crisps" isSelected={categories.chips} onSelect={() => setCategories({...categories, chips: !categories.chips})} />
          <FilterOption label="Fast Food" isSelected={categories.fastFood} onSelect={() => setCategories({...categories, fastFood: !categories.fastFood})} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Brand</Text>
          <FilterOption label="Individual Collection" isSelected={brands.individual} onSelect={() => setBrands({...brands, individual: !brands.individual})} />
          <FilterOption label="Cocola" isSelected={brands.cocola} onSelect={() => setBrands({...brands, cocola: !brands.cocola})} />
          <FilterOption label="Ifad" isSelected={brands.ifad} onSelect={() => setBrands({...brands, ifad: !brands.ifad})} />
          <FilterOption label="Kazi Farmas" isSelected={brands.kazi} onSelect={() => setBrands({...brands, kazi: !brands.kazi})} />
        </View>
      </ScrollView>

      {/* Nút Apply Filter với thông số chính xác */}
      <TouchableOpacity 
        style={styles.applyButton} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.applyButtonText}>Apply Filter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
    paddingHorizontal: 25, paddingTop: 60, paddingBottom: 20 
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#181725' },
  content: { flex: 1, backgroundColor: '#F2F3F2', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25 },
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 24, fontWeight: '600', color: '#181725', marginBottom: 20 },
  optionRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  checkbox: { width: 24, height: 24, borderRadius: 8, borderWidth: 1.5, borderColor: '#B1B1B1', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  checkboxActive: { backgroundColor: '#53B175', borderColor: '#53B175' },
  optionText: { fontSize: 16, color: '#181725' },
  optionTextActive: { color: '#53B175' },

  // Thông số nút Apply Filter bạn yêu cầu
  applyButton: {
    width: 364,
    height: 67,
    backgroundColor: '#53B175',
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40, // Khoảng cách thực tế để hiển thị đẹp trên mobile
    left: 25,
    opacity: 1,
  },
  applyButtonText: { color: '#FFF', fontSize: 18, fontWeight: '600' }
});

export default FilterScreen;