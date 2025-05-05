import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';
import LoginScreen from '../components/Auth/LoginScreen';
import SignupScreen from '../components/Auth/SignupScreen';
import ParentStack from './ParentStack';
import ChildStack from './ChildStack';

// Define your parameter list first
export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  ParentStack: undefined;
  ChildStack: undefined;
};

// Then create the navigator with the type
const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigation() {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          user.role === 'parent' ? (
            <Stack.Screen name="ParentStack" component={ParentStack} />
          ) : (
            <Stack.Screen name="ChildStack" component={ChildStack} />
          )
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}