
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  useColorScheme,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ViewStyle,
  TextStyle,
  TextInput,
  Image,
  ImageStyle,
} from 'react-native';
import {
  LayoutGrid,
  Calendar,
  Users,
  FileText,
  Video,
  User,
  ChevronRight,
  Pill,
  Shield,
  Search,
} from 'lucide-react-native';
import { Colors } from "@/colors";

// --- MOCK DATA ---
const MOCK_DATA = {
    appointments: [
        { id: '1', patientName: 'Indhu Yadav', time: '9:40 AM', date: '04 Apr', type: 'Patient Visit', icon: User },
        { id: '2', patientName: 'Teju', time: '2:45 PM', date: '24 Apr', type: 'Prescription', icon: Pill },
        { id: '3', patientName: 'Ramesh', time: '2:05 PM', date: '19 Apr', type: 'Insurance', icon: Shield },
    ],
    patients: [
        { id: 'P-001', name: 'Raja Singh', lastVisit: 'Apr 04, 2025' },
        { id: 'P-002', name: 'Salman', lastVisit: 'Apr 24, 2025' },
        { id: 'P-003', name: 'Sowmith', lastVisit: 'Apr 19, 2025' },
    ],
    prescriptions: [
        { id: 'rx-1', patient: 'Indhu Yadav', medication: 'Amoxicillin', dosage: '500mg, 3x daily', created: 'Apr 04, 2025', status: 'Active' },
        { id: 'rx-2', patient: 'Teju', medication: 'Lisinopril', dosage: '10mg, daily', created: 'Apr 24, 2025', status: 'Active' },
    ],
    teleconsultations: {
        upcoming: [{ id: 'tc-1', patient: 'Indhu Yadav', time: '04 Apr, at 9:40' }],
        past: [{ id: 'tc-2', patient: 'Jony', time: '19 Apr, at 2:05' }, { id: 'tc-3', patient: 'Raj', time: '15 Apr, at 11:30' }],
    },
    profile: {
        name: 'Dr. John Doe',
        specialty: 'Cardiologist',
        license: 'VHC-12345',
        email: 'john.doe@vhc.app',
        phone: '+91 98765 43210',
        gender: 'Male',
        address: '123 Health St, Wellness City',
        medLicenseNo: 'MD-54321',
        licenseExpiry: 'Dec 31, 2028',
        specialization: 'Interventional Cardiology',
    }
};

const NAV_ITEMS = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { key: 'appointments', label: 'Appointments', icon: Calendar },
    { key: 'patients', label: 'Patients', icon: Users },
    { key: 'prescriptions', label: 'Prescriptions', icon: FileText },
    { key: 'teleconsultations', label: 'Teleconsultations', icon: Video },
    { key: 'profile', label: 'Profile', icon: User },
];

// --- TYPES ---
type ViewKey = 'dashboard' | 'appointments' | 'patients' | 'prescriptions' | 'teleconsultations' | 'profile';
type Styles = {
    // View styles
    safeArea: ViewStyle;
    container: ViewStyle;
    navContainer: ViewStyle;
    navScrollView: ViewStyle;
    navItem: ViewStyle;
    activeNavItem: ViewStyle;
    content: ViewStyle;
    section: ViewStyle;
    sectionHeader: ViewStyle;
    card: ViewStyle;
    appointmentCard: ViewStyle;
    appointmentIcon: ViewStyle;
    appointmentDetails: ViewStyle;
    tableHeader: ViewStyle;
    tableRow: ViewStyle;
    statusBadge: ViewStyle;
    searchContainer: ViewStyle;
    teleconsultCard: ViewStyle;
    actionButton: ViewStyle;
    secondaryButton: ViewStyle;
    profileHeader: ViewStyle;
    infoRow: ViewStyle;
    // Image styles
    profileImage: ImageStyle;
    // Text styles
    navText: TextStyle;
    activeNavText: TextStyle;
    headerTitle: TextStyle;
    sectionTitle: TextStyle;
    viewAllText: TextStyle;
    patientName: TextStyle;
    appointmentMeta: TextStyle;
    tableHeaderText: TextStyle;
    tableCell: TextStyle;
    statusBadgeText: TextStyle;
    searchInput: TextStyle;
    buttonText: TextStyle;
    profileName: TextStyle;
    profileMeta: TextStyle;
    infoLabel: TextStyle;
    infoValue: TextStyle;
};

// --- STYLESHEET ---
const getStyles = (colors: typeof Colors.dark): Styles => StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.background },
    container: { flex: 1 },
    navContainer: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: colors.border },
    navScrollView: { paddingHorizontal: 16 },
    navItem: { alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
    activeNavItem: { backgroundColor: colors.tint },
    navText: { color: colors.textSecondary, marginTop: 4, fontSize: 12 },
    activeNavText: { color: colors.white },
    content: { flex: 1, padding: 16 },
    headerTitle: { fontSize: 24, fontWeight: 'bold', color: colors.text, marginBottom: 24, textAlign: 'center' },
    section: { marginBottom: 24 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: colors.text },
    viewAllText: { fontSize: 14, color: colors.tint, fontWeight: '600' },
    card: { backgroundColor: colors.card, borderRadius: 12, padding: 16, marginBottom: 12 },
    appointmentCard: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    appointmentIcon: { backgroundColor: colors.border, padding: 12, borderRadius: 24 },
    appointmentDetails: { flex: 1 },
    patientName: { fontSize: 16, fontWeight: '600', color: colors.text },
    appointmentMeta: { fontSize: 14, color: colors.textSecondary, marginTop: 4 },
    tableHeader: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.border, paddingBottom: 8, marginBottom: 8 },
    tableHeaderText: { flex: 1, color: colors.textSecondary, fontWeight: 'bold' },
    tableRow: { flexDirection: 'row', paddingVertical: 12, alignItems: 'center' },
    tableCell: { flex: 1, color: colors.text },
    statusBadge: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 6, overflow: 'hidden', alignSelf: 'flex-start' },
    statusBadgeText: { color: colors.white, fontSize: 12, fontWeight: 'bold' },
    searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderRadius: 12, paddingHorizontal: 12, marginBottom: 16 },
    searchInput: { flex: 1, height: 48, color: colors.text, fontSize: 16, marginLeft: 8 },
    teleconsultCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    actionButton: { backgroundColor: colors.tint, paddingVertical: 8, paddingHorizontal: 20, borderRadius: 8 },
    secondaryButton: { backgroundColor: colors.border },
    buttonText: { color: colors.white, fontWeight: 'bold' },
    profileHeader: { alignItems: 'center', marginBottom: 24 },
    profileImage: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: colors.tint, marginBottom: 12 },
    profileName: { fontSize: 22, fontWeight: 'bold', color: colors.text },
    profileMeta: { color: colors.textSecondary },
    infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
    infoLabel: { color: colors.textSecondary, fontSize: 16 },
    infoValue: { color: colors.text, fontSize: 16, fontWeight: '600' },
});

// --- VIEWS ---
const DashboardOverview = ({ styles, colors }: { styles: Styles; colors: typeof Colors.dark }) => (
    <View>
        <View style={styles.section}>
            <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Upcoming Appointments</Text><TouchableOpacity><Text style={styles.viewAllText}>View All</Text></TouchableOpacity></View>
            {MOCK_DATA.appointments.map(item => (
                <TouchableOpacity key={item.id} style={[styles.card, styles.appointmentCard]}>
                    <View style={styles.appointmentIcon}><item.icon size={24} color={colors.text} /></View>
                    <View style={styles.appointmentDetails}><Text style={styles.patientName}>{item.patientName}</Text><Text style={styles.appointmentMeta}>{`${item.time}, ${item.type}`}</Text></View>
                    <ChevronRight size={20} color={colors.textSecondary} />
                </TouchableOpacity>
            ))}
        </View>
    </View>
);

const PatientsView = ({ styles }: { styles: Styles }) => (
    <View style={styles.card}>
        <View style={styles.searchContainer}><Search size={20} color={Colors.dark.textSecondary} /><TextInput placeholder="Search patients..." placeholderTextColor={Colors.dark.textSecondary} style={styles.searchInput} /></View>
        <View style={styles.tableHeader}><Text style={styles.tableHeaderText}>Name</Text><Text style={styles.tableHeaderText}>ID</Text><Text style={styles.tableHeaderText}>Last Visit</Text><Text style={[styles.tableHeaderText, { textAlign: 'right' }]}>Actions</Text></View>
        {MOCK_DATA.patients.map(p => (
            <View key={p.id} style={styles.tableRow}><Text style={styles.tableCell}>{p.name}</Text><Text style={styles.tableCell}>{p.id}</Text><Text style={styles.tableCell}>{p.lastVisit}</Text><TouchableOpacity><Text style={[styles.tableCell, { color: Colors.dark.tint, textAlign: 'right' }]}>View</Text></TouchableOpacity></View>
        ))}
    </View>
);

const PrescriptionsView = ({ styles, colors }: { styles: Styles, colors: typeof Colors.dark }) => (
    <View style={styles.card}>
        <View style={styles.tableHeader}><Text style={[styles.tableHeaderText, { flex: 1.5 }]}>Patient</Text><Text style={[styles.tableHeaderText, { flex: 1.5 }]}>Medication</Text><Text style={styles.tableHeaderText}>Status</Text></View>
        {MOCK_DATA.prescriptions.map(p => (
            <View key={p.id} style={styles.tableRow}><Text style={[styles.tableCell, { flex: 1.5 }]}>{p.patient}</Text><Text style={[styles.tableCell, { flex: 1.5 }]}>{p.medication}</Text><View style={[styles.statusBadge, { backgroundColor: colors.accent }]}><Text style={styles.statusBadgeText}>{p.status}</Text></View></View>
        ))}
    </View>
);

const TeleconsultationsView = ({ styles, colors }: { styles: Styles, colors: typeof Colors.dark }) => (
    <View>
        <View style={styles.section}><Text style={styles.sectionTitle}>Upcoming Sessions</Text>
            {MOCK_DATA.teleconsultations.upcoming.map(tc => (
                <View key={tc.id} style={[styles.card, styles.teleconsultCard]}><Text style={styles.patientName}>{tc.patient}</Text><TouchableOpacity style={styles.actionButton}><Text style={styles.buttonText}>Join</Text></TouchableOpacity></View>
            ))}
        </View>
        <View style={styles.section}><Text style={styles.sectionTitle}>Post Sessions</Text>
            {MOCK_DATA.teleconsultations.past.map(tc => (
                <View key={tc.id} style={[styles.card, styles.teleconsultCard]}><Text style={styles.patientName}>{tc.patient}</Text><TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}><Text style={[styles.buttonText, { color: colors.text }]}>View Notes</Text></TouchableOpacity></View>
            ))}
        </View>
    </View>
);

const ProfileView = ({ styles, colors }: { styles: Styles, colors: typeof Colors.dark }) => {
    const profile = MOCK_DATA.profile;
    return (
        <View>
            <View style={styles.profileHeader}>
                <Image source={{ uri: 'https://placehold.co/100x100/3498DB/FFFFFF?text=JD' }} style={styles.profileImage} />
                <Text style={styles.profileName}>{profile.name}</Text>
                <Text style={styles.profileMeta}>{profile.specialty} | License: {profile.license}</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Personal Information</Text>
                <View style={styles.infoRow}><Text style={styles.infoLabel}>Email</Text><Text style={styles.infoValue}>{profile.email}</Text></View>
                <View style={styles.infoRow}><Text style={styles.infoLabel}>Phone</Text><Text style={styles.infoValue}>{profile.phone}</Text></View>
                <View style={styles.infoRow}><Text style={styles.infoLabel}>Gender</Text><Text style={styles.infoValue}>{profile.gender}</Text></View>
                <View style={[styles.infoRow, { borderBottomWidth: 0 }]}><Text style={styles.infoLabel}>Address</Text><Text style={[styles.infoValue]} numberOfLines={2}>{profile.address}</Text></View>
            </View>
             <View style={[styles.card, {marginTop: 16}]}>
                <Text style={styles.sectionTitle}>Professional Information</Text>
                <View style={styles.infoRow}><Text style={styles.infoLabel}>Medical License No</Text><Text style={styles.infoValue}>{profile.medLicenseNo}</Text></View>
                <View style={styles.infoRow}><Text style={styles.infoLabel}>License Expiry</Text><Text style={styles.infoValue}>{profile.licenseExpiry}</Text></View>
                <View style={[styles.infoRow, { borderBottomWidth: 0 }]}><Text style={styles.infoLabel}>Specialization</Text><Text style={styles.infoValue}>{profile.specialization}</Text></View>
            </View>
        </View>
    )
};


// --- MAIN COMPONENT ---
export default function DoctorDashboardScreen() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'dark'];
    const styles = getStyles(colors);
    const [activeView, setActiveView] = useState<ViewKey>('dashboard');

    const renderContent = () => {
        switch (activeView) {
            case 'dashboard': return <DashboardOverview styles={styles} colors={colors} />;
            case 'patients': return <PatientsView styles={styles} />;
            case 'prescriptions': return <PrescriptionsView styles={styles} colors={colors} />;
            case 'teleconsultations': return <TeleconsultationsView styles={styles} colors={colors} />;
            case 'profile': return <ProfileView styles={styles} colors={colors} />;
            default: return <DashboardOverview styles={styles} colors={colors} />;
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.navContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.navScrollView}>
                    {NAV_ITEMS.map(item => (
                        <TouchableOpacity key={item.key} style={[styles.navItem, activeView === item.key && styles.activeNavItem]} onPress={() => setActiveView(item.key as ViewKey)}>
                            <item.icon size={22} color={activeView === item.key ? colors.white : colors.textSecondary} />
                            <Text style={[styles.navText, activeView === item.key && styles.activeNavText]}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <ScrollView style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.headerTitle}>{NAV_ITEMS.find(i => i.key === activeView)?.label}</Text>
                    {renderContent()}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
