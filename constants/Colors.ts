const palette = {
  // Primary Brand Colors
  primary: "#3498DB", // Main interactive blue
  secondary: "#2ECC71", // Accent green for positive actions

  // Neutral Grayscale
  black: "#000000",
  neutral900: "#0D1117", // Deepest background
  neutral800: "#161B22", // Card backgrounds, modals
  neutral700: "#30363D", // Borders, dividers
  neutral400: "#888888", // Inactive elements
  neutral100: "#EFEFEF", // High contrast text
  white: "#FFFFFF",

  // System & Semantic Colors
  error: "#E74C3C", // Errors, warnings
  warning: "#F1C40F", // Alerts, highlights

  // Accent Colors
  orange: "#E67E22",
  purple: "#9B59B6",
};

export const Colors = {
  light: {
    text: palette.neutral900,
    textSecondary: palette.neutral400,
    background: palette.white,
    card: palette.neutral100,
    tint: palette.primary,
    accent: palette.secondary,
    border: palette.neutral400,
    danger: palette.error,
    warning: palette.warning,
    tabIconDefault: palette.neutral400,
    tabIconSelected: palette.primary,
    gradientStart: palette.primary,
    gradientEnd: "#2980B9",
    iconColors: {
      blue: palette.primary,
      orange: palette.orange,
      purple: palette.purple,
      green: palette.secondary,
      red: palette.error,
    },
    white: palette.white,
  },
  dark: {
    text: palette.neutral100,
    textSecondary: palette.neutral400,
    background: palette.neutral900,
    card: palette.neutral800,
    border: palette.neutral700,
    tint: palette.primary,
    accent: palette.secondary,
    danger: palette.error,
    warning: palette.warning,
    tabIconDefault: palette.neutral400,
    tabIconSelected: palette.primary,
    gradientStart: palette.primary,
    gradientEnd: "#2980B9",
    iconColors: {
      blue: palette.primary,
      orange: palette.orange,
      purple: palette.purple,
      green: palette.secondary,
      red: palette.error,
    },
    white: palette.white,
  },
};
