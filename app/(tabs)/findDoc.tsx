
import React, { useEffect, useMemo, useReducer, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  useColorScheme,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  FlatList,
  Modal,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  ImageStyle,
  Image,
} from 'react-native';
import {
  Search,
  SlidersHorizontal,
  X,
  Star,
  MapPin,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  CheckCircle,
} from 'lucide-react-native';
import { Colors } from "@/colors";
import { useFocusEffect } from 'expo-router';

// --- MOCK DATA & CONSTANTS ---
const DoctorDetails = [
    { id: '1', name: "Dr. A-02130936-Tharun", experience: "12", speciality: "Cardiologist", city: "Hyderabad", state: "Telangana", languages: ["English", "Hindi", "Telugu"], rating: 4.8, consultationFee: 900, doctorPhoto: null },
    { id: '2', name: "Dr. A-02130938-Pavan Kumar", experience: "8", speciality: "Gastroenterologist", city: "Bengaluru", state: "Karnataka", languages: ["English", "Hindi", "Kannada"], rating: 4.2, consultationFee: 750, doctorPhoto: null },
    { id: '3', name: "Dr. A-02130940-Vamshi Krishna", experience: "15", speciality: "Gastroenterologist", city: "Shimla", state: "Himachal Pradesh", languages: ["English", "Hindi", "Pahari"], rating: 4.9, consultationFee: 950, doctorPhoto: null },
    { id: '4', name: "Dr. A-02191280-Krishna Chaitanya", experience: "10", speciality: "Dentist", city: "Bhopal", state: "Madhya Pradesh", languages: ["English", "Hindi"], rating: 4.5, consultationFee: 800, doctorPhoto: null },
    { id: '5', name: "Dr. Priya Sharma", experience: "7", speciality: "Dermatologist", city: "Mumbai", state: "Maharashtra", languages: ["English", "Hindi", "Marathi"], rating: 4.7, consultationFee: 1200, doctorPhoto: null },
    { id: '6', name: "Dr. Rajesh Gupta", experience: "20", speciality: "Orthopedist", city: "Delhi", state: "Delhi", languages: ["English", "Hindi", "Punjabi"], rating: 4.9, consultationFee: 1500, doctorPhoto: null },
];
const SPECIALTIES = ["Cardiologist", "Dentist", "Gynaecologist", "Dermatologist", "Neurologist", "Orthopedist", "Pediatrician", "Pulmonologist", "Gastroenterologist"];
const LOCATIONS = ["Delhi", "Mumbai", "Hyderabad", "Bengaluru", "Shimla", "Bhopal"];
const FEES = [500, 1000, 1500, 2000];
const RATINGS = [5, 4, 3, 2, 1];
const LANGUAGES = ["English", "Hindi", "Tamil", "Telugu", "Marathi", "Kannada"];
const EXPERIENCE = ["0-5", "6-10", "11-15", "16+"];
const defaultUserImage = 'https://placehold.co/100x100/161B22/EFEFEF?text=Dr';
const DOCTORS_PER_PAGE = 5;
const TIME_SLOTS = ["10:00", "10:30", "11:00", "11:30", "12:00", "14:00", "14:30", "15:00", "16:00"];


// --- TYPES AND STATE MANAGEMENT ---

interface Doctor {
  id?: string;
  name?: string;
  speciality?: string;
  experience?: string;
  city?: string;
  state?: string;
  consultationFee?: number;
  rating?: number;
  languages?: string[];
  doctorPhoto?: string | null;
}

interface FilterState {
  searchQuery: string;
  selectedSpecialties: string[];
  selectedLocations: string[];
  selectedFee: number | null;
  selectedExperience: string | null;
  selectedRatings: number[];
  selectedLanguages: string[];
}

const initialFilterState: FilterState = {
  searchQuery: "",
  selectedSpecialties: [],
  selectedLocations: [],
  selectedFee: null,
  selectedExperience: null,
  selectedRatings: [],
  selectedLanguages: [],
};

const ACTIONS = {
  SET_FIELD: "set_field",
  TOGGLE_ARRAY_ITEM: "toggle_array_item",
  CLEAR_ALL: "clear_all",
};

function filterReducer(state: FilterState, action: { type: string; payload: any }): FilterState {
  switch (action.type) {
    case ACTIONS.SET_FIELD:
      return { ...state, [action.payload.field]: action.payload.value };
    case ACTIONS.TOGGLE_ARRAY_ITEM: {
      const { field, value } = action.payload;
      const currentValues = state[field as keyof FilterState] as any[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];
      return { ...state, [field]: newValues };
    }
    case ACTIONS.CLEAR_ALL:
      return { ...initialFilterState };
    default:
      return state;
  }
}

// --- STYLESHEET ---
type ScreenStyles = {
    safeArea: ViewStyle; loadingContainer: ViewStyle; header: ViewStyle; searchContainer: ViewStyle; searchInput: TextStyle; filterButton: ViewStyle; listContainer: ViewStyle; doctorCard: ViewStyle; doctorImage: ImageStyle; cardBody: ViewStyle; doctorName: TextStyle; doctorSpecialty: TextStyle; metaRow: ViewStyle; metaItem: ViewStyle; metaText: TextStyle; cardFooter: ViewStyle; feeText: TextStyle; bookButton: ViewStyle; bookButtonText: TextStyle; modalContainer: ViewStyle; modalHeader: ViewStyle; modalTitle: TextStyle; modalCloseButton: ViewStyle; modalContent: ViewStyle; modalFooter: ViewStyle; resultsButton: ViewStyle; resultsButtonText: TextStyle; filterSection: ViewStyle; filterTitle: TextStyle; optionButton: ViewStyle; selectedOptionButton: ViewStyle; optionText: TextStyle; selectedOptionText: TextStyle; optionsContainer: ViewStyle; resultsCountBadge: ViewStyle; resultsCountText: TextStyle; emptyContainer: ViewStyle; emptyText: TextStyle; paginationContainer: ViewStyle; pageButton: ViewStyle; pageText: TextStyle; bookingModalContent: ViewStyle; dateButton: ViewStyle; dateText: TextStyle; dayText: TextStyle; timeSlotButton: ViewStyle; bookingConfirmation: ViewStyle;
};

const getStyles = (colors: typeof Colors.dark): ScreenStyles =>
  StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.background },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
    header: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
    searchContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderRadius: 12, paddingHorizontal: 12 },
    searchInput: { flex: 1, height: 48, color: colors.text, fontSize: 16, marginLeft: 8 },
    filterButton: { backgroundColor: colors.tint, padding: 12, borderRadius: 12 },
    listContainer: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 80 },
    doctorCard: { backgroundColor: colors.card, borderRadius: 16, marginBottom: 16, overflow: 'hidden' },
    doctorImage: { width: 80, height: 80, borderRadius: 12 },
    cardBody: { flexDirection: 'row', padding: 12, gap: 12 },
    doctorName: { fontSize: 18, fontWeight: 'bold', color: colors.text },
    doctorSpecialty: { fontSize: 15, color: colors.tint, marginVertical: 4 },
    metaRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 4 },
    metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    metaText: { color: colors.textSecondary, fontSize: 13 },
    cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.border, padding: 12 },
    feeText: { color: colors.text, fontSize: 16, fontWeight: 'bold' },
    bookButton: { backgroundColor: colors.accent, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
    bookButtonText: { color: colors.white, fontWeight: 'bold' },
    modalContainer: { flex: 1, backgroundColor: colors.background, paddingTop: 50 },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: colors.border },
    modalTitle: { fontSize: 22, fontWeight: 'bold', color: colors.text },
    modalCloseButton: { backgroundColor: colors.card, padding: 8, borderRadius: 20 },
    modalContent: { flex: 1 },
    modalFooter: { flexDirection: 'row', padding: 16, gap: 12, borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.background },
    resultsButton: { flex: 1, backgroundColor: colors.tint, paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
    resultsButtonText: { color: colors.white, fontSize: 16, fontWeight: 'bold' },
    filterSection: { padding: 16, borderBottomWidth: 1, borderBottomColor: colors.border },
    filterTitle: { fontSize: 18, fontWeight: '600', color: colors.text, marginBottom: 12 },
    optionsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    optionButton: { backgroundColor: colors.card, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 20, borderWidth: 1, borderColor: colors.border },
    selectedOptionButton: { backgroundColor: colors.tint, borderColor: colors.tint },
    optionText: { color: colors.textSecondary },
    selectedOptionText: { color: colors.white } as TextStyle,
    resultsCountBadge: { backgroundColor: colors.accent, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
    resultsCountText: { color: colors.white, fontWeight: 'bold', fontSize: 12 },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32, height: 400 },
    emptyText: { color: colors.textSecondary, fontSize: 16, textAlign: 'center' },
    paginationContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 16, gap: 16 },
    pageButton: { padding: 10, backgroundColor: colors.card, borderRadius: 8 },
    pageText: { color: colors.text, fontSize: 16 },
    // Booking Modal Styles
    bookingModalContent: { padding: 16 },
    dateButton: { alignItems: 'center', backgroundColor: colors.card, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: colors.border, width: 70 },
    dateText: { fontSize: 18, fontWeight: 'bold', color: colors.text } as TextStyle,
    dayText: { fontSize: 12, color: colors.textSecondary },
    timeSlotButton: { backgroundColor: colors.card, paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, borderWidth: 1, borderColor: colors.border },
    bookingConfirmation: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 },
  }) as ScreenStyles;

// --- SUB-COMPONENTS ---
const StarRating = ({ rating, styles }: { rating: number; styles: ScreenStyles }) => (
  <View style={styles.metaItem}><Star size={14} color={Colors.dark.warning} fill={Colors.dark.warning} /><Text style={styles.metaText}>{rating.toFixed(1)}</Text></View>
);

const DoctorCard = ({ doctor, styles, onBook }: { doctor: Doctor; styles: ScreenStyles; onBook: (doc: Doctor) => void; }) => (
  <View style={styles.doctorCard}>
    <View style={styles.cardBody}>
      <Image source={{ uri: doctor.doctorPhoto || defaultUserImage }} style={styles.doctorImage} />
      <View style={{ flex: 1 }}>
        <Text style={styles.doctorName}>{doctor.name || 'N/A'}</Text>
        <Text style={styles.doctorSpecialty}>{doctor.speciality || 'N/A'}</Text>
        <View style={styles.metaRow}>
          <View style={styles.metaItem}><Briefcase size={14} color={Colors.dark.textSecondary} /><Text style={styles.metaText}>{doctor.experience || 'N/A'} years</Text></View>
          {doctor.rating && <StarRating rating={doctor.rating} styles={styles} />}
        </View>
        <View style={styles.metaItem}><MapPin size={14} color={Colors.dark.textSecondary} /><Text style={styles.metaText}>{doctor.city || 'N/A'}</Text></View>
      </View>
    </View>
    <View style={styles.cardFooter}>
      <Text style={styles.feeText}>₹{doctor.consultationFee || 'N/A'}</Text>
      <TouchableOpacity style={styles.bookButton} onPress={() => onBook(doctor)}><Text style={styles.bookButtonText}>Book Now</Text></TouchableOpacity>
    </View>
  </View>
);

const BookingModal = ({ visible, onClose, doctor, styles, colors }: { visible: boolean; onClose: () => void; doctor: Doctor | null; styles: ScreenStyles; colors: typeof Colors.dark }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [bookingStatus, setBookingStatus] = useState<'idle' | 'booking' | 'booked'>('idle');

    const next7Days = useMemo(() => {
        return Array.from({ length: 7 }).map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() + i);
            return date;
        });
    }, []);

    useEffect(() => {
        if (visible) {
            // Reset state when modal opens
            setSelectedDate(next7Days[0]);
            setSelectedTime(null);
            setBookingStatus('idle');
        }
    }, [visible]);

    const handleCompleteBooking = () => {
        if (!selectedDate || !selectedTime) {
            alert('Please select a date and time slot.');
            return;
        }
        setBookingStatus('booking');
        setTimeout(() => {
            setBookingStatus('booked');
            setTimeout(() => {
                onClose();
            }, 2000); // Close modal after 2 seconds
        }, 1500); // Simulate booking process
    };

    if (!doctor) return null;

    return (
        <Modal visible={visible} animationType="slide" transparent={false}>
            <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Book Appointment</Text>
                    <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
                        <X size={20} color={colors.text} />
                    </TouchableOpacity>
                </View>
                
                {bookingStatus === 'booked' ? (
                    <View style={styles.bookingConfirmation}>
                        <CheckCircle size={80} color={colors.accent} />
                        <Text style={styles.modalTitle}>Booking Done!</Text>
                        <Text style={styles.metaText}>In Progress - Redirecting to payment...</Text>
                    </View>
                ) : (
                    <>
                        <ScrollView style={styles.modalContent}>
                            <View style={styles.bookingModalContent}>
                                <View style={styles.filterSection}>
                                    <Text style={styles.filterTitle}>Select Date</Text>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                        <View style={styles.optionsContainer}>
                                            {next7Days.map((date, i) => (
                                                <TouchableOpacity key={i} style={[styles.dateButton, selectedDate?.toDateString() === date.toDateString() && styles.selectedOptionButton]} onPress={() => setSelectedDate(date)}>
                                                    <Text style={[styles.dayText, selectedDate?.toDateString() === date.toDateString() && styles.selectedOptionText]}>{date.toLocaleDateString('en-US', { weekday: 'short' })}</Text>
                                                    <Text style={[
                                                        styles.dateText,
                                                        selectedDate?.toDateString() === date.toDateString() ? (styles.selectedOptionText as TextStyle) : undefined
                                                    ]}>{date.getDate()}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </ScrollView>
                                </View>
                                <View style={styles.filterSection}>
                                    <Text style={styles.filterTitle}>Select Time Slot</Text>
                                    <View style={styles.optionsContainer}>
                                        {TIME_SLOTS.map(time => (
                                            <TouchableOpacity key={time} style={[styles.timeSlotButton, selectedTime === time && styles.selectedOptionButton]} onPress={() => setSelectedTime(time)}>
                                                <Text style={[styles.optionText, selectedTime === time && styles.selectedOptionText]}>{time}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>
                                <View style={styles.filterSection}>
                                    <Text style={styles.filterTitle}>Patient Symptoms / Notes</Text>
                                    <TextInput
                                        style={[styles.searchInput, { height: 100, textAlignVertical: 'top', padding: 12 }]}
                                        placeholder="Describe symptoms or any other relevant info..."
                                        placeholderTextColor={colors.textSecondary}
                                        multiline
                                    />
                                </View>
                            </View>
                        </ScrollView>
                        <View style={styles.modalFooter}>
                            <TouchableOpacity style={styles.resultsButton} onPress={handleCompleteBooking} disabled={bookingStatus === 'booking'}>
                                {bookingStatus === 'booking' ? <ActivityIndicator color={colors.white} /> : <Text style={styles.resultsButtonText}>Complete Booking & Pay ₹{doctor.consultationFee}</Text>}
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>
        </Modal>
    );
};


// --- MAIN COMPONENT ---
export default function FindDoctorScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'dark'];
  const styles = getStyles(colors);

  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [bookingModalVisible, setBookingModalVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [filterState, dispatch] = useReducer(filterReducer, initialFilterState);
  const [tempFilterState, setTempFilterState] = useState(initialFilterState);

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      setTimeout(() => {
        setAllDoctors(DoctorDetails);
        setIsLoading(false);
      }, 500);
    }, [])
  );
  
  const getExperienceRange = (exp: string) => {
      const years = parseInt(exp, 10);
      if (years <= 5) return "0-5";
      if (years <= 10) return "6-10";
      if (years <= 15) return "11-15";
      return "16+";
  };

  const applyFilters = (docs: Doctor[], filters: FilterState) => {
    return docs.filter(doc => {
      const searchLower = filters.searchQuery.toLowerCase();
      const nameMatch = doc.name?.toLowerCase().includes(searchLower);
      const specSearchMatch = doc.speciality?.toLowerCase().includes(searchLower);
      const specialtyFilterMatch = filters.selectedSpecialties.length === 0 || filters.selectedSpecialties.includes(doc.speciality!);
      const ratingFilterMatch = filters.selectedRatings.length === 0 || filters.selectedRatings.some(r => doc.rating! >= r);
      const locationFilterMatch = filters.selectedLocations.length === 0 || filters.selectedLocations.includes(doc.city!);
      const feeFilterMatch = filters.selectedFee === null || doc.consultationFee! <= filters.selectedFee;
      const expFilterMatch = filters.selectedExperience === null || getExperienceRange(doc.experience!) === filters.selectedExperience;
      const langFilterMatch = filters.selectedLanguages.length === 0 || filters.selectedLanguages.every(lang => doc.languages?.includes(lang));
      
      return (nameMatch || specSearchMatch) && specialtyFilterMatch && ratingFilterMatch && locationFilterMatch && feeFilterMatch && expFilterMatch && langFilterMatch;
    });
  };

  const filteredDoctors = useMemo(() => applyFilters(allDoctors, filterState), [allDoctors, filterState]);
  const tempFilteredDoctors = useMemo(() => applyFilters(allDoctors, tempFilterState), [allDoctors, tempFilterState]);

  const totalPages = Math.ceil(filteredDoctors.length / DOCTORS_PER_PAGE);
  const paginatedDoctors = filteredDoctors.slice((currentPage - 1) * DOCTORS_PER_PAGE, currentPage * DOCTORS_PER_PAGE);

  const openFilterModal = () => {
    setTempFilterState(filterState);
    setFilterModalVisible(true);
  };

  const handleBookNow = (doctor: Doctor) => {
      setSelectedDoctor(doctor);
      setBookingModalVisible(true);
  };

  const applyFiltersAndClose = () => {
    dispatch({ type: ACTIONS.SET_FIELD, payload: { field: 'selectedSpecialties', value: tempFilterState.selectedSpecialties }});
    dispatch({ type: ACTIONS.SET_FIELD, payload: { field: 'selectedRatings', value: tempFilterState.selectedRatings }});
    dispatch({ type: ACTIONS.SET_FIELD, payload: { field: 'selectedLocations', value: tempFilterState.selectedLocations }});
    dispatch({ type: ACTIONS.SET_FIELD, payload: { field: 'selectedFee', value: tempFilterState.selectedFee }});
    dispatch({ type: ACTIONS.SET_FIELD, payload: { field: 'selectedExperience', value: tempFilterState.selectedExperience }});
    dispatch({ type: ACTIONS.SET_FIELD, payload: { field: 'selectedLanguages', value: tempFilterState.selectedLanguages }});
    setCurrentPage(1);
    setFilterModalVisible(false);
  };

  const handleTempDispatch = (action: { type: string; payload: any }) => {
    setTempFilterState(filterReducer(tempFilterState, action));
  };
  
  const handleClearFilters = () => {
      setTempFilterState(initialFilterState);
  };

  if (isLoading) {
    return <View style={styles.loadingContainer}><ActivityIndicator size="large" color={colors.tint} /></View>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or specialty..."
            placeholderTextColor={colors.textSecondary}
            value={filterState.searchQuery}
            onChangeText={(value) => dispatch({ type: ACTIONS.SET_FIELD, payload: { field: 'searchQuery', value } })}
          />
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={openFilterModal}>
          <SlidersHorizontal size={20} color={colors.white} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={paginatedDoctors}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => <DoctorCard doctor={item} styles={styles} onBook={handleBookNow} />}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No doctors found matching your criteria.</Text>
            </View>
        )}
        ListFooterComponent={() => totalPages > 1 && (
            <View style={styles.paginationContainer}>
                <TouchableOpacity style={styles.pageButton} onPress={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}><ChevronLeft size={20} color={currentPage === 1 ? colors.border : colors.text} /></TouchableOpacity>
                <Text style={styles.pageText}>Page {currentPage} of {totalPages}</Text>
                <TouchableOpacity style={styles.pageButton} onPress={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}><ChevronRight size={20} color={currentPage === totalPages ? colors.border : colors.text} /></TouchableOpacity>
            </View>
        )}
      />

      {/* Filter Modal */}
      <Modal visible={filterModalVisible} animationType="slide" transparent={false}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filters</Text>
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setFilterModalVisible(false)}>
              <X size={20} color={colors.text} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalContent}>
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Specialty</Text>
              <View style={styles.optionsContainer}>
                {SPECIALTIES.map(spec => (
                  <TouchableOpacity key={spec} style={[styles.optionButton, tempFilterState.selectedSpecialties.includes(spec) && styles.selectedOptionButton]} onPress={() => handleTempDispatch({ type: ACTIONS.TOGGLE_ARRAY_ITEM, payload: { field: 'selectedSpecialties', value: spec } })}>
                    <Text style={[styles.optionText, tempFilterState.selectedSpecialties.includes(spec) && styles.selectedOptionText]}>{spec}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Location</Text>
              <View style={styles.optionsContainer}>
                {LOCATIONS.map(loc => (
                  <TouchableOpacity key={loc} style={[styles.optionButton, tempFilterState.selectedLocations.includes(loc) && styles.selectedOptionButton]} onPress={() => handleTempDispatch({ type: ACTIONS.TOGGLE_ARRAY_ITEM, payload: { field: 'selectedLocations', value: loc } })}>
                    <Text style={[styles.optionText, tempFilterState.selectedLocations.includes(loc) && styles.selectedOptionText]}>{loc}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
             <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Consultation Fee (Max)</Text>
              <View style={styles.optionsContainer}>
                {FEES.map(fee => (
                  <TouchableOpacity key={fee} style={[styles.optionButton, tempFilterState.selectedFee === fee && styles.selectedOptionButton]} onPress={() => handleTempDispatch({ type: ACTIONS.SET_FIELD, payload: { field: 'selectedFee', value: tempFilterState.selectedFee === fee ? null : fee } })}>
                    <Text style={[styles.optionText, tempFilterState.selectedFee === fee && styles.selectedOptionText]}>Up to ₹{fee}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Experience</Text>
              <View style={styles.optionsContainer}>
                {EXPERIENCE.map(exp => (
                  <TouchableOpacity key={exp} style={[styles.optionButton, tempFilterState.selectedExperience === exp && styles.selectedOptionButton]} onPress={() => handleTempDispatch({ type: ACTIONS.SET_FIELD, payload: { field: 'selectedExperience', value: tempFilterState.selectedExperience === exp ? null : exp } })}>
                    <Text style={[styles.optionText, tempFilterState.selectedExperience === exp && styles.selectedOptionText]}>{exp} years</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Rating</Text>
              <View style={styles.optionsContainer}>
                {RATINGS.map(rating => (
                  <TouchableOpacity key={rating} style={[styles.optionButton, tempFilterState.selectedRatings.includes(rating) && styles.selectedOptionButton]} onPress={() => handleTempDispatch({ type: ACTIONS.TOGGLE_ARRAY_ITEM, payload: { field: 'selectedRatings', value: rating } })}>
                     <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
                        <Star size={14} color={tempFilterState.selectedRatings.includes(rating) ? colors.white : colors.warning} />
                        <Text style={[styles.optionText, tempFilterState.selectedRatings.includes(rating) && styles.selectedOptionText]}>{rating} & up</Text>
                     </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
             <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Language</Text>
              <View style={styles.optionsContainer}>
                {LANGUAGES.map(lang => (
                  <TouchableOpacity key={lang} style={[styles.optionButton, tempFilterState.selectedLanguages.includes(lang) && styles.selectedOptionButton]} onPress={() => handleTempDispatch({ type: ACTIONS.TOGGLE_ARRAY_ITEM, payload: { field: 'selectedLanguages', value: lang } })}>
                    <Text style={[styles.optionText, tempFilterState.selectedLanguages.includes(lang) && styles.selectedOptionText]}>{lang}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
          <View style={styles.modalFooter}>
             <TouchableOpacity style={{...styles.resultsButton, backgroundColor: colors.card}} onPress={handleClearFilters}>
                <Text style={{...styles.resultsButtonText, color: colors.text}}>Clear All</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.resultsButton} onPress={applyFiltersAndClose}>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                    <Text style={styles.resultsButtonText}>Show Results</Text>
                    <View style={styles.resultsCountBadge}><Text style={styles.resultsCountText}>{tempFilteredDoctors.length}</Text></View>
                </View>
             </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Booking Modal */}
      <BookingModal 
        visible={bookingModalVisible}
        onClose={() => setBookingModalVisible(false)}
        doctor={selectedDoctor}
        styles={styles}
        colors={colors}
      />
    </SafeAreaView>
  );
}
