import React, { useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTodoContext } from '../store/TodoContext';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { Button } from '../components/Button';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useHistoryStore } from '../store/historyStore';

const TodoItem = ({ item, toggleTask }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        toggleTask(item.id);
      }}
      className="mb-3">
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
  const { tasks, toggleTask, clearCompleted, setTasks } = useTodoContext();
  const { present, setPresent, undo, redo } = useHistoryStore();
  const navigation = useNavigation();

  // Effect to push current tasks to history when they change
  useEffect(() => {
    if (JSON.stringify(tasks) !== JSON.stringify(present)) {
      setPresent(tasks);
    }
  }, [tasks]);

  // Effect to update TodoContext when history's present changes (undo/redo)
  useEffect(() => {
    if (JSON.stringify(tasks) !== JSON.stringify(present)) {
      setTasks(present);
    }
  }, [present]);

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
        <View className="flex-row justify-around p-2">
          <TouchableOpacity onPress={undo} className="flex-row items-center bg-gray-700 p-3 rounded-lg">
            <Ionicons name="arrow-undo" size={24} color="white" />
            <Text className="text-white ml-2">Desfazer</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={redo} className="flex-row items-center bg-gray-700 p-3 rounded-lg">
            <Ionicons name="arrow-redo" size={24} color="white" />
            <Text className="text-white ml-2">Refazer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}