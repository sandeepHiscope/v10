import { Colors } from "@/colors";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowRight,
  Bell,
  BookUser,
  CalendarDays,
  FileText,
  HeartPulse,
  MessageSquare,
  Pill,
  Settings,
  Shield,
  Stethoscope,
  Video,
} from "lucide-react-native";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
} from "react-native";

// Define a type for the generated styles object for better type safety
type ScreenStyles = {
  safeArea: StyleProp<ViewStyle>;
  container: StyleProp<ViewStyle>;
  contentContainer: StyleProp<ViewStyle>;
  mainContent: StyleProp<ViewStyle>;
  headerContainer: StyleProp<ViewStyle>;
  headerTopRow: StyleProp<ViewStyle>;
  profilePic: StyleProp<ViewStyle>;
  headerTitle: StyleProp<TextStyle>;
  headerIcons: StyleProp<ViewStyle>;
  settingsIcon: StyleProp<ViewStyle>;
  card: StyleProp<ViewStyle>;
  cardTitle: StyleProp<TextStyle>;
  cardSubtitle: StyleProp<TextStyle>;
  primaryButton: StyleProp<ViewStyle>;
  primaryButtonText: StyleProp<TextStyle>;
  primaryButtonIcon: StyleProp<ViewStyle>;
  sectionHeader: StyleProp<ViewStyle>;
  sectionTitle: StyleProp<TextStyle>;
  viewAll: StyleProp<TextStyle>;
  quickAccessGrid: StyleProp<ViewStyle>;
  quickAccessItem: StyleProp<ViewStyle>;
  quickAccessIconContainer: StyleProp<ViewStyle>;
  quickAccessLabel: StyleProp<TextStyle>;
  featureGrid: StyleProp<ViewStyle>;
  featureCard: StyleProp<ViewStyle>;
  featureIconContainer: StyleProp<ViewStyle>;
  featureLabel: StyleProp<TextStyle>;
  videoButton: StyleProp<ViewStyle>;
  videoButtonText: StyleProp<TextStyle>;
  companionCard: StyleProp<ViewStyle>;
  companionTitle: StyleProp<TextStyle>;
  getStartedButton: StyleProp<ViewStyle>;
  getStartedButtonText: StyleProp<TextStyle>;
  companionIcon: StyleProp<ViewStyle>;
  healthAppText: StyleProp<TextStyle>;
  horizontalCard: StyleProp<ViewStyle>;
};

// Type definitions for component props
type IconProps = {
  icon: React.ElementType;
  label: string;
  colorName: keyof typeof Colors.dark.iconColors;
  styles: ScreenStyles;
};

type FeatureCardProps = {
  icon: React.ElementType;
  label: string;
  colorName: keyof typeof Colors.dark.iconColors;
  styles: ScreenStyles;
};

type ComponentProps = {
  colors: typeof Colors.dark;
  styles: ScreenStyles;
};

/**
 * =============================================================================
 * STYLESHEET FACTORY
 * =============================================================================
 * A factory function that creates the stylesheet based on the current color theme.
 * This approach centralizes all styling logic and removes the need for inline styles.
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
    contentContainer: {
      paddingBottom: 30,
    },
    mainContent: {
      paddingHorizontal: 16,
    },
    headerContainer: {
      paddingHorizontal: 16,
      paddingTop: 50, // Approx for status bar
      paddingBottom: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    headerTopRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    profilePic: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "rgba(255,255,255,0.5)", // Placeholder
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginLeft: 12,
      color: colors.text,
    },
    headerIcons: {
      flexDirection: "row",
      marginLeft: "auto",
    },
    settingsIcon: {
      marginLeft: 16,
    },
    card: {
      borderRadius: 16,
      padding: 16,
      marginTop: 16,
      backgroundColor: colors.card,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
    },
    cardSubtitle: {
      color: colors.textSecondary,
      marginTop: 4,
    },
    primaryButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 12,
      marginTop: 16,
      backgroundColor: colors.accent,
    },
    primaryButtonText: {
      fontSize: 14,
      fontWeight: "bold",
      color: colors.text,
    },
    primaryButtonIcon: {
      marginLeft: 8,
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 24,
      marginBottom: 12,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
    },
    viewAll: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.tint,
    },
    quickAccessGrid: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    quickAccessItem: {
      alignItems: "center",
    },
    quickAccessIconContainer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
    },
    quickAccessLabel: {
      marginTop: 8,
      fontSize: 12,
      color: colors.textSecondary,
    },
    featureGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    featureCard: {
      width: "48%",
      flexDirection: "row",
      alignItems: "center",
      padding: 12,
      borderRadius: 12,
      marginBottom: 12,
      backgroundColor: colors.card,
    },
    featureIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    featureLabel: {
      flex: 1,
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
    },
    videoButton: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 20,
      backgroundColor: colors.tint,
    },
    videoButtonText: {
      color: colors.text,
      marginLeft: 8,
    },
    companionCard: {
      borderRadius: 16,
      padding: 20,
      marginTop: 24,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    companionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      maxWidth: "80%",
      color: colors.text,
    },
    getStartedButton: {
      marginTop: 12,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 20,
      alignSelf: "flex-start",
    },
    getStartedButtonText: {
      fontWeight: "bold",
      fontSize: 14,
      color: colors.tint,
    },
    companionIcon: {
      width: 80,
      height: 80,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    healthAppText: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "bold",
    },
    horizontalCard: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });
};

/**
 * =============================================================================
 * SUB-COMPONENTS
 * =============================================================================
 */

const AppHeader = ({ colors, styles }: ComponentProps) => (
  <LinearGradient
    colors={[colors.gradientStart, colors.gradientEnd]}
    style={styles.headerContainer}
  >
    <View style={styles.headerTopRow}>
      <View style={styles.profilePic} />
      <Text style={styles.headerTitle}>Hello, John Doe!</Text>
      <View style={styles.headerIcons}>
        <TouchableOpacity>
          <Bell color={colors.text} size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsIcon}>
          <Settings color={colors.text} size={24} />
        </TouchableOpacity>
      </View>
    </View>
  </LinearGradient>
);

const BookAppointmentCard = ({ colors, styles }: ComponentProps) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>Connect with Your Doctor</Text>
    <TouchableOpacity style={styles.primaryButton}>
      <Text style={styles.primaryButtonText}>Book Appointment</Text>
      <ArrowRight
        color={colors.text}
        size={16}
        style={styles.primaryButtonIcon}
      />
    </TouchableOpacity>
  </View>
);

const SectionHeader = ({
  title,
  styles,
}: {
  title: string;
  styles: ScreenStyles;
}) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <TouchableOpacity>
      <Text style={styles.viewAll}>View All</Text>
    </TouchableOpacity>
  </View>
);

const QuickAccessIcon = ({
  icon: Icon,
  label,
  colorName,
  styles,
  colors,
}: IconProps & { colors: typeof Colors.dark }) => {
  return (
    <TouchableOpacity style={styles.quickAccessItem}>
      <View
        style={[
          styles.quickAccessIconContainer,
          { backgroundColor: colors.iconColors[colorName] },
        ]}
      >
        <Icon color={colors.text} size={24} />
      </View>
      <Text style={styles.quickAccessLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const FeatureCard = ({
  icon: Icon,
  label,
  colorName,
  styles,
  colors,
}: FeatureCardProps & { colors: typeof Colors.dark }) => {
  return (
    <TouchableOpacity style={styles.featureCard}>
      <View
        style={[
          styles.featureIconContainer,
          { backgroundColor: colors.iconColors[colorName] },
        ]}
      >
        <Icon color={colors.text} size={20} />
      </View>
      <Text style={styles.featureLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const HealthCompanionCard = ({ colors, styles }: ComponentProps) => (
  <LinearGradient
    colors={[colors.accent, colors.tint]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.companionCard}
  >
    <View>
      <Text style={styles.companionTitle}>Your Complete Health Companion</Text>
      <TouchableOpacity style={styles.getStartedButton}>
        <Text style={styles.getStartedButtonText}>Get Started Now →</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.companionIcon}>
      <Text style={styles.healthAppText}>HealthApp</Text>
    </View>
  </LinearGradient>
);

/**
 * =============================================================================
 * MAIN COMPONENT: HomeScreen
 * =============================================================================
 */
export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "dark"];
  const styles = getStyles(colors);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <AppHeader colors={colors} styles={styles} />
        <View style={styles.mainContent}>
          <BookAppointmentCard colors={colors} styles={styles} />
          <SectionHeader title="Quick Access" styles={styles} />
          <View style={styles.quickAccessGrid}>
            <QuickAccessIcon
              icon={Stethoscope}
              label="Find a Doctor"
              colorName="blue"
              styles={styles}
              colors={colors}
            />
            <QuickAccessIcon
              icon={HeartPulse}
              label="Health Tracker"
              colorName="red"
              styles={styles}
              colors={colors}
            />
            <QuickAccessIcon
              icon={Pill}
              label="Medicines"
              colorName="orange"
              styles={styles}
              colors={colors}
            />
            <QuickAccessIcon
              icon={CalendarDays}
              label="Appointment"
              colorName="green"
              styles={styles}
              colors={colors}
            />
          </View>
          <SectionHeader title="Health Management" styles={styles} />
          <View style={styles.featureGrid}>
            <FeatureCard
              icon={BookUser}
              label="Book Lab Tests"
              colorName="blue"
              styles={styles}
              colors={colors}
            />
            <FeatureCard
              icon={FileText}
              label="Order Prescriptions"
              colorName="purple"
              styles={styles}
              colors={colors}
            />
            <FeatureCard
              icon={MessageSquare}
              label="Teleconsultation"
              colorName="orange"
              styles={styles}
              colors={colors}
            />
            <FeatureCard
              icon={Shield}
              label="Billing & Payments"
              colorName="green"
              styles={styles}
              colors={colors}
            />
          </View>
          <View style={[styles.card, styles.horizontalCard]}>
            <View>
              <Text style={styles.cardTitle}>Virtual Consultations</Text>
              <Text style={styles.cardSubtitle}>Talk to a doctor anytime</Text>
            </View>
            <TouchableOpacity style={styles.videoButton}>
              <Video color={colors.text} size={20} />
              <Text style={[styles.primaryButtonText, styles.videoButtonText]}>
                Video
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.card, styles.horizontalCard]}>
            <View>
              <Text style={styles.cardTitle}>Invite a Friend</Text>
              <Text style={styles.cardSubtitle}>And get rewards</Text>
            </View>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Invite</Text>
            </TouchableOpacity>
          </View>
          <HealthCompanionCard colors={colors} styles={styles} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
