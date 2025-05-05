import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { UserContext } from '../../context/UserContext';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RewardManagement = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const { rewards, addReward } = useContext(UserContext);
  const navigation = useNavigation();

  const handleSaveReward = () => {
    if (!title) {
      alert('Please enter a reward title');
      return;
    }

    addReward({
      title,
      description,
      createdBy: 'parent1', // In a real app, this would be the logged-in parent's ID
    });

    setTitle('');
    setDescription('');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{editingId ? 'Edit Reward' : 'Add New Reward'}</Text>

      <Text style={styles.label}>Reward Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Choose a fruit for dessert"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Description (Optional)</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="15 mins extra playtime"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={handleSaveReward}
        >
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Your Rewards</Text>
      {rewards.length === 0 ? (
        <Text style={styles.emptyText}>No rewards set yet</Text>
      ) : (
        rewards.map(reward => (
          <View key={reward.id} style={styles.rewardItem}>
            <View style={styles.rewardInfo}>
              <Text style={styles.rewardTitle}>{reward.title}</Text>
              {reward.description && (
                <Text style={styles.rewardDescription}>{reward.description}</Text>
              )}
            </View>
            <View style={styles.rewardActions}>
              <TouchableOpacity onPress={() => {
                setEditingId(reward.id);
                setTitle(reward.title);
                setDescription(reward.description);
              }}>
                <Icon name="edit" size={24} color="#4CAF50" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="delete" size={24} color="#f44336" />
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 15,
    color: '#333',
  },
  emptyText: {
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
  rewardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  rewardInfo: {
    flex: 1,
  },
  rewardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  rewardDescription: {
    color: '#666',
    marginTop: 5,
  },
  rewardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
});

export default RewardManagement;