import { StyleSheet } from 'react-native';

export const theme = {
  colors: {
    primary: '#4CAF50',
    primaryDark: '#388E3C',
    primaryLight: '#C8E6C9',
    accent: '#FFC107',
    textPrimary: '#212121',
    textSecondary: '#757575',
    divider: '#BDBDBD',
    white: '#FFFFFF',
    background: '#F5F5F5',
    error: '#F44336',
    success: '#4CAF50',
    warning: '#FF9800',
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
    xlarge: 32,
  },
  fontSize: {
    small: 12,
    medium: 14,
    large: 16,
    xlarge: 20,
    xxlarge: 24,
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
  },
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
  },
  header: {
    fontSize: theme.fontSize.xxlarge,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.large,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: theme.fontSize.medium,
    fontWeight: 'bold',
  },
  input: {
    height: 48,
    borderColor: theme.colors.divider,
    borderWidth: 1,
    borderRadius: theme.borderRadius.medium,
    paddingHorizontal: theme.spacing.medium,
    marginBottom: theme.spacing.medium,
    backgroundColor: theme.colors.white,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.medium,
    marginBottom: theme.spacing.medium,
    shadowColor: theme.colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});