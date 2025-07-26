
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  useColorScheme,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {
  LayoutGrid,
  Factory,
  TriangleAlert,
  SlidersHorizontal,
  Moon,
  UserPlus,
  Info,
  ChevronRight,
} from 'lucide-react-native';
import { Colors } from "@/colors";
import { useRouter } from 'expo-router';

// Define a specific type for the styles object to ensure type safety.
type ScreenStyles = {
  safeArea: ViewStyle;
  container: ViewStyle;
  header: ViewStyle;
  headerTitle: TextStyle;
  sectionContainer: ViewStyle;
  sectionTitle: TextStyle;
  menuItemsContainer: ViewStyle;
  menuItem: ViewStyle;
  menuItemIcon: ViewStyle;
  menuItemLabel: TextStyle;
  menuItemChevron: ViewStyle;
  separator: ViewStyle;
};

// Type definitions for component props using the strictly-typed styles
type SectionProps = {
  title: string;
  styles: ScreenStyles;
};

type MenuItemProps = {
  icon: React.ElementType;
  label: string;
  styles: ScreenStyles;
  colors: typeof Colors.dark;
  onPress?: () => void;
};

type ThemeToggleProps = {
  styles: ScreenStyles;
  colors: typeof Colors.dark;
  isDarkTheme: boolean;
  onToggle: (value: boolean) => void;
};

/**
 * =============================================================================
 * STYLESHEET FACTORY
 * =============================================================================
 */
const getStyles = (colors: typeof Colors.dark): ScreenStyles => {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
    },
    header: {
      padding: 16,
      paddingTop: 32,
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
    },
    sectionContainer: {
      marginTop: 24,
      paddingHorizontal: 16,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textSecondary,
      marginBottom: 12,
      textTransform: 'uppercase',
    },
    menuItemsContainer: {
      backgroundColor: colors.card,
      borderRadius: 16,
      overflow: 'hidden', // Ensures children conform to border radius
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 16,
    },
    menuItemIcon: {
      marginRight: 16,
    },
    menuItemLabel: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
    },
    menuItemChevron: {
      marginLeft: 'auto',
    },
    separator: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.border,
      marginLeft: 56, // Align with text after icon (24 icon + 16 margin + 16 padding)
    },
  });
};

/**
 * =============================================================================
 * SUB-COMPONENTS
 * =============================================================================
 */

const SectionHeader = ({ title, styles }: SectionProps) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>{title}</Text>
  </View>
);

const MenuItem = ({ icon: Icon, label, styles, colors, onPress }: MenuItemProps) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Icon color={colors.tint} size={24} style={styles.menuItemIcon} />
    <Text style={styles.menuItemLabel}>{label}</Text>
    <ChevronRight color={colors.textSecondary} size={20} style={styles.menuItemChevron} />
  </TouchableOpacity>
);

const ThemeToggle = ({ styles, colors, isDarkTheme, onToggle }: ThemeToggleProps) => (
  <View style={styles.menuItem}>
    <Moon color={colors.tint} size={24} style={styles.menuItemIcon} />
    <Text style={styles.menuItemLabel}>Change Theme</Text>
    <Switch
      trackColor={{ false: colors.border, true: colors.accent }}
      thumbColor={isDarkTheme ? colors.background : colors.card}
      ios_backgroundColor={colors.border}
      onValueChange={onToggle}
      value={isDarkTheme}
    />
  </View>
);

const Separator = ({ styles }: { styles: ScreenStyles }) => <View style={styles.separator} />;


export default function MenuScreen() {
  const colorScheme = useColorScheme();
  const activeColorScheme = colorScheme ?? 'dark';
  const colors = Colors[activeColorScheme];
  const styles = getStyles(colors);

  // NOTE: In a real application, this state would be managed by a global
  // ThemeContext to apply the theme across the entire app.
  const [isDarkTheme, setIsDarkTheme] = useState(activeColorScheme === 'dark');

  const handleThemeToggle = (value: boolean) => {
    setIsDarkTheme(value);
    // Here you would call a function from your ThemeContext to change the app's theme.
    // e.g., themeContext.setTheme(value ? 'dark' : 'light');
    // For now, this only affects the local state of the switch.
  };

  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Menu</Text>
        </View>

        <SectionHeader title="Navigation" styles={styles} />

        <View style={styles.menuItemsContainer}>
          <MenuItem
            icon={LayoutGrid}
            label="Dashboard"
            styles={styles}
            colors={colors}
            // onPress={() => router.push('/dashboard')}
          />
          <Separator styles={styles} />
          <MenuItem
            icon={LayoutGrid}
            label="Doc"
            styles={styles}
            colors={colors}
            onPress={() => router.push('/docDash')}
          />
          <Separator styles={styles} />
          <MenuItem
            icon={LayoutGrid}
            label="Diagnosis"
            styles={styles}
            colors={colors}
            onPress={() => router.push('/labDash')}
          />
          <Separator styles={styles} />
          <MenuItem
            icon={LayoutGrid}
            label="user"
            styles={styles}
            colors={colors}
            onPress={() => router.push('/userDas')}
          />
          <Separator styles={styles} />
          
        
        </View>

        <SectionHeader title="Settings" styles={styles} />
        <View style={styles.menuItemsContainer}>
          <MenuItem icon={SlidersHorizontal} label="Preferences" styles={styles} colors={colors} />
          <Separator styles={styles} />
          <ThemeToggle
            styles={styles}
            colors={colors}
            isDarkTheme={isDarkTheme}
            onToggle={handleThemeToggle}
          />
        </View>

        <SectionHeader title="Information" styles={styles} />
        <View style={styles.menuItemsContainer}>
          <MenuItem icon={UserPlus} label="Invite People" styles={styles} colors={colors} />
          <Separator styles={styles} />
          <MenuItem icon={Info} label="About" styles={styles} colors={colors} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
