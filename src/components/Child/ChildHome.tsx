import React, { useContext, useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Image,
  ActivityIndicator // Added missing import
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import { UserContext } from '../../context/UserContext';
import { ChildStackParamList } from '../../navigation/ChildStack';

type ChildHomeNavigationProp = StackNavigationProp<
  ChildStackParamList,
  'ChildHome'
>;

const ChildHome = () => {
  const navigation = useNavigation<ChildHomeNavigationProp>();
  const { tasks, rewards, children } = useContext(UserContext);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockMessage, setBlockMessage] = useState('');

  // ... rest of your component code ...
};

const styles = StyleSheet.create({
  // ... your styles ...
});

export default ChildHome;