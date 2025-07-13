import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { useTodoContext } from '../store/TodoContext';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../types/navigation';
import { BlurView } from 'expo-blur';
import { Button } from '../components/Button';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { Task } from 'types/todo';

type TodoItemProps = {
  item: Task;
  toggleTask: (id: number) => void;
};

const TodoItem = ({ item, toggleTask }: TodoItemProps) => {
  const handleToggleTask = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    toggleTask(item.id);
  };

  return (
    <TouchableOpacity onPress={handleToggleTask} className="mb-3">
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
  const { tasks, toggleTask, clearCompleted, undo, redo } = useTodoContext();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [height, setHeight] = useState(Dimensions.get('window').height);

  useEffect(() => {
    const updateHeight = ({ window }: { window: { height: number } }) => setHeight(window.height);
    const dim = Dimensions.addEventListener('change', updateHeight);
    return () => {
      dim.remove();
    };
  }, []);

  const handleNavigateToModal = () => {
    navigation.navigate('Modal');
  };

  const renderTask = ({ item }: { item: Task }) => <TodoItem item={item} toggleTask={toggleTask} />;

  const renderEmptyComponent = () => (
    <View className="mt-20 items-center justify-center">
      <Text className="text-lg text-gray-400">Nenhuma tarefa ainda.</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <View style={{ height }}>
        <View className=" px-5 pb-3 pt-5">
          <Text className="text-4xl font-bold text-white">Suas Tarefas</Text>
        </View>

        <View className="flex-1">
          <FlatList
            data={tasks}
            renderItem={renderTask}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={renderEmptyComponent}
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingBottom: 20,
              flexGrow: 1,
            }}
            style={{ flex: 1, flexGrow: 1 }}
            showsVerticalScrollIndicator={true}
          />
        </View>

        <View className="h-1/3 bg-gray-900 px-5 pb-5">
          <View className="mb-3">
            <Button title="Adicionar Tarefa" onPress={handleNavigateToModal} />
            <Button title="Limpar Concluídas" onPress={clearCompleted} variant="secondary" />
          </View>

          <View className="flex-row justify-around">
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
      </View>
    </SafeAreaView>
  );
}
