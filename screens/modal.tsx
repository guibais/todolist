import React, { useState, useContext } from 'react';
import { View, TextInput, Button } from 'react-native';
import { TodoContext } from '../store/TodoContext';
import { useNavigation } from '@react-navigation/native';

export default function Modal() {
  const [text, setText] = useState('');
  const { addTask } = useContext(TodoContext);
  const navigation = useNavigation();

  const handleAddTask = () => {
    if (text.trim()) {
      addTask(text);
      navigation.goBack();
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }}
        placeholder="Digite a nova tarefa"
        value={text}
        onChangeText={setText}
      />
      <Button title="Adicionar" onPress={handleAddTask} />
    </View>
  );
}