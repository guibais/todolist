import React from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTodoContext } from '../store/TodoContext';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { Button } from '../components/Button';
import { Ionicons } from '@expo/vector-icons';

const TodoItem = ({ item, toggleTask }) => {
  return (
    <TouchableOpacity onPress={() => toggleTask(item.id)} className="mb-3">
      <BlurView
        intensity={item.completed ? 20 : 40}
        tint={item.completed ? 'light' : 'dark'}
        style={{ borderRadius: 15, overflow: 'hidden' }}
      >
        <View
          className={`p-4 border-l-4 flex-row items-center justify-between ${
            item.completed ? 'border-green-500 bg-green-900/30' : 'border-purple-500'
          }`}
        >
          <Text className={`text-lg text-white ${item.completed ? 'line-through text-gray-400' : ''}`}>
            {item.text}
          </Text>
          <Ionicons
            name={item.completed ? 'checkmark-circle' : 'ellipse-outline'}
            size={24}
            color={item.completed ? '#10B981' : '#A78BFA'}
          />
        </View>
      </BlurView>
    </TouchableOpacity>
  );
};

export default function Home() {
  const { tasks, toggleTask, clearCompleted } = useTodoContext();
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <View className="flex-1 p-5">
        <Text className="text-4xl font-bold text-white mb-5">Suas Tarefas</Text>
        <FlatList
          data={tasks}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <TodoItem item={item} toggleTask={toggleTask} />}
          ListEmptyComponent={() => (
            <View className="items-center justify-center mt-20">
              <Text className="text-lg text-gray-400">Nenhuma tarefa ainda.</Text>
            </View>
          )}
        />
        <View className="mt-5">
          <Button title="Adicionar Tarefa" onPress={() => navigation.navigate('Modal')} />
          <Button title="Limpar Concluídas" onPress={clearCompleted} variant="secondary" />
        </View>
      </View>
    </SafeAreaView>
  );
}