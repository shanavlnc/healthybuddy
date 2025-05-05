import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigation';

type SignupScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Signup'
>;

type Props = {
  navigation: SignupScreenNavigationProp;
};

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [role, setRole] = useState<'parent' | 'child' | null>(null);
  const [parentEmail, setParentEmail] = useState('');
  const { signup, loading } = useContext(AuthContext);

  const handleSignup = async () => {
    if (!role) {
      alert('Please select if you are a parent or child');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (role === 'child' && !parentEmail) {
      alert('Please provide parent email for verification');
      return;
    }

    const userData = {
      username,
      email,
      password,
      role,
      nickname,
      ...(role === 'child' && { parentEmail }),
    };

    const success = await signup(userData);
    if (success) {
      navigation.navigate(role === 'parent' ? 'ParentStack' : 'ChildStack');
    } else {
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../../assets/images/logo.png')} // Replace with your logo
        style={styles.logo}
      />
      <Text style={styles.title}>Get started with your account</Text>
      
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[styles.roleButton, role === 'parent' && styles.selectedRole]}
          onPress={() => setRole('parent')}
        >
          <Text style={styles.roleText}>Parent</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleButton, role === 'child' && styles.selectedRole]}
          onPress={() => setRole('child')}
        >
          <Text style={styles.roleText}>Child</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nickname"
        value={nickname}
        onChangeText={setNickname}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Create Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {role === 'child' && (
        <TextInput
          style={styles.input}
          placeholder="Parent Email (for verification)"
          value={parentEmail}
          onChangeText={setParentEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.footerText, styles.footerLink]}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  roleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  roleButton: {
    padding: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 5,
  },
  selectedRole: {
    backgroundColor: '#4CAF50',
  },
  roleText: {
    color: '#4CAF50',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  footerText: {
    color: '#666',
  },
  footerLink: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

export default SignupScreen;