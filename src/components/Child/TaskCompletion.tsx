import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from 'react-native';
import { UserContext } from '../../context/UserContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChildStackParamList } from '../../navigation/ChildStack';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

type TaskCompletionNavigationProp = StackNavigationProp<
  ChildStackParamList,
  'TaskCompletion'
>;

type RouteParams = {
  taskId: string;
};

const TaskCompletion = () => {
  const navigation = useNavigation<TaskCompletionNavigationProp>();
  const route = useRoute();
  const { taskId } = route.params as RouteParams;
  const { tasks, completeTask } = useContext(UserContext);
  
  const task = tasks.find(t => t.id === taskId);
  const [modalVisible, setModalVisible] = useState(false);
  const [proofType, setProofType] = useState<'photo' | 'video' | 'parent' | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);

  const handleCompleteTask = () => {
    if (!task) return;
    
    // For demo, we'll just mark as complete without actual proof
    completeTask(task.id);
    navigation.goBack();
  };

  const takePhoto = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // In a real app, you would upload this image to your backend
    }
    setModalVisible(false);
  };

  const recordVideo = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
      videoMaxDuration: 10, // 10 seconds max
    });

    if (!result.canceled) {
      // In a real app, you would upload this video to your backend
      console.log('Video recorded:', result.assets[0].uri);
    }
    setModalVisible(false);
  };

  const askParent = () => {
    // In a real app, this would notify the parent
    alert('Your parent has been notified to verify this task!');
    setModalVisible(false);
    handleCompleteTask();
  };

  return (
    <View style={styles.container}>
      {task && (
        <>
          <Text style={styles.title}>Complete Task: {task.title}</Text>
          
          {image && (
            <Image source={{ uri: image }} style={styles.proofImage} />
          )}

          <TouchableOpacity
            style={styles.completeButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.completeButtonText}>I DID IT!</Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>How did you complete this task?</Text>
                
                {task.proofRequired === 'photo' || task.proofRequired === 'none' ? (
                  <TouchableOpacity
                    style={styles.proofOption}
                    onPress={takePhoto}
                  >
                    <Icon name="photo-camera" size={30} color="#4CAF50" />
                    <Text style={styles.proofOptionText}>Take Photo</Text>
                  </TouchableOpacity>
                ) : null}

                {task.proofRequired === 'video' || task.proofRequired === 'none' ? (
                  <TouchableOpacity
                    style={styles.proofOption}
                    onPress={recordVideo}
                  >
                    <Icon name="videocam" size={30} color="#4CAF50" />
                    <Text style={styles.proofOptionText}>Record 10s Video</Text>
                  </TouchableOpacity>
                ) : null}

                <TouchableOpacity
                  style={styles.proofOption}
                  onPress={askParent}
                >
                  <Icon name="person" size={30} color="#4CAF50" />
                  <Text style={styles.proofOptionText}>Ask Parent to Verify</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
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
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  proofImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  completeButton: {
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  proofOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  proofOptionText: {
    marginLeft: 15,
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 20,
    padding: 10,
  },
  cancelButtonText: {
    color: '#f44336',
    fontWeight: 'bold',
  },
});

export default TaskCompletion;