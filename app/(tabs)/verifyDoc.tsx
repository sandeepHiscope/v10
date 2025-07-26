import { Colors } from "@/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Camera, CameraView } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import {
  ArrowRight,
  Camera as CameraIcon,
  History,
  Info,
  ScanLine,
  Trash2,
  Upload,
  X,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
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

// Define types for screen state and storage
type ScreenTab = "scan" | "history";
interface RecentScan {
  data: string;
  timestamp: string;
  isUrl: boolean;
}

// Define specific types for the styles object to ensure type safety.
type ScreenStyles = {
  safeArea: ViewStyle;
  loadingContainer: ViewStyle;
  loadingText: TextStyle;
  container: ViewStyle;
  tabContainer: ViewStyle;
  tabButton: ViewStyle;
  activeTabButton: ViewStyle;
  tabText: TextStyle;
  activeTabText: TextStyle;
  contentContainer: ViewStyle;
  section: ViewStyle;
  sectionTitle: TextStyle;
  instructions: TextStyle;
  scannerContainer: ViewStyle;
  scannerBox: ViewStyle;
  uploadPrompt: ViewStyle;
  uploadText: TextStyle;
  cameraPermissionText: TextStyle;
  scanButton: ViewStyle;
  scanButtonText: TextStyle;
  scanningButton: ViewStyle;
  resultBox: ViewStyle;
  resultBoxUrl: ViewStyle;
  resultLabel: TextStyle;
  resultData: TextStyle;
  redirectText: TextStyle;
  countdown: TextStyle;
  howItWorksTitle: TextStyle;
  step: ViewStyle;
  stepNumber: ViewStyle;
  stepNumberText: TextStyle;
  stepText: TextStyle;
  historyItem: ViewStyle;
  historyData: ViewStyle;
  historyDataText: TextStyle;
  historyTimestamp: TextStyle;
  historyAction: ViewStyle;
  historyActionText: TextStyle;
  noHistoryText: TextStyle;
  clearHistoryButton: ViewStyle;
};

const getStyles = (colors: typeof Colors.dark): ScreenStyles => {
  return StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.background },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    loadingText: { marginTop: 16, fontSize: 16, color: colors.textSecondary },
    container: { flex: 1 },
    tabContainer: {
      flexDirection: "row",
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    tabButton: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 12,
      gap: 8,
    },
    activeTabButton: { borderBottomWidth: 2, borderBottomColor: colors.tint },
    tabText: { fontSize: 16, color: colors.textSecondary },
    activeTabText: { color: colors.tint, fontWeight: "600" },
    contentContainer: { padding: 16 },
    section: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
      textAlign: "center",
      marginBottom: 8,
    },
    instructions: {
      color: colors.textSecondary,
      textAlign: "center",
      marginBottom: 16,
      lineHeight: 22,
    },
    scannerContainer: {
      height: 250,
      borderRadius: 16,
      overflow: "hidden",
      marginBottom: 16,
    },
    scannerBox: {
      flex: 1,
      borderWidth: 2,
      borderColor: colors.border,
      borderStyle: "dashed",
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
    },
    uploadPrompt: { alignItems: "center" },
    uploadText: {
      marginTop: 8,
      color: colors.textSecondary,
      fontWeight: "600",
    },
    cameraPermissionText: { color: colors.danger, textAlign: "center" },
    scanButton: {
      flexDirection: "row",
      backgroundColor: colors.tint,
      paddingVertical: 14,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      gap: 8,
    },
    scanButtonText: {
      color: colors.background,
      fontSize: 16,
      fontWeight: "bold",
    },
    scanningButton: { backgroundColor: colors.danger },
    resultBox: {
      marginTop: 16,
      padding: 16,
      borderRadius: 12,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    resultBoxUrl: { borderColor: colors.accent },
    resultLabel: { color: colors.textSecondary, fontSize: 14, marginBottom: 8 },
    resultData: { color: colors.text, fontSize: 16 },
    redirectText: { textAlign: "center", color: colors.textSecondary },
    countdown: { fontWeight: "bold", color: colors.accent },
    howItWorksTitle: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 16,
    },
    step: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginBottom: 12,
    },
    stepNumber: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.tint,
      justifyContent: "center",
      alignItems: "center",
    },
    stepNumberText: {
      color: colors.background,
      fontWeight: "bold",
      fontSize: 16,
    },
    stepText: {
      flex: 1,
      color: colors.textSecondary,
      fontSize: 15,
      lineHeight: 20,
    },
    historyItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    historyData: { flex: 1, marginRight: 12 },
    historyDataText: { color: colors.text, fontSize: 15, fontWeight: "500" },
    historyTimestamp: {
      color: colors.textSecondary,
      fontSize: 12,
      marginTop: 4,
    },
    historyAction: {
      backgroundColor: colors.tint,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 8,
    },
    historyActionText: { color: colors.background, fontWeight: "bold" },
    noHistoryText: {
      textAlign: "center",
      color: colors.textSecondary,
      marginVertical: 40,
      fontSize: 16,
    },
    clearHistoryButton: {
      backgroundColor: colors.danger,
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: "center",
      marginTop: 16,
    },
  });
};

export default function VerifyDocScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "dark"];
  const styles = getStyles(colors);

  const [permissions, setPermissions] = useState<{
    camera: boolean | null;
    media: boolean | null;
  }>({ camera: null, media: null });
  const [activeTab, setActiveTab] = useState<ScreenTab>("scan");
  const [scanning, setScanning] = useState<boolean>(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [isUrl, setIsUrl] = useState<boolean>(false);
  const [redirecting, setRedirecting] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(5);
  const [recentScans, setRecentScans] = useState<RecentScan[]>([]);

  // Request permissions on mount
  useEffect(() => {
    (async () => {
      const camStatus = await Camera.requestCameraPermissionsAsync();
      const mediaStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setPermissions({
        camera: camStatus.status === "granted",
        media: mediaStatus.status === "granted",
      });
      loadRecentScans();
    })();
  }, []);

  // Countdown timer effect
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (redirecting && countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    } else if (redirecting && countdown === 0 && scannedData && isUrl) {
      Linking.openURL(scannedData);
      setRedirecting(false);
    }
    return () => clearInterval(timer);
  }, [redirecting, countdown, scannedData, isUrl]);

  const loadRecentScans = async () => {
    try {
      const savedScans = await AsyncStorage.getItem("vhc_recentScans");
      if (savedScans) setRecentScans(JSON.parse(savedScans));
    } catch (e) {
      console.error("Failed to load recent scans:", e);
    }
  };

  const saveRecentScans = async (scans: RecentScan[]) => {
    try {
      await AsyncStorage.setItem("vhc_recentScans", JSON.stringify(scans));
    } catch (e) {
      console.error("Failed to save recent scans:", e);
    }
  };

  const isValidURL = (str: string): boolean => {
    return str.startsWith("http://") || str.startsWith("https://");
  };

  const handleScanResult = (data: string) => {
    if (!data) return;
    setScanning(false);
    setScannedData(data);
    const urlCheck = isValidURL(data);
    setIsUrl(urlCheck);

    const newScan: RecentScan = {
      data,
      timestamp: new Date().toLocaleString(),
      isUrl: urlCheck,
    };
    const updatedScans = [newScan, ...recentScans].slice(0, 10); // Keep last 10
    setRecentScans(updatedScans);
    saveRecentScans(updatedScans);

    if (urlCheck) {
      setRedirecting(true);
      setCountdown(5);
    }
  };

  const startCameraScan = () => {
    if (!permissions.camera) {
      Alert.alert(
        "Permission Denied",
        "Please grant camera access in your device settings."
      );
      return;
    }
    resetScanState();
    setScanning(true);
  };

  const pickImageAndScan = async () => {
    if (!permissions.media) {
      Alert.alert(
        "Permission Denied",
        "Please grant media library access in your device settings."
      );
      return;
    }
    resetScanState();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      try {
        const scannedResults = await Camera.scanFromURLAsync(
          result.assets[0].uri
        );
        if (scannedResults.length > 0) {
          handleScanResult(scannedResults[0].data);
        } else {
          Alert.alert(
            "No QR Code Found",
            "Could not find a QR code in the selected image."
          );
        }
      } catch (error) {
        console.error("Image scan failed:", error);
        Alert.alert("Scan Error", "Failed to scan the selected image.");
      }
    }
  };

  const clearHistory = () => {
    Alert.alert(
      "Clear History",
      "Are you sure you want to clear all scan history?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            setRecentScans([]);
            await AsyncStorage.removeItem("vhc_recentScans");
          },
        },
      ]
    );
  };

  const resetScanState = () => {
    setScannedData(null);
    setRedirecting(false);
    setCountdown(5);
    setIsUrl(false);
  };

  if (permissions.camera === null || permissions.media === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.tint} />
        <Text style={styles.loadingText}>Requesting permissions...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      
<View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "scan" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("scan")}
        >
          <ScanLine
            color={activeTab === "scan" ? colors.tint : colors.textSecondary}
            size={20}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "scan" && styles.activeTabText,
            ]}
          >
            Scan
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "history" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("history")}
        >
          <History
            color={activeTab === "history" ? colors.tint : colors.textSecondary}
            size={20}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "history" && styles.activeTabText,
            ]}
          >
            History
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          {activeTab === "scan" && (
            <>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Scan QR Code</Text>
                <Text style={styles.instructions}>
                  Scan a QR code with your camera or upload an image.
                </Text>
                <View style={styles.scannerContainer}>
                  {scanning ? (
                    <CameraView
                      style={StyleSheet.absoluteFill}
                      onBarcodeScanned={(event: { data: string }) =>
                        scanning && handleScanResult(event.data)
                      }
                      barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
                    />
                  ) : (
                    <TouchableOpacity
                      style={styles.scannerBox}
                      onPress={pickImageAndScan}
                    >
                      <View style={styles.uploadPrompt}>
                        <Upload size={40} color={colors.textSecondary} />
                        <Text style={styles.uploadText}>
                          Tap to Upload Image
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
                <TouchableOpacity
                  style={[styles.scanButton, scanning && styles.scanningButton]}
                  onPress={
                    scanning ? () => setScanning(false) : startCameraScan
                  }
                >
                  {scanning ? (
                    <X size={20} color={colors.background} />
                  ) : (
                    <CameraIcon size={20} color={colors.background} />
                  )}
                  <Text style={styles.scanButtonText}>
                    {scanning ? "Stop Scan" : "Start Camera Scan"}
                  </Text>
                </TouchableOpacity>
              </View>

              {scannedData && (
                <View style={[styles.resultBox, isUrl && styles.resultBoxUrl]}>
                  {isUrl ? (
                    <>
                      <Text style={styles.resultLabel}>URL Detected</Text>
                      {redirecting ? (
                        <Text style={styles.redirectText}>
                          Redirecting in{" "}
                          <Text style={styles.countdown}>{countdown}</Text>s...
                        </Text>
                      ) : (
                        <Text style={styles.resultData} numberOfLines={2}>
                          {scannedData}
                        </Text>
                      )}
                    </>
                  ) : (
                    <>
                      <Text style={styles.resultLabel}>Scanned Data</Text>
                      <Text style={styles.resultData}>{scannedData}</Text>
                    </>
                  )}
                </View>
              )}

              <View style={styles.section}>
                <Text style={styles.howItWorksTitle}>
                  <Info size={18} color={colors.text} /> How It Works
                </Text>
                <View style={styles.step}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>1</Text>
                  </View>
                  <Text style={styles.stepText}>
                    Position the QR code in the scanner frame or upload an
                    image.
                  </Text>
                </View>
                <View style={styles.step}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>2</Text>
                  </View>
                  <Text style={styles.stepText}>
                    The scanner will automatically detect and read the QR code.
                  </Text>
                </View>
                <View style={styles.step}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>3</Text>
                  </View>
                  <Text style={styles.stepText}>
                    View the data or get redirected if it's a valid URL.
                  </Text>
                </View>
              </View>
              
            </>
          )}

          {activeTab === "history" && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Scans</Text>
              {recentScans.length > 0 ? (
                <>
                  {recentScans.map((scan, index) => (
                    <View style={styles.historyItem} key={index}>
                      <View style={styles.historyData}>
                        <Text style={styles.historyDataText} numberOfLines={1}>
                          {scan.data}
                        </Text>
                        <Text style={styles.historyTimestamp}>
                          {scan.timestamp}
                        </Text>
                      </View>
                      {scan.isUrl && (
                        <TouchableOpacity
                          style={styles.historyAction}
                          onPress={() => Linking.openURL(scan.data)}
                        >
                          <ArrowRight size={16} color={colors.background} />
                        </TouchableOpacity>
                      )}
                    </View>
                  ))}
                  <TouchableOpacity
                    style={styles.clearHistoryButton}
                    onPress={clearHistory}
                  >
                    <Trash2 size={16} color={colors.background} />
                    <Text style={styles.scanButtonText}>Clear History</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <Text style={styles.noHistoryText}>
                  No recent scans to show.
                </Text>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
