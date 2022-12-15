import React, {StyleSheet} from 'react-native';

import {View, Text} from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>To Do App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 80,
    backgroundColor: '#000000',
  },
  headerText: {
    paddingVertical: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    color: '#ffff00',
  },
});

export default Header;
