import {useState} from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function ToDoAdd({addTodoHandler}) {
  const [text, setText] = useState('');

  const textChangeHandler = newText => {
    setText(newText);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="new todo..."
        placeholderTextColor="#A6A65A"
        onChangeText={textChangeHandler}
        multiline={true}
      />
      <TouchableOpacity
        onPress={() => {
          addTodoHandler(text);
        }}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Add To Do</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: '#A6A65A',
    color: '#C0C040',
  },
  button: {
    backgroundColor: '#ffff00',
    borderRadius: 6,
  },
  buttonText: {
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    paddingVertical: 8,
  },
});
