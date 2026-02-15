# 🚀 Installation & Setup Guide

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (optional but recommended)
- iOS Simulator (Mac) or Android Emulator

---

## 📦 Required Dependencies

Install all required dependencies by running:

```bash
npm install
```

### Core Dependencies

```bash
npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context
npm install @react-native-async-storage/async-storage
```

### For Expo Projects

```bash
npx expo install react-native-screens react-native-safe-area-context
npx expo install @react-native-async-storage/async-storage
```

---

## 🏗️ Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── Button/
│   ├── Input/
│   ├── OTPInput/
│   ├── Header/
│   ├── Loader/
│   └── ScreenWrapper/
│
├── screens/                 # App screens
│   ├── Splash/
│   ├── Auth/
│   ├── OTP/
│   ├── Profile/
│   └── Home/
│
├── navigation/              # Navigation setup
│   └── AppNavigator.tsx
│
├── context/                 # React Context
│   └── AuthContext.tsx
│
├── hooks/                   # Custom hooks
│   ├── useAuth.ts
│   ├── useCountdown.ts
│   └── useHomeData.ts
│
├── services/                # Service layer
│   ├── authService.ts
│   └── storageService.ts
│
├── utils/                   # Utility functions
│   ├── validators.ts
│   ├── helpers.ts
│   └── formatters.ts
│
├── constants/               # App constants
│   ├── colors.ts
│   ├── spacing.ts
│   ├── typography.ts
│   └── strings.ts
│
├── theme/                   # Theme system
│   ├── lightTheme.ts
│   ├── darkTheme.ts
│   └── theme.ts
│
├── types/                   # TypeScript types
│   ├── user.types.ts
│   ├── navigation.types.ts
│   └── api.types.ts
│
└── data/                    # Dummy data
    └── dummyData.ts
```

---

## 🎯 App Flow

1. **Splash Screen** → Auto-navigates after 2 seconds
2. **Auth Screen** → Phone + Email input
3. **OTP Screen** → 4-digit OTP verification (use `1234` for testing)
4. **Profile Screen** → Complete user profile
5. **Home Screen** → Main app interface

---

## 🔑 Testing Credentials

### OTP Verification
- Any phone number (10 digits)
- Any email address
- **OTP Code:** `1234` (hardcoded for testing)

### Date Format
- Date of Birth: `DD/MM/YYYY` (e.g., `15/08/1995`)

---

## 🏃 Running the App

### For Expo

```bash
npx expo start
```

Then press:
- `i` for iOS simulator
- `a` for Android emulator
- Scan QR code for physical device

### For React Native CLI

```bash
# iOS
npx react-native run-ios

# Android
npx react-native run-android
```

---

## 🎨 Theme System

The app uses a centralized theme system. All colors, spacing, and typography are defined in constants.

### Customizing Colors

Edit `src/constants/colors.ts`:

```typescript
export const colors = {
  primary: '#6366F1',      // Change primary color
  secondary: '#EC4899',    // Change secondary color
  // ... more colors
};
```

### Customizing Spacing

Edit `src/constants/spacing.ts`:

```typescript
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  // ... more spacing
};
```

---

## 🔧 Configuration

### AsyncStorage Keys

Storage keys are defined in `src/services/storageService.ts`:

```typescript
const KEYS = {
  USER: '@user',
  AUTH_TOKEN: '@auth_token',
  IS_LOGGED_IN: '@is_logged_in',
};
```

### API Integration

Replace mock services in `src/services/authService.ts` with real API calls:

```typescript
export const authService = {
  async sendOTP(authData: AuthData): Promise<OTPResponse> {
    // Replace with actual API call
    const response = await fetch('YOUR_API_ENDPOINT/send-otp', {
      method: 'POST',
      body: JSON.stringify(authData),
    });
    return response.json();
  },
  // ... more methods
};
```

---

## 📱 Features

### Authentication Flow
- ✅ Phone & Email validation
- ✅ OTP verification with countdown timer
- ✅ Profile setup with gender selection
- ✅ Persistent login with AsyncStorage

### Home Screen
- ✅ Welcome header with user name
- ✅ Search functionality
- ✅ Horizontal category list
- ✅ Vertical scrollable items
- ✅ Pull-to-refresh
- ✅ Loading states
- ✅ Empty states
- ✅ Error handling

### Performance Optimizations
- ✅ Memoized components
- ✅ useCallback for event handlers
- ✅ FlatList for efficient rendering
- ✅ Optimized re-renders

---

## 🧪 Validation Rules

### Phone Number
- Must be exactly 10 digits
- Numbers only

### Email
- Standard email format validation
- Must contain @ and domain

### Name
- Minimum 2 characters
- Letters and spaces only

### Date of Birth
- Format: DD/MM/YYYY
- Valid date range: 1900 - current year

### OTP
- Exactly 4 digits
- Auto-focus on next input

---

## 🎯 Clean Architecture Principles

### Separation of Concerns
- **Components**: Pure UI, no business logic
- **Hooks**: Reusable business logic
- **Services**: API calls and data operations
- **Utils**: Pure utility functions
- **Context**: Global state management

### SOLID Principles
- **Single Responsibility**: Each component/function has one purpose
- **Open/Closed**: Extensible via props, closed for modification
- **Dependency Inversion**: Components depend on abstractions (theme, types)

### Performance Best Practices
- All list items are memoized
- Event handlers use useCallback
- Expensive computations use useMemo
- No inline functions in render
- Proper key extraction for lists

---

## 🐛 Troubleshooting

### Metro Bundler Issues

```bash
# Clear cache
npx react-native start --reset-cache

# Or for Expo
npx expo start -c
```

### iOS Build Issues

```bash
cd ios
pod install
cd ..
npx react-native run-ios
```

### Android Build Issues

```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

### AsyncStorage Issues

```bash
# Reinstall AsyncStorage
npm uninstall @react-native-async-storage/async-storage
npm install @react-native-async-storage/async-storage
```

---

## 📚 Additional Resources

- [React Navigation Docs](https://reactnavigation.org/)
- [AsyncStorage Docs](https://react-native-async-storage.github.io/async-storage/)
- [React Native Docs](https://reactnative.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🚀 Production Checklist

Before deploying to production:

- [ ] Replace mock auth service with real API
- [ ] Add proper error handling and logging
- [ ] Implement proper token management
- [ ] Add analytics tracking
- [ ] Set up crash reporting (Sentry, etc.)
- [ ] Add proper loading indicators
- [ ] Implement proper form validation messages
- [ ] Add accessibility features
- [ ] Test on multiple devices
- [ ] Optimize images and assets
- [ ] Enable ProGuard (Android)
- [ ] Configure app signing
- [ ] Set up CI/CD pipeline

---

## 📄 License

This project structure is provided as-is for educational and development purposes.
