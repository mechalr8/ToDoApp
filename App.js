import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Header from './components/header';
import ToDoAdd from './components/toDoAdd';
import ToDoItem from './components/toDoItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [todos, setTodos] = useState([{text: 'Touch to Delete', key: '1'}]);

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
    setTodos(pastTodos => {
      return [{text: text, key: Math.random().toString()}, ...pastTodos];
    });
  };

  const deleteTodoHandler = key => {
    setTodos(pastTodos => {
      return pastTodos.filter(item => item.key != key);
    });
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
              <ToDoItem item={item} deleteTodoHandler={deleteTodoHandler} />
            )}
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
