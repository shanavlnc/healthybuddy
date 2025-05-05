import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChildHome from '../components/Child/ChildHome';
import TaskCompletion from '../components/Child/TaskCompletion';
import ProgressView from '../components/Child/ProgressView';
import type { StackNavigationProp, StackNavigationOptions } from '@react-navigation/stack';

// 1. Define all screen names and their parameters
export type ChildStackParamList = {
  ChildHome: undefined;
  TaskCompletion: { taskId: string };
  ProgressView: undefined;
};

// 2. Export navigation prop type for child components
export type ChildScreenNavigationProp = StackNavigationProp<
  ChildStackParamList,
  'ChildHome'
>;

// 3. Create typed navigator
const Stack = createStackNavigator<ChildStackParamList>();

// 4. Screen options configuration
const screenOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: '#4CAF50',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

// 5. Type-safe component assignments
const TypedChildHome = ChildHome as React.ComponentType<any>;
const TypedTaskCompletion = TaskCompletion as React.ComponentType<any>;
const TypedProgressView = ProgressView as React.ComponentType<any>;

export default function ChildStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="ChildHome"
        component={TypedChildHome}
        options={{ title: 'Healthy Buddy' }}
      />
      <Stack.Screen
        name="TaskCompletion"
        component={TypedTaskCompletion}
        options={{ title: 'Complete Task' }}
      />
      <Stack.Screen
        name="ProgressView"
        component={TypedProgressView}
        options={{ title: 'My Progress' }}
      />
    </Stack.Navigator>
  );
}