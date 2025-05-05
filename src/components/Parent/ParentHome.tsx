import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { UserContext } from '../../context/UserContext';
import { ParentStackParamList } from '../../navigation/ParentStack'; // Now properly exported

type ParentHomeNavigationProp = StackNavigationProp<
  ParentStackParamList,
  'ParentHome'
>;

const ParentHome = () => {
  const navigation = useNavigation<ParentHomeNavigationProp>();
  const { tasks, rewards, children } = useContext(UserContext);

  // Calculate pending approvals
  const pendingTasks = tasks.filter(task => task.completed);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Healthy Buddy</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Icon name="settings" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('TaskManagement')}
          >
            <Icon name="add-task" size={30} color="#4CAF50" />
            <Text style={styles.actionText}>Add Task</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('RewardManagement')}
          >
            <Icon name="card-giftcard" size={30} color="#4CAF50" />
            <Text style={styles.actionText}>Set Rewards</Text>
          </TouchableOpacity>
        </View>
      </View>

      {pendingTasks.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pending Approvals ({pendingTasks.length})</Text>
          {pendingTasks.map(task => (
            <View key={task.id} style={styles.pendingItem}>
              <Text>{task.title}</Text>
              <View style={styles.pendingActions}>
                <TouchableOpacity 
                  style={styles.approveButton}
                  onPress={() => navigation.navigate('TaskManagement')}
                >
                  <Text style={styles.buttonText}>Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.declineButton}
                  onPress={() => navigation.navigate('TaskManagement')}
                >
                  <Text style={styles.buttonText}>Decline</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Active Tasks</Text>
        {tasks.filter(t => !t.completed).length === 0 ? (
          <Text style={styles.emptyText}>No active tasks</Text>
        ) : (
          tasks
            .filter(t => !t.completed)
            .map(task => (
              <TouchableOpacity 
                key={task.id} 
                style={styles.taskItem}
                onPress={() => navigation.navigate('TaskManagement')}
              >
                <Text>{task.title}</Text>
                <Icon name="chevron-right" size={20} color="#666" />
              </TouchableOpacity>
            ))
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Rewards</Text>
        {rewards.length === 0 ? (
          <Text style={styles.emptyText}>No rewards set</Text>
        ) : (
          rewards.map(reward => (
            <View key={reward.id} style={styles.rewardItem}>
              <Text>{reward.title}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('RewardManagement')}>
                <Icon name="edit" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Linked Child</Text>
        {children.length === 0 ? (
          <Text style={styles.emptyText}>No child linked</Text>
        ) : (
          children.map(child => (
            <View key={child.id} style={styles.childItem}>
              <Text>{child.name} (Age: {child.age})</Text>
              <Text>Screen Time: {child.screenTimeBlock.start} - {child.screenTimeBlock.end}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Text style={styles.editLink}>Edit</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#4CAF50',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  section: {
    margin: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    alignItems: 'center',
    padding: 15,
  },
  actionText: {
    marginTop: 5,
    color: '#4CAF50',
  },
  pendingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  pendingActions: {
    flexDirection: 'row',
  },
  approveButton: {
    backgroundColor: '#4CAF50',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  declineButton: {
    backgroundColor: '#f44336',
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  rewardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  childItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  editLink: {
    color: '#4CAF50',
    marginTop: 5,
  },
  emptyText: {
    color: '#666',
    fontStyle: 'italic',
  },
});

export default ParentHome;