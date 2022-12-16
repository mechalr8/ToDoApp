import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function EditToDo({
  isModalVisible,
  inputText,
  setInputText,
  onPressSaveEdit,
  setIsModalVisible,
}) {
  return (
    <Modal
      animationType="slide"
      visible={isModalVisible}
      onRequestClose={() => {
        setIsModalVisible(false);
      }}>
      <View style={styles.modalView}>
        <View style={styles.modalHeading}>
          <Icon.Button
            name="angle-left"
            size={30}
            color="#ffff00"
            onPress={() => setIsModalVisible(false)}
            backgroundColor="#000000"
          />
          <Text style={styles.modalHeadingText}>Edit To Do</Text>
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
  );
}

const styles = StyleSheet.create({
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: 12,
  },
  modalHeadingText: {
    padding: 20,
    marginLeft: 85,
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
