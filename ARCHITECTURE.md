# 🏛️ Architecture Documentation

## Overview

This application follows **Clean Architecture** principles with a clear separation of concerns, making it scalable, maintainable, and testable.

---

## 🎯 Architecture Layers

### 1. Presentation Layer (UI)
**Location:** `src/screens/`, `src/components/`

**Responsibility:** Display UI and handle user interactions

**Characteristics:**
- Pure presentational components
- No business logic
- Receives data via props
- Emits events via callbacks
- Memoized for performance

**Example:**
```typescript
// Pure presentational component
export const Button = memo<ButtonProps>(({ title, onPress, loading }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={loading}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
});
```

---

### 2. Business Logic Layer
**Location:** `src/hooks/`, `src/context/`

**Responsibility:** Application business logic and state management

**Characteristics:**
- Custom hooks for reusable logic
- Context for global state
- No UI dependencies
- Pure functions

**Example:**
```typescript
// Business logic in custom hook
export const useCountdown = (initialSeconds: number) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  
  // Logic implementation
  
  return { seconds, isActive, start, reset };
};
```

---

### 3. Service Layer
**Location:** `src/services/`

**Responsibility:** External communication (API, Storage)

**Characteristics:**
- Abstraction over external dependencies
- Async operations
- Error handling
- No UI dependencies

**Example:**
```typescript
// Service abstraction
export const authService = {
  async sendOTP(authData: AuthData): Promise<OTPResponse> {
    // API call implementation
  },
  
  async verifyOTP(phone: string, otp: string): Promise<VerifyOTPResponse> {
    // API call implementation
  },
};
```

---

### 4. Utility Layer
**Location:** `src/utils/`

**Responsibility:** Pure utility functions

**Characteristics:**
- Stateless
- Reusable
- No side effects
- Easy to test

**Example:**
```typescript
// Pure utility function
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};
```

---

## 🔄 Data Flow

```
User Interaction
      ↓
  Component
      ↓
Custom Hook (Business Logic)
      ↓
   Service (API/Storage)
      ↓
  Update State
      ↓
Re-render Component
```

### Example Flow: Login

1. **User** enters credentials in `AuthScreen`
2. **Component** calls `handleContinue` callback
3. **Callback** validates using `validators.ts`
4. **Service** `authService.sendOTP()` makes API call
5. **Navigation** moves to OTP screen
6. **Context** updates auth state
7. **Component** re-renders with new state

---

## 🎨 Design Patterns

### 1. Container/Presentational Pattern

**Container (Smart Component):**
```typescript
// Handles logic and state
export const HomeScreen = () => {
  const { user, logout } = useAuth();
  const { items, loading, refresh } = useHomeData();
  
  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);
  
  return <HomeView user={user} items={items} onLogout={handleLogout} />;
};
```

**Presentational (Dumb Component):**
```typescript
// Pure UI component
export const HomeView = memo<HomeViewProps>(({ user, items, onLogout }) => {
  return (
    <View>
      <Text>{user.name}</Text>
      <FlatList data={items} />
      <Button onPress={onLogout} />
    </View>
  );
});
```

---

### 2. Custom Hooks Pattern

Encapsulate reusable logic:

```typescript
// Hook encapsulates countdown logic
export const useCountdown = (initialSeconds: number) => {
  // State and logic
  return { seconds, isActive, start, reset };
};

// Usage in component
const { seconds, start } = useCountdown(60);
```

---

### 3. Service Pattern

Abstract external dependencies:

```typescript
// Storage service abstraction
export const storageService = {
  async setItem<T>(key: string, value: T): Promise<void> {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  },
  
  async getItem<T>(key: string): Promise<T | null> {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue ? JSON.parse(jsonValue) : null;
  },
};
```

---

### 4. Context Pattern

Global state management:

```typescript
// Auth context for global auth state
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  
  const login = useCallback(async (authData, profileData) => {
    // Login logic
  }, []);
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

## 📁 Folder Structure Rationale

### `/components` - Reusable UI Components
- Generic components used across multiple screens
- No screen-specific logic
- Highly reusable
- Examples: Button, Input, Header

### `/screens` - Screen Components
- One folder per screen
- Contains screen component + styles
- Uses components from `/components`
- Examples: AuthScreen, HomeScreen

### `/hooks` - Custom Hooks
- Reusable business logic
- Stateful logic extraction
- No UI dependencies
- Examples: useAuth, useCountdown

### `/services` - External Services
- API communication
- Storage operations
- Third-party integrations
- Examples: authService, storageService

### `/utils` - Utility Functions
- Pure functions
- No side effects
- Highly testable
- Examples: validators, formatters

### `/context` - Global State
- Application-wide state
- Cross-cutting concerns
- Examples: AuthContext

### `/constants` - Constants
- Theme tokens
- String literals
- Configuration values
- Examples: colors, spacing, strings

### `/types` - TypeScript Types
- Type definitions
- Interfaces
- Type aliases
- Examples: User, Navigation types

---

## 🎯 SOLID Principles Applied

### Single Responsibility Principle (SRP)
Each module has one reason to change:
- `Button.tsx` - Only button rendering
- `useAuth.ts` - Only auth logic
- `validators.ts` - Only validation

### Open/Closed Principle (OCP)
Components are open for extension, closed for modification:
```typescript
// Extensible via props
<Button variant="primary" size="large" />
<Button variant="outline" size="small" />
```

### Dependency Inversion Principle (DIP)
Depend on abstractions, not concretions:
```typescript
// Component depends on theme abstraction
import { colors } from '../constants/colors';

// Not hardcoded
backgroundColor: colors.primary  // ✅
backgroundColor: '#6366F1'       // ❌
```

---

## 🚀 Performance Optimizations

### 1. Memoization
```typescript
// Memoize components
export const Button = memo<ButtonProps>(({ ... }) => { ... });

// Memoize callbacks
const handlePress = useCallback(() => {
  onPress(data);
}, [onPress, data]);

// Memoize expensive computations
const filteredItems = useMemo(() => {
  return items.filter(item => item.active);
}, [items]);
```

### 2. FlatList Optimization
```typescript
<FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={keyExtractor}
  removeClippedSubviews
  maxToRenderPerBatch={10}
  windowSize={5}
/>
```

### 3. Lazy Loading
```typescript
// Lazy load screens
const HomeScreen = lazy(() => import('./screens/Home/HomeScreen'));
```

---

## 🧪 Testing Strategy

### Unit Tests
- Test utilities (validators, formatters)
- Test custom hooks
- Test service functions

### Integration Tests
- Test component + hook integration
- Test navigation flows
- Test context providers

### E2E Tests
- Test complete user flows
- Test authentication flow
- Test critical paths

---

## 🔐 Security Best Practices

### 1. Secure Storage
```typescript
// Use secure storage for sensitive data
await SecureStore.setItemAsync('auth_token', token);
```

### 2. Input Validation
```typescript
// Always validate user input
if (!validateEmail(email)) {
  setError('Invalid email');
  return;
}
```

### 3. API Security
```typescript
// Use HTTPS only
// Add authentication headers
// Implement token refresh
```

---

## 📊 State Management

### Local State (useState)
- Component-specific state
- Form inputs
- UI toggles

### Context State (useContext)
- Global auth state
- Theme preferences
- User data

### Server State (Custom Hooks)
- API data
- Cached responses
- Loading states

---

## 🎨 Styling Strategy

### 1. Centralized Theme
All styles use theme constants:
```typescript
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
    padding: spacing.lg,
  },
});
```

### 2. No Inline Styles
```typescript
// ❌ Bad
<View style={{ padding: 16, backgroundColor: '#fff' }} />

// ✅ Good
<View style={styles.container} />
```

### 3. Responsive Design
```typescript
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
```

---

## 🔄 Navigation Architecture

### Stack Navigator
- Linear flow (Auth → OTP → Profile → Home)
- Back navigation support
- Screen transitions

### Navigation Flow
```
Splash
  ↓
Auth → OTP → Profile → Home
  ↑                      ↓
  ←──────── Logout ──────┘
```

---

## 📝 Code Quality Standards

### 1. TypeScript Strict Mode
- No `any` types
- Proper interfaces
- Type inference

### 2. ESLint Rules
- No console.logs
- No unused variables
- Consistent formatting

### 3. Component Standards
- Max 200 lines per component
- Single responsibility
- Proper naming conventions
- DisplayName for debugging

---

## 🚀 Scalability Considerations

### Adding New Features
1. Create types in `/types`
2. Add constants in `/constants`
3. Create service in `/services`
4. Build custom hook in `/hooks`
5. Create components in `/components`
6. Build screen in `/screens`
7. Add to navigation

### Adding New Screens
1. Create folder in `/screens`
2. Create component + styles
3. Add to navigation types
4. Register in AppNavigator
5. Add navigation logic

---

## 📚 Best Practices Summary

✅ **DO:**
- Use TypeScript for type safety
- Memoize components and callbacks
- Extract reusable logic to hooks
- Use centralized theme
- Follow folder structure
- Write pure functions
- Handle errors gracefully

❌ **DON'T:**
- Use inline styles
- Hardcode values
- Mix business logic with UI
- Use `any` type
- Create large components
- Ignore performance
- Skip error handling

---

This architecture ensures the application is:
- **Maintainable**: Clear structure, easy to understand
- **Scalable**: Easy to add features
- **Testable**: Separated concerns, pure functions
- **Performant**: Optimized rendering, memoization
- **Type-safe**: Full TypeScript coverage
