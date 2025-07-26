import { Colors } from "@/colors";
import {
  Bell,
  Calendar,
  Clock,
  Download,
  FileText,
  FlaskConical,
  MessageSquare,
  Pill,
  User,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  ImageStyle,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
} from "react-native";

// --- MOCK DATA ---
const MOCK_DATA = {
  consultations: [
    {
      id: "c1",
      doctor: "Dr. Robert Johnson",
      type: "Video Consultation",
      time: "30 Apr 2025 at 9:15 AM",
      status: "Upcoming",
    },
    {
      id: "c2",
      doctor: "Dr. Emily Wilson",
      type: "In-person Appointment",
      time: "2 May 2025 at 11:00 AM",
      status: "Upcoming",
    },
    {
      id: "c3",
      doctor: "Dr. Ben Carter",
      type: "Video Consultation",
      time: "15 Apr 2025 at 3:00 PM",
      status: "Past",
    },
  ],
  reports: [
    {
      id: "r1",
      name: "Blood Test Report",
      date: "15 Apr 2025",
      type: "PDF",
      size: "2.3 MB",
    },
    {
      id: "r2",
      name: "X-Ray Results",
      date: "10 Apr 2025",
      type: "DICOM",
      size: "8.7 MB",
    },
    {
      id: "r3",
      name: "MRI Scan Report",
      date: "5 Apr 2025",
      type: "PDF",
      size: "4.1 MB",
    },
  ],
  prescriptions: [
    {
      id: "p1",
      name: "Amoxicillin",
      details: "500mg - Three times daily",
      duration: "7 days",
      notes: "Take with food",
      status: "Current",
    },
    {
      id: "p2",
      name: "Ibuprofen",
      details: "400mg - Every 6 hours as needed",
      duration: "5 days",
      notes: "For pain and inflammation",
      status: "Current",
    },
    {
      id: "p3",
      name: "Metformin",
      details: "500mg - Twice daily",
      duration: "30 days",
      notes: "After meals",
      status: "Past",
    },
  ],
  notifications: [
    {
      id: "n1",
      text: "Upcoming appointment with Dr. Robert Johnson tomorrow at 9:15 AM",
      time: "2 hours ago",
      icon: Calendar,
    },
    {
      id: "n2",
      text: "New lab results available for Emily Wilson",
      time: "5 hours ago",
      icon: FlaskConical,
    },
    {
      id: "n3",
      text: "Don't forget to review Michael Brown's prescription",
      time: "1 day ago",
      icon: Pill,
    },
  ],
  profile: {
    name: "Mohan Kumar",
    age: 30,
    email: "mohan.kumar@example.com",
    phone: "+123 456 7890",
    address: "123, Main Street, City, Country",
    image: "https://placehold.co/100x100/3498DB/FFFFFF?text=MK",
  },
};

const NAV_ITEMS = [
  { key: "consultation", label: "Consultation", icon: MessageSquare },
  { key: "reports", label: "Diagnosis Reports", icon: FileText },
  { key: "prescriptions", label: "Prescriptions", icon: Pill },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "profile", label: "Profile", icon: User },
];

// --- TYPES ---
type ViewKey =
  | "consultation"
  | "reports"
  | "prescriptions"
  | "notifications"
  | "profile";
type Styles = {
  safeArea: ViewStyle;
  container: ViewStyle;
  navContainer: ViewStyle;
  navScrollView: ViewStyle;
  navItem: ViewStyle;
  activeNavItem: ViewStyle;
  navText: TextStyle;
  activeNavText: TextStyle;
  content: ViewStyle;
  headerTitle: TextStyle;
  card: ViewStyle;
  subHeader: ViewStyle;
  subTab: ViewStyle;
  activeSubTab: ViewStyle;
  subTabText: TextStyle;
  activeSubTabText: TextStyle;
  consultationCard: ViewStyle;
  doctorName: TextStyle;
  metaInfo: ViewStyle;
  metaText: TextStyle;
  viewDetails: TextStyle;
  tableHeader: ViewStyle;
  tableHeaderText: TextStyle;
  tableRow: ViewStyle;
  tableCell: TextStyle;
  prescriptionCard: ViewStyle;
  prescriptionName: TextStyle;
  notificationItem: ViewStyle;
  notificationIcon: ViewStyle;
  notificationText: TextStyle;
  notificationTime: TextStyle;
  profileHeader: ViewStyle;
  profileImage: ImageStyle;
  profileName: TextStyle;
  infoRow: ViewStyle;
  infoLabel: TextStyle;
  infoValue: TextStyle;
};

// --- STYLESHEET ---
const getStyles = (colors: typeof Colors.dark): Styles =>
  StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.background },
    container: { flex: 1 },
    navContainer: {
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    navScrollView: { paddingHorizontal: 16 },
    navItem: {
      alignItems: "center",
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
    },
    activeNavItem: { backgroundColor: colors.tint },
    navText: { color: colors.textSecondary, marginTop: 4, fontSize: 12 },
    activeNavText: { color: colors.white },
    content: { flex: 1, padding: 16 },
    headerTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 24,
      textAlign: "center",
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
    },
    subHeader: { flexDirection: "row", gap: 12, marginBottom: 16 },
    subTab: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
    activeSubTab: { backgroundColor: colors.tint },
    subTabText: { color: colors.textSecondary, fontWeight: "600" },
    activeSubTabText: { color: colors.white },
    consultationCard: { gap: 8 },
    doctorName: { fontSize: 18, fontWeight: "bold", color: colors.text },
    metaInfo: { flexDirection: "row", alignItems: "center", gap: 8 },
    metaText: { color: colors.textSecondary },
    viewDetails: { color: colors.tint, fontWeight: "bold", marginTop: 12 },
    tableHeader: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      paddingBottom: 8,
      marginBottom: 8,
    },
    tableHeaderText: { color: colors.textSecondary, fontWeight: "bold" },
    tableRow: {
      flexDirection: "row",
      paddingVertical: 12,
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    tableCell: { color: colors.text },
    prescriptionCard: {
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      paddingBottom: 16,
    },
    prescriptionName: { fontSize: 18, fontWeight: "bold", color: colors.text },
    notificationItem: { flexDirection: "row", alignItems: "center", gap: 16 },
    notificationIcon: {
      backgroundColor: colors.border,
      padding: 12,
      borderRadius: 24,
    },
    notificationText: { flex: 1, color: colors.text },
    notificationTime: {
      color: colors.textSecondary,
      fontSize: 12,
      marginTop: 4,
    },
    profileHeader: { alignItems: "center", marginBottom: 24 },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: colors.tint,
      marginBottom: 12,
    },
    profileName: { fontSize: 22, fontWeight: "bold", color: colors.text },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    infoLabel: { color: colors.textSecondary, fontSize: 16 },
    infoValue: { color: colors.text, fontSize: 16, fontWeight: "600" },
  });

// --- VIEWS ---
const ConsultationView = ({ styles }: { styles: Styles }) => {
  const [tab, setTab] = useState("Upcoming");
  const filtered = MOCK_DATA.consultations.filter((c) => c.status === tab);
  return (
    <View>
      <View style={styles.subHeader}>
        {["Upcoming", "Past"].map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.subTab, tab === t && styles.activeSubTab]}
            onPress={() => setTab(t)}
          >
            <Text
              style={[styles.subTabText, tab === t && styles.activeSubTabText]}
            >
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {filtered.map((c) => (
        <View key={c.id} style={[styles.card, styles.consultationCard]}>
          <Text style={styles.doctorName}>{c.doctor}</Text>
          <View style={styles.metaInfo}>
            <Clock size={14} color={Colors.dark.textSecondary} />
            <Text style={styles.metaText}>{c.time}</Text>
          </View>
          <View style={styles.metaInfo}>
            <MessageSquare size={14} color={Colors.dark.textSecondary} />
            <Text style={styles.metaText}>{c.type}</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.viewDetails}>View Details</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const ReportsView = ({ styles }: { styles: Styles }) => (
  <View style={styles.card}>
    <View style={styles.tableHeader}>
      <Text style={[styles.tableHeaderText, { flex: 2 }]}>Report Name</Text>
      <Text style={[styles.tableHeaderText, { flex: 1.5 }]}>Date</Text>
      <Text style={[styles.tableHeaderText, { flex: 1, textAlign: "right" }]}>
        Action
      </Text>
    </View>
    {MOCK_DATA.reports.map((r) => (
      <View key={r.id} style={styles.tableRow}>
        <View style={{ flex: 2 }}>
          <Text style={styles.tableCell}>{r.name}</Text>
          <Text style={styles.metaText}>{`${r.type}, ${r.size}`}</Text>
        </View>
        <Text style={[styles.tableCell, { flex: 1.5 }]}>{r.date}</Text>
        <TouchableOpacity style={{ flex: 1, alignItems: "flex-end" }}>
          <Download size={20} color={Colors.dark.tint} />
        </TouchableOpacity>
      </View>
    ))}
  </View>
);

const PrescriptionsView = ({ styles }: { styles: Styles }) => {
  const [tab, setTab] = useState("Current");
  const filtered = MOCK_DATA.prescriptions.filter((p) => p.status === tab);
  return (
    <View style={styles.card}>
      <View style={styles.subHeader}>
        {["Current", "Past"].map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.subTab, tab === t && styles.activeSubTab]}
            onPress={() => setTab(t)}
          >
            <Text
              style={[styles.subTabText, tab === t && styles.activeSubTabText]}
            >
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {filtered.map((p) => (
        <View key={p.id} style={styles.prescriptionCard}>
          <Text style={styles.prescriptionName}>{p.name}</Text>
          <Text style={styles.metaText}>{p.details}</Text>
          <Text style={styles.metaText}>Duration: {p.duration}</Text>
          <Text style={styles.metaText}>Notes: {p.notes}</Text>
        </View>
      ))}
    </View>
  );
};

const NotificationsView = ({
  styles,
  colors,
}: {
  styles: Styles;
  colors: typeof Colors.dark;
}) => (
  <View style={styles.card}>
    {MOCK_DATA.notifications.map((n) => (
      <View key={n.id} style={[styles.tableRow, styles.notificationItem]}>
        <View style={styles.notificationIcon}>
          <n.icon size={22} color={colors.text} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.notificationText}>{n.text}</Text>
          <Text style={styles.notificationTime}>{n.time}</Text>
        </View>
      </View>
    ))}
  </View>
);

const ProfileView = ({ styles }: { styles: Styles }) => {
  const profile = MOCK_DATA.profile;
  return (
    <View>
      <View style={styles.profileHeader}>
        <Image source={{ uri: profile.image }} style={styles.profileImage} />
        <Text style={styles.profileName}>{profile.name}</Text>
        <Text style={styles.metaText}>Age: {profile.age}</Text>
      </View>
      <View style={styles.card}>
        <Text
          style={[
            styles.headerTitle,
            { textAlign: "left", fontSize: 20, marginBottom: 8 },
          ]}
        >
          Personal Information
        </Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{profile.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Phone</Text>
          <Text style={styles.infoValue}>{profile.phone}</Text>
        </View>
        <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
          <Text style={styles.infoLabel}>Address</Text>
          <Text
            style={[styles.infoValue, { flex: 1, textAlign: "right" }]}
            numberOfLines={2}
          >
            {profile.address}
          </Text>
        </View>
      </View>
    </View>
  );
};

// --- MAIN COMPONENT ---
export default function UserDashboardScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "dark"];
  const styles = getStyles(colors);
  const [activeView, setActiveView] = useState<ViewKey>("consultation");

  const renderContent = () => {
    switch (activeView) {
      case "consultation":
        return <ConsultationView styles={styles} />;
      case "reports":
        return <ReportsView styles={styles} />;
      case "prescriptions":
        return <PrescriptionsView styles={styles} />;
      case "notifications":
        return <NotificationsView styles={styles} colors={colors} />;
      case "profile":
        return <ProfileView styles={styles} />;
      default:
        return <ConsultationView styles={styles} />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.navScrollView}
        >
          {NAV_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.key}
              style={[
                styles.navItem,
                activeView === item.key && styles.activeNavItem,
              ]}
              onPress={() => setActiveView(item.key as ViewKey)}
            >
              <item.icon
                size={22}
                color={
                  activeView === item.key ? colors.white : colors.textSecondary
                }
              />
              <Text
                style={[
                  styles.navText,
                  activeView === item.key && styles.activeNavText,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.headerTitle}>
            {NAV_ITEMS.find((i) => i.key === activeView)?.label}
          </Text>
          {renderContent()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
