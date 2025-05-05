import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
} from 'react-native';
import { UserContext } from '../../context/UserContext';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Settings = () => {
  const { children, addChild } = useContext(UserContext);
  const navigation = useNavigation();
  
  const [name, setName] = useState(children[0]?.name || '');
  const [age, setAge] = useState(children[0]?.age ? String(children[0].age) : '');
  const [screenTimeStart, setScreenTimeStart] = useState(children[0]?.screenTimeBlock.start || '07:00');
  const [screenTimeEnd, setScreenTimeEnd] = useState(children[0]?.screenTimeBlock.end || '15:00');
  const [maxTasks, setMaxTasks] = useState('5');
  const [photoProof, setPhotoProof] = useState(true);
  const [videoProof, setVideoProof] = useState(false);

  const handleSave = () => {
    if (!name || !age) {
      alert('Please fill all required fields');
      return;
    }

    addChild({
      name,
      age: parseInt(age),
      parentId: 'parent1', // In a real app, this would be the logged-in parent's ID
      screenTimeBlock: {
        start: screenTimeStart,
        end: screenTimeEnd,
        days: [1, 2, 3, 4, 5], // Weekdays
      },
    });

    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Child Profile Settings</Text>

      <Text style={styles.label}>Child's Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Alex"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        placeholder="8"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Screen Time Block</Text>
      <View style={styles.timeContainer}>
        <TextInput
          style={[styles.input, styles.timeInput]}
          placeholder="07:00"
          value={screenTimeStart}
          onChangeText={setScreenTimeStart}
        />
        <Text style={styles.timeSeparator}>to</Text>
        <TextInput
          style={[styles.input, styles.timeInput]}
          placeholder="15:00"
          value={screenTimeEnd}
          onChangeText={setScreenTimeEnd}
        />
      </View>

      <Text style={styles.label}>Maximum Tasks Per Day</Text>
      <TextInput
        style={styles.input}
        placeholder="5"
        value={maxTasks}
        onChangeText={setMaxTasks}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Proof Required</Text>
      <View style={styles.switchContainer}>
        <Text>Photo Proof</Text>
        <Switch
          value={photoProof}
          onValueChange={setPhotoProof}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={photoProof ? '#4CAF50' : '#f4f3f4'}
        />
      </View>
      <View style={styles.switchContainer}>
        <Text>Video Proof (10s)</Text>
        <Switch
          value={videoProof}
          onValueChange={setVideoProof}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={videoProof ? '#4CAF50' : '#f4f3f4'}
        />
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
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.unlinkButton}>
        <Text style={styles.unlinkText}>Unlink Child</Text>
      </TouchableOpacity>
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
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  timeInput: {
    flex: 1,
  },
  timeSeparator: {
    marginHorizontal: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderRadius: 5,
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
  unlinkButton: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f44336',
    borderRadius: 5,
    alignItems: 'center',
  },
  unlinkText: {
    color: '#f44336',
    fontWeight: 'bold',
  },
});

export default Settings;