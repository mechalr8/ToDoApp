import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, View, Alert} from 'react-native';
import Header from './components/header';
import ToDoAdd from './components/toDoAdd';
import ToDoItem from './components/toDoItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditToDo from './components/editToDo';

const App = () => {
  const [todos, setTodos] = useState([{text: 'Touch to Delete', key: '1'}]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputText, setInputText] = useState();
  const [editItemKey, setEditItemKey] = useState();

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
    setEditItemKey(item.key);
  };

  const handleEditItem = editItemKey => {
    const newTodos = todos.map(item => {
      if (item.key == editItemKey) {
        item.text = inputText;
        return item;
      }
      return item;
    });
    setTodos(newTodos);
  };

  const onPressSaveEdit = () => {
    handleEditItem(editItemKey);
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
          <EditToDo
            isModalVisible={isModalVisible}
            inputText={inputText}
            setInputText={setInputText}
            onPressSaveEdit={onPressSaveEdit}
          />
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
});

export default App;
