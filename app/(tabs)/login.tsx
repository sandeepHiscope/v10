import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  useColorScheme,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ViewStyle,
  TextStyle,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Stethoscope,
  User,
  HeartPulse,
  FlaskConical,
  Pill,
  Building,
  ArrowLeft,
  Mail,
  Lock,
} from 'lucide-react-native';
import { Colors } from "@/colors";

// Define view states for the multi-step flow
type AuthView = 'initial' | 'proRoles' | 'form';
type AuthMode = 'login' | 'register';
type UserRole = 'user' | 'doctor' | 'diagnostics' | 'pharmacist' | 'other';

// Define specific types for the styles object to ensure type safety.
type ScreenStyles = {
  safeArea: ViewStyle;
  container: ViewStyle;
  header: ViewStyle;
  headerTitle: TextStyle;
  headerSubtitle: TextStyle;
  authTabsContainer: ViewStyle;
  authTab: ViewStyle;
  authTabText: TextStyle;
  activeAuthTab: ViewStyle;
  activeAuthTabText: TextStyle;
  contentContainer: ViewStyle;
  welcomeTitle: TextStyle;
  welcomeSubtitle: TextStyle;
  roleButton: ViewStyle;
  roleButtonIcon: ViewStyle;
  roleButtonText: TextStyle;
  backButton: ViewStyle;
  backButtonText: TextStyle;
  formContainer: ViewStyle;
  inputContainer: ViewStyle;
  inputIcon: ViewStyle;
  input: TextStyle;
  submitButton: ViewStyle;
  submitButtonText: TextStyle;
  forgotPasswordText: TextStyle;
};

// Type definitions for component props
type RoleButtonProps = {
  icon: React.ElementType;
  label: string;
  onPress: () => void;
  styles: ScreenStyles;
  colors: typeof Colors.dark;
  isPrimary?: boolean;
};

type AuthInputProps = {
  icon: React.ElementType;
  placeholder: string;
  styles: ScreenStyles;
  colors: typeof Colors.dark;
  isSecure?: boolean;
};

/**
 * =============================================================================
 * STYLESHEET FACTORY
 * =============================================================================
 */
const getStyles = (colors: typeof Colors.dark): ScreenStyles => {
  return StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.background },
    container: { flex: 1 },
    header: {
      padding: 24,
      paddingTop: 60,
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
      alignItems: 'center',
    },
    headerTitle: { fontSize: 28, fontWeight: 'bold', color: colors.text },
    headerSubtitle: { fontSize: 16, color: colors.textSecondary, marginTop: 4 },
    authTabsContainer: {
      flexDirection: 'row',
      marginTop: 24,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      width: '100%',
    },
    authTab: { flex: 1, paddingVertical: 12, alignItems: 'center' },
    authTabText: { fontSize: 16, color: colors.textSecondary },
    activeAuthTab: { borderBottomWidth: 2, borderBottomColor: colors.tint },
    activeAuthTabText: { color: colors.tint, fontWeight: '600' },
    contentContainer: { flex: 1, padding: 24 },
    welcomeTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.text,
      textAlign: 'center',
    },
    welcomeSubtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: 8,
      marginBottom: 32,
    },
    roleButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      padding: 16,
      borderRadius: 16,
      marginBottom: 16,
    },
    roleButtonIcon: { marginRight: 16 },
    roleButtonText: { fontSize: 16, fontWeight: '600', color: colors.text },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 16,
      padding: 8,
    },
    backButtonText: { fontSize: 16, color: colors.textSecondary, marginLeft: 8 },
    formContainer: { flex: 1, justifyContent: 'center' },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 12,
      paddingHorizontal: 16,
      marginBottom: 16,
    },
    inputIcon: { marginRight: 12 },
    input: {
      flex: 1,
      height: 50,
      color: colors.text,
      fontSize: 16,
    },
    submitButton: {
      backgroundColor: colors.tint,
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
      marginTop: 16,
    },
    submitButtonText: {
      color: colors.background,
      fontSize: 16,
      fontWeight: 'bold',
    },
    forgotPasswordText: {
      color: colors.tint,
      textAlign: 'right',
      marginTop: 8,
      fontWeight: '600',
    },
  });
};

/**
 * =============================================================================
 * SUB-COMPONENTS
 * =============================================================================
 */

const RoleButton = ({ icon: Icon, label, onPress, styles, colors, isPrimary = false }: RoleButtonProps) => (
  <TouchableOpacity onPress={onPress}>
    <LinearGradient
      colors={isPrimary ? [colors.accent, colors.tint] : [colors.card, colors.card]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.roleButton}
    >
      <Icon color={colors.text} size={24} style={styles.roleButtonIcon} />
      <Text style={styles.roleButtonText}>{label}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const AuthInput = ({ icon: Icon, placeholder, styles, colors, isSecure = false }: AuthInputProps) => (
  <View style={styles.inputContainer}>
    <Icon color={colors.textSecondary} size={20} style={styles.inputIcon} />
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={colors.textSecondary}
      style={styles.input}
      secureTextEntry={isSecure}
    />
  </View>
);

/**
 * =============================================================================
 * MAIN COMPONENT: LoginScreen
 * =============================================================================
 */
export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'dark'];
  const styles = getStyles(colors);

  const [view, setView] = useState<AuthView>('initial');
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setView('form');
  };

  const handleBack = () => {
    if (view === 'form') {
      if (selectedRole === 'user') {
        setView('initial');
      } else {
        setView('proRoles');
      }
      setSelectedRole(null);
    } else if (view === 'proRoles') {
      setView('initial');
    }
  };

  const renderContent = () => {
    switch (view) {
      case 'form':
        return (
          <View style={styles.formContainer}>
            <Text style={styles.welcomeTitle}>
              {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
            </Text>
            <Text style={styles.welcomeSubtitle}>
              {`Enter your credentials to ${authMode}.`}
            </Text>
            {authMode === 'register' && (
              <AuthInput icon={User} placeholder="Full Name" styles={styles} colors={colors} />
            )}
            <AuthInput icon={Mail} placeholder="Email Address" styles={styles} colors={colors} />
            <AuthInput icon={Lock} placeholder="Password" styles={styles} colors={colors} isSecure />
            {authMode === 'register' && (
              <AuthInput icon={Lock} placeholder="Confirm Password" styles={styles} colors={colors} isSecure />
            )}
            {authMode === 'login' && (
              <TouchableOpacity>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitButtonText}>{authMode === 'login' ? 'Login' : 'Register'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <ArrowLeft size={16} color={colors.textSecondary} />
              <Text style={styles.backButtonText}>Back to role selection</Text>
            </TouchableOpacity>
          </View>
        );
      case 'proRoles':
        return (
          <>
            <Text style={styles.welcomeTitle}>Healthcare Professional</Text>
            <Text style={styles.welcomeSubtitle}>Select your specialty to continue.</Text>
            <RoleButton icon={Stethoscope} label="Doctor" onPress={() => handleRoleSelect('doctor')} styles={styles} colors={colors} />
            <RoleButton icon={FlaskConical} label="Diagnostics" onPress={() => handleRoleSelect('diagnostics')} styles={styles} colors={colors} />
            <RoleButton icon={Pill} label="Pharmacist" onPress={() => handleRoleSelect('pharmacist')} styles={styles} colors={colors} />
            <RoleButton icon={Building} label="Other Healthcare" onPress={() => handleRoleSelect('other')} styles={styles} colors={colors} />
            <TouchableOpacity style={styles.backButton} onPress={() => setView('initial')}>
              <ArrowLeft size={16} color={colors.textSecondary} />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          </>
        );
      case 'initial':
      default:
        return (
          <>
            <Text style={styles.welcomeTitle}>Welcome</Text>
            <Text style={styles.welcomeSubtitle}>Select your role to continue.</Text>
            <RoleButton icon={HeartPulse} label="Healthcare Professional" onPress={() => setView('proRoles')} styles={styles} colors={colors} />
            <RoleButton icon={User} label="User" onPress={() => handleRoleSelect('user')} styles={styles} colors={colors} isPrimary />
          </>
        );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
        <LinearGradient colors={[colors.tint, colors.gradientEnd]} style={styles.header}>
          <Text style={styles.headerTitle}>Verified Health Care</Text>
          <Text style={styles.headerSubtitle}>Your Health, Our Priority</Text>
          <View style={styles.authTabsContainer}>
            <TouchableOpacity
              style={[styles.authTab, authMode === 'login' && styles.activeAuthTab]}
              onPress={() => setAuthMode('login')}
            >
              <Text style={[styles.authTabText, authMode === 'login' && styles.activeAuthTabText]}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.authTab, authMode === 'register' && styles.activeAuthTab]}
              onPress={() => setAuthMode('register')}
            >
              <Text style={[styles.authTabText, authMode === 'register' && styles.activeAuthTabText]}>Register</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View style={styles.contentContainer}>{renderContent()}</View>
      </ScrollView>
    </SafeAreaView>
  );
}
