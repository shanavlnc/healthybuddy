import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { UserContext } from '../../context/UserContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ParentStackParamList } from '../../navigation/ParentStack';

type TaskManagementNavigationProp = StackNavigationProp<
  ParentStackParamList,
  'TaskManagement'
>;

const TaskManagement = () => {
  const [title, setTitle] = useState('');
  const [rewardId, setRewardId] = useState('');
  const [proofRequired, setProofRequired] = useState<'none' | 'photo' | 'video'>('none');
  const [recurrence, setRecurrence] = useState<'none' | 'daily' | 'weekly'>('none');
  const { rewards, children, addTask } = useContext(UserContext);
  const navigation = useNavigation<TaskManagementNavigationProp>();

  const handleAddTask = () => {
    if (!title || !rewardId || children.length === 0) {
      alert('Please fill all fields');
      return;
    }

    addTask({
      title,
      rewardId,
      proofRequired,
      recurrence,
      assignedTo: children[0].id,
    });

    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add New Task</Text>

      <Text style={styles.label}>Task Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Eat vegetables"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Assign Reward</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={rewardId}
          onValueChange={setRewardId}
          style={styles.picker}
        >
          <Picker.Item label="Select a reward" value="" />
          {rewards.map(reward => (
            <Picker.Item 
              key={reward.id} 
              label={reward.title} 
              value={reward.id} 
            />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Proof Required</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={proofRequired}
          onValueChange={(value) => setProofRequired(value as 'none' | 'photo' | 'video')}
          style={styles.picker}
        >
          <Picker.Item label="No proof needed" value="none" />
          <Picker.Item label="Photo proof" value="photo" />
          <Picker.Item label="Video proof (10s)" value="video" />
        </Picker>
      </View>

      <Text style={styles.label}>Recurrence</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={recurrence}
          onValueChange={(value) => setRecurrence(value as 'none' | 'daily' | 'weekly')}
          style={styles.picker}
        >
          <Picker.Item label="One-time task" value="none" />
          <Picker.Item label="Daily" value="daily" />
          <Picker.Item label="Weekly" value="weekly" />
        </Picker>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={handleAddTask}
        >
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TaskManagement;