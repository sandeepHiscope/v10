

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
  ImageStyle,
  Image,
  TextInput,
} from 'react-native';
import {
  LayoutGrid,
  Calendar,
  Beaker,
  ClipboardList,
  FileText,
  User,
  ChevronRight,
  Search,
  FlaskConical,
} from 'lucide-react-native';
import { Colors } from "@/colors";

// --- MOCK DATA ---
const MOCK_DATA = {
    dashboard: {
        stats: [
            { label: 'Total Requests', value: '24' },
            { label: 'Pending', value: '8' },
            { label: 'In Progress', value: '5' },
            { label: 'Completed', value: '11' },
        ],
        appointments: [
            { id: '1', patientName: 'Indhu Yadav', time: '5:30 AM', date: '04 Apr at 9:40' },
            { id: '2', patientName: 'Teju', time: '5:30 AM', date: '24 Apr at 2:45' },
        ],
    },
    samples: [
        { id: 'SC001', patient: 'Manoj Kumar', type: 'Blood Test', date: 'May 05, 2025', status: 'Collected', priority: 'Normal' },
        { id: 'SC002', patient: 'Priya Sharma', type: 'Urine Analysis', date: 'May 06, 2025', status: 'Pending', priority: 'Urgent' },
        { id: 'SC003', patient: 'Rahul Singh', type: 'Complete Blood Count', date: 'May 06, 2025', status: 'Pending', priority: 'High' },
    ],
    inventory: [
        { id: 'INV001', name: 'Test Tubes', category: 'Collection', quantity: 350, status: 'In Stock' },
        { id: 'INV002', name: 'Latex Gloves', category: 'Safety', quantity: 42, status: 'Low Stock' },
        { id: 'INV003', name: 'HBA1c Reagent', category: 'Reagent', quantity: 15, status: 'In Stock' },
        { id: 'INV004', name: 'Microscope Slides', category: 'Equipment', quantity: 0, status: 'Out of Stock' },
    ],
    requests: [
        { id: 'TR001', patient: 'Amit Kumar', physician: 'Dr. Ravi Desai', type: 'Complete Blood Count', priority: 'Urgent', status: 'Pending' },
        { id: 'TR002', patient: 'Neha Patel', physician: 'Dr. Sunita Sharma', type: 'Liver Function Test', priority: 'Normal', status: 'In Progress' },
    ],
    reports: [
        { id: 'R001', patient: 'Vikram Singh', type: 'Complete Blood Count', referredBy: 'Dr. Priya Sharma', status: 'Completed' },
        { id: 'R002', patient: 'Anjali Gupta', type: 'Liver Function Test', referredBy: 'Dr. Raj Kumar', status: 'Pending Review' },
    ],
    profile: {
        name: 'Rakesh Kumar',
        specialization: 'Clinical Pathology',
        license: 'MLT-2023-45678',
        email: 'rakesh.kumar@vdrlabs.com',
        phone: '9876543210',
        gender: 'Male',
        address: '204, Sunshine Apartments, Banjara Hills, Hyderabad',
        licenseExpiry: 'December 31, 2026',
        education: 'B.Sc. Medical Laboratory Technology',
    }
};

const NAV_ITEMS = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { key: 'samples', label: 'Sample Collection', icon: Beaker },
    { key: 'inventory', label: 'Lab Inventory', icon: ClipboardList },
    { key: 'requests', label: 'Lab Test Requests', icon: FlaskConical },
    { key: 'reports', label: 'Lab Reports', icon: FileText },
    { key: 'profile', label: 'Technician Profile', icon: User },
];

// --- TYPES ---
type ViewKey = 'dashboard' | 'samples' | 'inventory' | 'requests' | 'reports' | 'profile';
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
    statGrid: ViewStyle;
    statCard: ViewStyle;
    statValue: TextStyle;
    statLabel: TextStyle;
    sectionTitle: TextStyle;
    appointmentCard: ViewStyle;
    patientName: TextStyle;
    appointmentMeta: TextStyle;
    tableHeader: ViewStyle;
    tableHeaderText: TextStyle;
    tableRow: ViewStyle;
    tableCell: TextStyle;
    statusBadge: ViewStyle;
    statusBadgeText: TextStyle;
    searchContainer: ViewStyle;
    searchInput: TextStyle;
    actionButton: ViewStyle;
    buttonText: TextStyle;
    profileHeader: ViewStyle;
    profileImage: ImageStyle;
    profileName: TextStyle;
    profileMeta: TextStyle;
    infoRow: ViewStyle;
    infoLabel: TextStyle;
    infoValue: TextStyle;
};

// --- STYLESHEET ---
const getStyles = (colors: typeof Colors.dark): Styles => StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.background },
    container: { flex: 1 },
    navContainer: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: colors.border },
    navScrollView: { paddingHorizontal: 16 },
    navItem: { alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, minWidth: 80 },
    activeNavItem: { backgroundColor: colors.tint },
    navText: { color: colors.textSecondary, marginTop: 4, fontSize: 12, textAlign: 'center' },
    activeNavText: { color: colors.white },
    content: { flex: 1, padding: 16 },
    headerTitle: { fontSize: 24, fontWeight: 'bold', color: colors.text, marginBottom: 24, textAlign: 'center' },
    card: { backgroundColor: colors.card, borderRadius: 12, padding: 16, marginBottom: 16 },
    statGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    statCard: { backgroundColor: colors.card, borderRadius: 12, padding: 16, width: '48%', marginBottom: 12, alignItems: 'center' },
    statValue: { fontSize: 28, fontWeight: 'bold', color: colors.tint },
    statLabel: { color: colors.textSecondary, marginTop: 4 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: colors.text, marginBottom: 16 },
    appointmentCard: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    patientName: { fontSize: 16, fontWeight: '600', color: colors.text },
    appointmentMeta: { fontSize: 14, color: colors.textSecondary, marginTop: 4 },
    tableHeader: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.border, paddingBottom: 8, marginBottom: 8 },
    tableHeaderText: { color: colors.textSecondary, fontWeight: 'bold' },
    tableRow: { flexDirection: 'row', paddingVertical: 12, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.border },
    tableCell: { color: colors.text },
    statusBadge: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 6, overflow: 'hidden', alignSelf: 'flex-start' },
    statusBadgeText: { color: colors.white, fontSize: 12, fontWeight: 'bold' },
    searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderRadius: 12, paddingHorizontal: 12, marginBottom: 16 },
    searchInput: { flex: 1, height: 48, color: colors.text, fontSize: 16, marginLeft: 8 },
    actionButton: { backgroundColor: colors.tint, paddingVertical: 8, paddingHorizontal: 20, borderRadius: 8 },
    buttonText: { color: colors.white, fontWeight: 'bold' },
    profileHeader: { alignItems: 'center', marginBottom: 24 },
    profileImage: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: colors.tint, marginBottom: 12 },
    profileName: { fontSize: 22, fontWeight: 'bold', color: colors.text },
    profileMeta: { color: colors.textSecondary, textAlign: 'center' },
    infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
    infoLabel: { color: colors.textSecondary, fontSize: 16 },
    infoValue: { color: colors.text, fontSize: 16, fontWeight: '600', textAlign: 'right', flex: 1 },
});

// --- VIEWS ---
const DashboardView = ({ styles, colors }: { styles: Styles, colors: typeof Colors.dark }) => (
    <>
        <View style={styles.statGrid}>
            {MOCK_DATA.dashboard.stats.map(stat => (
                <View key={stat.label} style={styles.statCard}><Text style={styles.statValue}>{stat.value}</Text><Text style={styles.statLabel}>{stat.label}</Text></View>
            ))}
        </View>
        <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Upcoming Appointments</Text>
        {MOCK_DATA.dashboard.appointments.map(item => (
            <TouchableOpacity key={item.id} style={[styles.card, styles.appointmentCard]}>
                <View style={{ flex: 1 }}><Text style={styles.patientName}>{item.patientName}</Text><Text style={styles.appointmentMeta}>{item.time}</Text></View>
                <Text style={styles.appointmentMeta}>{item.date}</Text><ChevronRight size={20} color={colors.textSecondary} />
            </TouchableOpacity>
        ))}
    </>
);

const SampleCollectionView = ({ styles, colors }: { styles: Styles, colors: typeof Colors.dark }) => (
    <View style={styles.card}>
        <View style={styles.tableHeader}><Text style={[styles.tableHeaderText, { flex: 2 }]}>Patient</Text><Text style={[styles.tableHeaderText, { flex: 1 }]}>Status</Text><Text style={[styles.tableHeaderText, { flex: 1, textAlign: 'right' }]}>Priority</Text></View>
        {MOCK_DATA.samples.map(s => (
            <View key={s.id} style={styles.tableRow}>
                <View style={{ flex: 2 }}><Text style={styles.tableCell}>{s.patient}</Text><Text style={styles.appointmentMeta}>{s.type}</Text></View>
                <View style={{ flex: 1 }}><View style={[styles.statusBadge, { backgroundColor: s.status === 'Collected' ? colors.accent : colors.warning }]}><Text style={styles.statusBadgeText}>{s.status}</Text></View></View>
                <Text style={[styles.tableCell, { flex: 1, textAlign: 'right', color: s.priority === 'Urgent' || s.priority === 'High' ? colors.danger : colors.text }]}>{s.priority}</Text>
            </View>
        ))}
    </View>
);

const InventoryView = ({ styles, colors }: { styles: Styles, colors: typeof Colors.dark }) => (
     <View style={styles.card}>
        <View style={styles.tableHeader}><Text style={[styles.tableHeaderText, { flex: 2 }]}>Item</Text><Text style={[styles.tableHeaderText, { flex: 1 }]}>Qty</Text><Text style={[styles.tableHeaderText, { flex: 1 }]}>Status</Text></View>
        {MOCK_DATA.inventory.map(i => (
            <View key={i.id} style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>{i.name}</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>{i.quantity}</Text>
                <View style={{ flex: 1 }}><View style={[styles.statusBadge, { backgroundColor: i.status === 'In Stock' ? colors.accent : i.status === 'Low Stock' ? colors.warning : colors.danger }]}><Text style={styles.statusBadgeText}>{i.status}</Text></View></View>
            </View>
        ))}
    </View>
);

const RequestsView = ({ styles, colors }: { styles: Styles, colors: typeof Colors.dark }) => (
     <View style={styles.card}>
        <View style={styles.tableHeader}><Text style={[styles.tableHeaderText, { flex: 1.5 }]}>Patient</Text><Text style={[styles.tableHeaderText, { flex: 2 }]}>Test</Text><Text style={[styles.tableHeaderText, { flex: 1 }]}>Status</Text></View>
        {MOCK_DATA.requests.map(r => (
            <View key={r.id} style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>{r.patient}</Text>
                <Text style={[styles.tableCell, { flex: 2 }]}>{r.type}</Text>
                <View style={{ flex: 1 }}><View style={[styles.statusBadge, { backgroundColor: r.status === 'Pending' ? colors.warning : colors.tint }]}><Text style={styles.statusBadgeText}>{r.status}</Text></View></View>
            </View>
        ))}
    </View>
);

const ReportsView = ({ styles, colors }: { styles: Styles, colors: typeof Colors.dark }) => (
     <View style={styles.card}>
        <View style={styles.tableHeader}><Text style={[styles.tableHeaderText, { flex: 1.5 }]}>Patient</Text><Text style={[styles.tableHeaderText, { flex: 2 }]}>Referred By</Text><Text style={[styles.tableHeaderText, { flex: 1.5 }]}>Status</Text></View>
        {MOCK_DATA.reports.map(r => (
            <View key={r.id} style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>{r.patient}</Text>
                <Text style={[styles.tableCell, { flex: 2 }]}>{r.referredBy}</Text>
                <View style={{ flex: 1.5 }}><View style={[styles.statusBadge, { backgroundColor: r.status === 'Completed' ? colors.accent : colors.warning }]}><Text style={styles.statusBadgeText}>{r.status}</Text></View></View>
            </View>
        ))}
    </View>
);

const ProfileView = ({ styles }: { styles: Styles }) => {
    const profile = MOCK_DATA.profile;
    return (
        <View>
            <View style={styles.profileHeader}>
                <Image source={{ uri: 'https://placehold.co/100x100/3498DB/FFFFFF?text=RK' }} style={styles.profileImage} />
                <Text style={styles.profileName}>{profile.name}</Text>
                <Text style={styles.profileMeta}>{profile.specialization} | {profile.license}</Text>
            </View>
            <View style={styles.card}>
                <Text style={[styles.sectionTitle, { marginBottom: 8 }]}>Personal Information</Text>
                <View style={styles.infoRow}><Text style={styles.infoLabel}>Email</Text><Text style={styles.infoValue}>{profile.email}</Text></View>
                <View style={styles.infoRow}><Text style={styles.infoLabel}>Phone</Text><Text style={styles.infoValue}>{profile.phone}</Text></View>
                <View style={[styles.infoRow, { borderBottomWidth: 0 }]}><Text style={styles.infoLabel}>Address</Text><Text style={styles.infoValue}>{profile.address}</Text></View>
            </View>
        </View>
    )
};


// --- MAIN COMPONENT ---
export default function DiagnosisDashboardScreen() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'dark'];
    const styles = getStyles(colors);
    const [activeView, setActiveView] = useState<ViewKey>('dashboard');

    const renderContent = () => {
        switch (activeView) {
            case 'dashboard': return <DashboardView styles={styles} colors={colors} />;
            case 'samples': return <SampleCollectionView styles={styles} colors={colors} />;
            case 'inventory': return <InventoryView styles={styles} colors={colors} />;
            case 'requests': return <RequestsView styles={styles} colors={colors} />;
            case 'reports': return <ReportsView styles={styles} colors={colors} />;
            case 'profile': return <ProfileView styles={styles} />;
            default: return <DashboardView styles={styles} colors={colors} />;
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
