import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { UserContext } from '../../context/UserContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProgressView = () => {
  const { tasks } = useContext(UserContext);

  // Calculate weekly progress for all recurring tasks
  const weeklyProgress = tasks
    .filter(task => task.recurrence === 'weekly')
    .map(task => {
      const completedCount = task.completedDates.filter(date => 
        new Date(date).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
      ).length;
      return {
        title: task.title,
        completed: completedCount,
        target: 7, // For weekly tasks, we'll assume 7 days
      };
    });

  // Calculate daily progress for all recurring tasks
  const dailyProgress = tasks
    .filter(task => task.recurrence === 'daily')
    .map(task => {
      const completedCount = task.completedDates.filter(date => 
        new Date(date).toDateString() === new Date().toDateString()
      ).length;
      return {
        title: task.title,
        completed: completedCount,
        target: 1, // For daily tasks, we'll assume 1 per day
      };
    });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Progress</Text>
      
      {weeklyProgress.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Goals</Text>
          {weeklyProgress.map((progress, index) => (
            <View key={`weekly-${index}`} style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <Icon name="event" size={24} color="#4CAF50" />
                <Text style={styles.progressText}>
                  {progress.title}
                </Text>
              </View>
              <Text style={styles.progressCount}>
                {progress.completed}/{progress.target} days
              </Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${(progress.completed / progress.target) * 100}%`,
                    },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      )}

      {dailyProgress.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Goals</Text>
          {dailyProgress.map((progress, index) => (
            <View key={`daily-${index}`} style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <Icon name="today" size={24} color="#4CAF50" />
                <Text style={styles.progressText}>
                  {progress.title}
                </Text>
              </View>
              <Text style={styles.progressCount}>
                {progress.completed}/{progress.target} completed
              </Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${(progress.completed / progress.target) * 100}%`,
                      backgroundColor: progress.completed >= progress.target ? '#4CAF50' : '#FFC107',
                    },
                  ]}
                />
              </View>
              {progress.completed >= progress.target && (
                <View style={styles.successBadge}>
                  <Icon name="check" size={16} color="#fff" />
                  <Text style={styles.successText}>Completed!</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {tasks.filter(t => t.completed).length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recently Completed</Text>
          {tasks
            .filter(t => t.completed)
            .slice(0, 3) // Show only last 3
            .map((task, index) => (
              <View key={`completed-${index}`} style={styles.completedItem}>
                <Icon name="check-circle" size={24} color="#4CAF50" />
                <Text style={styles.completedText}>{task.title}</Text>
              </View>
            ))}
        </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  section: {
    marginBottom: 25,
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
  progressItem: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  progressText: {
    fontSize: 16,
    marginLeft: 10,
  },
  progressCount: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    marginBottom: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
  },
  successBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  successText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 5,
  },
  completedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  completedText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default ProgressView;