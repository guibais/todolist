import React, { useEffect, useRef } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTodoContext } from '../store/TodoContext';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../types/navigation';
import { BlurView } from 'expo-blur';
import { Button } from '../components/Button';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useHistoryStore } from '../store/historyStore';
import { Task } from 'types/todo';

type TodoItemProps = {
  item: Task;
  toggleTask: (id: number) => void;
};

const TodoItem = ({ item, toggleTask }: TodoItemProps) => {
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
        style={{ borderRadius: 15, overflow: 'hidden' }}>
        <View
          className={`flex-row items-center justify-between border-l-4 p-4 ${
            item.completed ? 'border-green-500 bg-green-900/30' : 'border-purple-500'
          }`}>
          <Text
            className={`text-lg text-white ${item.completed ? 'text-gray-400 line-through' : ''}`}>
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
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const tasksRef = useRef(tasks);
  const presentRef = useRef(present);
  const setTasksRef = useRef(setTasks);
  const setPresentRef = useRef(setPresent);

  tasksRef.current = tasks;
  presentRef.current = present;
  setTasksRef.current = setTasks;
  setPresentRef.current = setPresent;

  useEffect(() => {
    if (JSON.stringify(tasksRef.current) !== JSON.stringify(presentRef.current)) {
      setPresentRef.current(tasksRef.current);
    }
  }, [tasks]);

  useEffect(() => {
    if (JSON.stringify(tasksRef.current) !== JSON.stringify(presentRef.current)) {
      setTasksRef.current(presentRef.current);
    }
  }, [present]);

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <View className="flex-1 p-5">
        <Text className="mb-5 text-4xl font-bold text-white">Suas Tarefas</Text>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <TodoItem item={item} toggleTask={toggleTask} />}
          ListEmptyComponent={() => (
            <View className="mt-20 items-center justify-center">
              <Text className="text-lg text-gray-400">Nenhuma tarefa ainda.</Text>
            </View>
          )}
        />
        <View className="mt-5">
          <Button title="Adicionar Tarefa" onPress={() => navigation.navigate('Modal')} />
          <Button title="Limpar Concluídas" onPress={clearCompleted} variant="secondary" />
        </View>
        <View className="flex-row justify-around p-2">
          <TouchableOpacity
            onPress={undo}
            className="flex-row items-center rounded-lg bg-gray-700 p-3">
            <Ionicons name="arrow-undo" size={24} color="white" />
            <Text className="ml-2 text-white">Desfazer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={redo}
            className="flex-row items-center rounded-lg bg-gray-700 p-3">
            <Ionicons name="arrow-redo" size={24} color="white" />
            <Text className="ml-2 text-white">Refazer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
