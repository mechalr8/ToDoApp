import React from 'react-native';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';

export default function ToDoItem({item, deleteTodoHandler}) {
  return (
    <TouchableOpacity onPress={() => deleteTodoHandler(item.key)}>
      <View style={styles.toDoItem}>
        <Text style={styles.toDoItemText}>{item.text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  toDoItem: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    padding: 16,
    marginTop: 16,
    marginBottom: 8,
    borderColor: '#ffff00',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10,
  },
  toDoItemText: {
    color: '#ffff00',
  },
});
