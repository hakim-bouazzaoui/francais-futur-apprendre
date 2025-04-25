// Basic color palette based on the French flag
export const colors = {
  primary: '#0055A4', // French Blue
  accent: '#EF4135', // French Red
  background: '#FFFFFF', // White (for light mode)
  surface: '#FFFFFF', // White (for cards/surfaces in light mode)
  text: '#212121', // Dark grey for text
  textSecondary: '#757575', // Lighter grey for secondary text
  white: '#FFFFFF',
  black: '#000000',
  border: '#E0E0E0', // Light grey for borders
  // Add dark mode colors later if needed
  // backgroundDark: '#121212',
  // surfaceDark: '#1E1E1E',
  // textDark: '#FFFFFF',
};

// Font families
export const fonts = {
  montserrat: 'Montserrat', // Ensure this font is loaded
  openSans: 'OpenSans', // Ensure this font is loaded (check exact name after loading)
  // Add weights if needed, e.g., openSansBold: 'OpenSans-Bold'
};

// Example basic theme structure (can be expanded for React Native Paper)
export const theme = {
  colors: {
    primary: colors.primary,
    accent: colors.accent,
    background: colors.background,
    surface: colors.surface,
    text: colors.text,
    // ... map other Paper theme colors if needed
  },
  fonts: {
    // Map Paper font configurations if needed
    // regular: { fontFamily: fonts.openSans, fontWeight: 'normal' },
    // medium: { fontFamily: fonts.openSans, fontWeight: '600' },
    // light: { fontFamily: fonts.openSans, fontWeight: '300' },
    // thin: { fontFamily: fonts.openSans, fontWeight: '100' },
  },
  // Add other theme properties like roundness, spacing etc.
};

// Export font weights/styles if needed separately
export const typography = {
  h1: {
    fontFamily: fonts.montserrat,
    fontWeight: 'bold', // Or specific weight like '700'
    fontSize: 32,
  },
  h2: {
    fontFamily: fonts.montserrat,
    fontWeight: 'bold',
    fontSize: 24,
  },
  body: {
    fontFamily: fonts.openSans,
    fontSize: 16,
  },
  // ... add more styles
};