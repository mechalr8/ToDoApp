import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ToDoItem({item, deleteTodoHandler, editToDoHandler}) {
  return (
    <View style={styles.toDoItem}>
      <TouchableOpacity onPress={() => deleteTodoHandler(item.key)}>
        <View style={styles.toDoItemTextView}>
          <Text style={styles.toDoItemText}>{item.text}</Text>
          <Icon name="trash-o" size={16} color="#ffff00" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          editToDoHandler(item);
        }}>
        <View style={styles.button}>
          <Icon name="edit" size={22} color="#ffff00" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  toDoItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toDoItemTextView: {
    backgroundColor: '#000000',
    width: 320,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  button: {
    padding: 10,
    // backgroundColor: '#ffff00',
    borderRadius: 6,
    marginTop: 16,
    marginBottom: 8,
  },
  buttonText: {
    color: '#000000',
    textAlign: 'center',
    // fontWeight: 'bold',
    fontSize: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
});
