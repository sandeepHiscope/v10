
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  useColorScheme,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowRight,
  Bell,
  QrCode,
  Stethoscope,
  Pill,
  CalendarDays,
  FlaskConical,
  Receipt,
  ShieldCheck,
  HeartPulse,
  Gift,
  UserPlus,
  FileText,
  Video,
  ChevronRight,
} from 'lucide-react-native';
import { Colors } from '../../constants/Colors';

// --- TYPES ---
type Styles = {
  safeArea: ViewStyle;
  container: ViewStyle;
  header: ViewStyle;
  headerLeft: ViewStyle;
  profileImage: ImageStyle;
  headerIcons: ViewStyle;
  promoCarousel: ViewStyle;
  promoBanner: ViewStyle;
  promoTitle: TextStyle;
  promoSubtitle: TextStyle;
  promoButton: ViewStyle;
  promoButtonText: TextStyle;
  section: ViewStyle;
  sectionTitle: TextStyle;
  gridContainer: ViewStyle;
  gridItem: ViewStyle;
  gridIconContainer: ViewStyle;
  gridLabel: TextStyle;
  twoColumnContainer: ViewStyle;
  customColumnContainer: ViewStyle;
  infoCard: ViewStyle;
  infoCardIcon: ViewStyle;
  infoCardTextContainer: ViewStyle;
  infoCardTitle: TextStyle;
  infoCardSubtitle: TextStyle;
};
type GridItemProps = { icon: React.ElementType; label: string; styles: Styles; colors: typeof Colors.dark; };
type SectionProps = { title: string; children: React.ReactNode; styles: Styles; };

// --- MOCK DATA ---
import type { ColorValue } from 'react-native';

const PROMO_BANNERS: {
    title: string;
    subtitle: string;
    colors: [ColorValue, ColorValue] | [ColorValue, ColorValue, ...ColorValue[]];
}[] = [
    { title: 'Full Body Checkup', subtitle: 'Flat 50% OFF + Extra 10%', colors: [Colors.dark.tint, Colors.dark.gradientEnd] },
    { title: 'Consult Top Doctors', subtitle: 'Starting at just ₹199', colors: [Colors.dark.accent, '#27AE60'] },
    { title: 'Order Medicines', subtitle: 'Get up to 25% OFF', colors: [Colors.dark.warning, '#F39C12'] },
];

// --- STYLESHEET ---
const getStyles = (colors: typeof Colors.dark): Styles => StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.background },
    container: { flex: 1 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 50, paddingBottom: 16 },
    headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    profileImage: { width: 40, height: 40, borderRadius: 20 },
    headerIcons: { flexDirection: 'row', gap: 20 },
    promoCarousel: { paddingHorizontal: 16 },
    promoBanner: { width: 300, height: 140, borderRadius: 16, padding: 20, marginRight: 12, justifyContent: 'space-between' },
    promoTitle: { color: colors.white, fontSize: 18, fontWeight: 'bold' },
    promoSubtitle: { color: 'rgba(255, 255, 255, 0.9)', marginTop: 4 },
    promoButton: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 12, backgroundColor: 'rgba(255,255,255,0.2)', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16, alignSelf: 'flex-start' },
    promoButtonText: { color: colors.white, fontWeight: '600', fontSize: 12 },
    section: { backgroundColor: colors.card, borderRadius: 16, marginHorizontal: 16, marginTop: 20, padding: 16 },
    sectionTitle: { color: colors.text, fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
    gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', rowGap: 20 },
    gridItem: { width: '25%', alignItems: 'center' },
    gridIconContainer: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background, marginBottom: 8 },
    gridLabel: { color: colors.textSecondary, fontSize: 12, textAlign: 'center' },
    twoColumnContainer: { flexDirection: 'row', marginHorizontal: 16, marginTop: 20, gap: 16, },
    customColumnContainer: { flexDirection: 'row', marginHorizontal: 16, marginTop: 20, gap: 16 },
    infoCard: { backgroundColor: colors.card, borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 },
    infoCardIcon: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
    infoCardTextContainer: { flex: 1 },
    infoCardTitle: { color: colors.text, fontWeight: 'bold' },
    infoCardSubtitle: { color: colors.textSecondary, fontSize: 12, marginTop: 2 },
});

// --- SUB-COMPONENTS ---
const GridItem = ({ icon: Icon, label, styles, colors }: GridItemProps) => (
    <TouchableOpacity style={styles.gridItem}>
        <View style={styles.gridIconContainer}><Icon size={24} color={colors.tint} /></View>
        <Text style={styles.gridLabel}>{label}</Text>
    </TouchableOpacity>
);

const Section = ({ title, children, styles }: SectionProps) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.gridContainer}>{children}</View>
    </View>
);

// --- MAIN COMPONENT ---
export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'dark'];
  const styles = getStyles(colors);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
            <TouchableOpacity style={styles.headerLeft}>
                <Image source={{ uri: 'https://placehold.co/40x40/0D1117/FFFFFF?text=JD' }} style={styles.profileImage} />
            </TouchableOpacity>
            <View style={styles.headerIcons}>
                <TouchableOpacity><QrCode size={24} color={colors.text} /></TouchableOpacity>
                <TouchableOpacity><Bell size={24} color={colors.text} /></TouchableOpacity>
            </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.promoCarousel}>
            {PROMO_BANNERS.map((banner, index) => (
                <LinearGradient key={index} colors={banner.colors} style={styles.promoBanner}>
                    <View>
                        <Text style={styles.promoTitle}>{banner.title}</Text>
                        <Text style={styles.promoSubtitle}>{banner.subtitle}</Text>
                    </View>
                    <TouchableOpacity style={styles.promoButton}>
                        <Text style={styles.promoButtonText}>Book Now</Text>
                        <ArrowRight size={14} color={colors.white} />
                    </TouchableOpacity>
                </LinearGradient>
            ))}
        </ScrollView>

        <Section title="Primary Care" styles={styles}>
            <GridItem icon={Stethoscope} label="Find a Doctor" styles={styles} colors={colors} />
            <GridItem icon={Video} label="Video Consult" styles={styles} colors={colors} />
            <GridItem icon={CalendarDays} label="Appointments" styles={styles} colors={colors} />
            <GridItem icon={FileText} label="My Reports" styles={styles} colors={colors} />
        </Section>

        <Section title="Pharmacy & Labs" styles={styles}>
            <GridItem icon={Pill} label="Order Medicines" styles={styles} colors={colors} />
            <GridItem icon={FlaskConical} label="Book Lab Test" styles={styles} colors={colors} />
            <GridItem icon={Receipt} label="Bills & Payments" styles={styles} colors={colors} />
            <GridItem icon={ShieldCheck} label="Insurance" styles={styles} colors={colors} />
        </Section>
        
        <View style={styles.twoColumnContainer}>
            <TouchableOpacity style={[styles.infoCard,{width:'60%',height:120}]}>
                <View style={[styles.infoCardIcon, { backgroundColor: colors.warning }]}>
                    <Gift size={22} color={colors.white} />
                </View>
                <View style={styles.infoCardTextContainer}>
                    <Text style={styles.infoCardTitle}>Rewards</Text>
                    <Text style={styles.infoCardSubtitle}>Offers & Cashbacks</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.infoCard,{width:'35%',height:120}]}>
                <View style={[styles.infoCardIcon, { backgroundColor: colors.accent }]}>
                    <UserPlus size={22} color={colors.white} />
                </View>
                <View style={styles.infoCardTextContainer}>
                    <Text style={styles.infoCardTitle}>Refer & Earn</Text>
                    <Text style={styles.infoCardSubtitle}>Get rewards</Text>
                </View>
            </TouchableOpacity>
        </View>
        <View style={styles.customColumnContainer}>
            <TouchableOpacity style={[styles.infoCard,{width:'35%',height:120}]}>
                <View style={[styles.infoCardIcon, { backgroundColor: colors.warning }]}>
                    <Gift size={22} color={colors.white} />
                </View>
                <View style={styles.infoCardTextContainer}>
                    <Text style={styles.infoCardTitle}>SOS</Text>
                    <Text style={styles.infoCardSubtitle}>Offers & Cashbacks</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.infoCard,{width:'60%',height:120}]}>
                <View style={[styles.infoCardIcon, { backgroundColor: colors.accent }]}>
                    <UserPlus size={22} color={colors.white} />
                </View>
                <View style={styles.infoCardTextContainer}>
                    <Text style={styles.infoCardTitle}>Refer & Earn</Text>
                    <Text style={styles.infoCardSubtitle}>Get rewards</Text>
                </View>
            </TouchableOpacity>
        </View>

        <View style={[styles.section, { paddingBottom: 20 }]}>
             <Text style={styles.sectionTitle}>Track Your Health</Text>
             <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', gap: 16}}>
                <View style={[styles.gridIconContainer, {margin: 0, backgroundColor: colors.tint}]}>
                    <HeartPulse size={28} color={colors.white} />
                </View>
                <View style={{flex: 1}}>
                    <Text style={styles.infoCardTitle}>VHC Health Tracker</Text>
                    <Text style={styles.infoCardSubtitle}>Monitor vitals, set reminders & more</Text>
                </View>
                <ChevronRight size={20} color={colors.textSecondary} />
             </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
