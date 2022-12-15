import React, {useState, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Modal,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Header from './components/header';
import ToDoAdd from './components/toDoAdd';
import ToDoItem from './components/toDoItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [todos, setTodos] = useState([{text: 'Touch to Delete', key: '1'}]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputText, setInputText] = useState();
  const [editItem, setEditItem] = useState();

  useEffect(() => {
    getTodoList();
  }, []);

  useEffect(() => {
    saveTodoList(todos);
  }, [todos]);

  const saveTodoList = async todos => {
    try {
      const savedTodos = JSON.stringify(todos);
      await AsyncStorage.setItem('todos', savedTodos);
    } catch (e) {
      console.log('This is saveTodoList error: ', e);
    }
  };

  const getTodoList = async () => {
    try {
      const todos = await AsyncStorage.getItem('todos');
      if (todos != null) {
        setTodos(JSON.parse(todos));
      }
    } catch (e) {
      console.log('This is getTodoList error: ', e);
    }
  };

  const addTodoHandler = text => {
    if (text.length > 3) {
      setTodos(pastTodos => {
        return [{text: text, key: Math.random().toString()}, ...pastTodos];
      });
    } else {
      Alert.alert('OOPS!', 'Todos must be over 3 chars long.', [
        {
          text: 'Understood',
          onPress: () => {
            console.log('alert closed');
          },
        },
      ]);
    }
  };

  const deleteTodoHandler = key => {
    setTodos(pastTodos => {
      return pastTodos.filter(item => item.key != key);
    });
  };

  const editToDoHandler = item => {
    setIsModalVisible(true);
    setInputText(item.text);
    setEditItem(item.key);
    // console.log('Line No: 67:', item.key);
  };

  const handleEditItem = editItem => {
    const newTodos = todos.map(item => {
      // console.log('Line No: 89:', item.key);
      // console.log('Line No: 90:', editItem);
      if (item.key == editItem) {
        item.text = inputText;
        // console.log('Line No: 76:', item.key);
        // console.log('Line No: 77:', item);
        return item;
      }
      return item;
    });
    setTodos(newTodos);
  };

  const onPressSaveEdit = () => {
    // console.log('Line No: 86', editItem);
    handleEditItem(editItem);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.contents}>
        <ToDoAdd addTodoHandler={addTodoHandler} />
        <View style={styles.list}>
          <FlatList
            data={todos}
            renderItem={({item}) => (
              <ToDoItem
                item={item}
                deleteTodoHandler={deleteTodoHandler}
                editToDoHandler={editToDoHandler}
              />
            )}
          />
          <Modal
            animationType="slide"
            visible={isModalVisible}
            onRequestClose={() => {
              setIsModalVisible(false);
            }}>
            <View style={styles.modalView}>
              <View style={styles.modalHeading}>
                <Text style={styles.modalHeadingText}>Edit To Do:</Text>
              </View>
              <View style={styles.modalContents}>
                <TextInput
                  style={styles.modalTextInput}
                  onChangeText={text => setInputText(text)}
                  defaultValue={inputText}
                  editable={true}
                  multiline={true}
                  placeholderTextColor="#A6A65A"
                />
                <TouchableOpacity onPress={() => onPressSaveEdit()}>
                  <View style={styles.modalButtonView}>
                    <Text style={styles.modalButtonText}>Save</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
  },
  contents: {
    flex: 1,
    padding: 16,
  },
  list: {
    flex: 1,
    marginTop: 10,
    color: '#ffff00',
  },
  modalView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#181818',
  },
  modalTextInput: {
    marginBottom: 20,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: '#A6A65A',
    color: '#C0C040',
    width: 370,
  },
  modalButtonView: {
    backgroundColor: '#ffff00',
    borderRadius: 6,
    width: 370,
  },
  modalButtonText: {
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    paddingVertical: 8,
  },
  modalHeading: {
    width: '100%',
    height: 80,
    backgroundColor: '#000000',
  },
  modalHeadingText: {
    padding: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    color: '#ffff00',
  },
  modalContents: {
    flex: 1,
    padding: 16,
  },
});

export default App;
