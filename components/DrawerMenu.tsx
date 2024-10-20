import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';

interface DrawerMenuProps {
  isVisible: boolean;
  onClose: () => void;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <View style={styles.drawerContainer}>
      <TouchableOpacity style={styles.overlay} onPress={onClose} />
      <View style={styles.drawerContent}>
        <Button title="Home" onPress={() => { /* Handle Home action */ }} />
        <Button title="Profile" onPress={() => { /* Handle Profile action */ }} />
        <Button title="Settings" onPress={() => { /* Handle Settings action */ }} />
        <Button title="Close Drawer" onPress={onClose} />
        <Text>vybb</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 250,
    backgroundColor: 'white',
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    zIndex: 1000,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  drawerContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    zIndex: 2,
  },
});

export default DrawerMenu;
