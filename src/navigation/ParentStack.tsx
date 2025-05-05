import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ParentHome from '../components/Parent/ParentHome';
import TaskManagement from '../components/Parent/TaskManagement';
import RewardManagement from '../components/Parent/RewardManagement';
import Settings from '../components/Parent/Settings';
import { StackNavigationProp } from '@react-navigation/stack';

// 1. First define the parameter types for all screens
export type ParentStackParamList = {
  ParentHome: undefined;
  TaskManagement: undefined;
  RewardManagement: undefined;
  Settings: undefined;
};

// 2. Create typed navigator
const Stack = createStackNavigator<ParentStackParamList>();

// 3. Export navigation prop type for child components
export type ParentScreenNavigationProp = StackNavigationProp<
  ParentStackParamList,
  'ParentHome'
>;

export default function ParentStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4CAF50', // Green header
        },
        headerTintColor: '#fff',     // White text
        headerTitleStyle: {
          fontWeight: 'bold',        // Bold title
        },
      }}
    >
      <Stack.Screen
        name="ParentHome"
        component={ParentHome}
        options={{ title: 'Healthy Buddy' }}
      />
      <Stack.Screen
        name="TaskManagement"
        component={TaskManagement}
        options={{ title: 'Manage Tasks' }}
      />
      <Stack.Screen
        name="RewardManagement"
        component={RewardManagement}
        options={{ title: 'Manage Rewards' }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ title: 'Settings' }}
      />
    </Stack.Navigator>
  );
}