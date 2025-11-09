import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SplashScreen from './SplashScreen';
import OnboardingScreens from './OnboardingScreens';
import WelcomeScreen from './WelcomeScreen';
import HomeScreen from './HomeScreen';
import LiveScreen from './LiveScreen';
import ZodiacDetailScreen from './ZodiacDetailScreen';
import OTPScreen from './OTPScreen';
import ChatScreen from './chatScreen/ChatScreen';
import CallListScreen from './callListScreen/CallListScreen';
import ArrowIcons from './Global/ArrowIcons';
import ProfileScreen from './ProfileScreen';
import PersonalDetailScreen from './personalDetailScreen/PersonalDetailScreen';
import ChatListScreen from './ChatList/ChatListScreen';

export default function Totalfiles() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [selectedZodiac, setSelectedZodiac] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    location: '',
    gender: '',
  });
  const Header = (title = 'App') => (
    <ArrowIcons
      showBack
      onBack={() => setCurrentScreen('home')}
      title={title}
      backgroundColor="#4a148c"
      style={
        currentScreen === 'personal'
          ? {
              justifyContent: 'flex-start',
              gap: 10,
              alignItems: 'center',
              flexDirection: 'row',
              backgroundColor: 'transparent',
            }
          : { justifyContent: 'space-between',width:'100%', gap: 10 }
      }
      iconstyle={
        currentScreen === 'personal'
          ? {
              justifyContent: 'flex-start',
              gap: 10,
              alignItems: 'center',
              flexDirection: 'row',
              backgroundColor: 'transparent',
            }
          : { justifyContent: 'center', gap: 10 }
      }
    />
  );

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return (
          <>
            {/* {Header('Splash')} */}
            <View style={styles.content}>
              <SplashScreen onComplete={() => setCurrentScreen('onboarding')} />
            </View>
          </>
        );
      case 'onboarding':
        return (
          <>
            {/* {Header('Onboarding')} */}
            <View style={styles.content}>
              <OnboardingScreens
                onComplete={() => setCurrentScreen('welcome')}
              />
            </View>
          </>
        );
      case 'welcome':
        return (
          <>
            {/* {Header('Welcome')} */}
            <View style={styles.content}>
              <WelcomeScreen onNext={() => setCurrentScreen('otp')} />
            </View>
          </>
        );
      case 'otp':
        return (
          <>
            {/* {Header('Verify')} */}
            <View style={styles.content}>
              <OTPScreen
                onChangeNumber={() => setCurrentScreen('welcome')}
                onVerify={() => setCurrentScreen('personal')}
              />
            </View>
          </>
        );
      case 'personal':
        return (
          <>
            {Header('Personal Detail')}
            <View style={styles.content}>
              <PersonalDetailScreen
                onComplete={() => setCurrentScreen('home')}
              />
            </View>
          </>
        );
      case 'home':
        return (
          <HomeScreen
            onNavigate={setCurrentScreen}
            onOpen={() => setSidebarOpen(!sidebarOpen)}
            isOpen={sidebarOpen}
            onZodiacSelect={(zodiac: string) => {
              setSelectedZodiac(zodiac);
              setCurrentScreen('zodiac-detail');
            }}
          />
        );
      case 'zodiac-detail':
        return (
          <>
            {Header('Zodiac Details')}
            <View style={styles.content}>
              <ZodiacDetailScreen
                zodiac={selectedZodiac}
                onBack={() => setCurrentScreen('home')}
              />
            </View>
          </>
        );
      case 'call':
        return (
          <>
            {Header('Call List')}
            <View style={styles.content}>
              <CallListScreen
                onBack={() => setCurrentScreen('home')}
                onCall={() => {}}
              />
            </View>
          </>
        );
      case 'chat-list':
        return (
          <>
            {Header('Chats')}
            <View style={styles.content}>
              <ChatListScreen
                onBack={() => setCurrentScreen('home')}
                onSelectChat={() => setCurrentScreen('chat')}
              />
            </View>
          </>
        );
      case 'chat':
        return (
          <>
            {Header('Chat')}
            <View style={styles.content}>
              <ChatScreen onBack={() => setCurrentScreen('chat-list')} />
            </View>
          </>
        );
      case 'live':
        return (
          <>
            {Header('Live')}
            <View style={styles.content}>
              <LiveScreen onBack={() => setCurrentScreen('home')} />
            </View>
          </>
        );
      case 'profile':
        return (
          <>
            {Header('Profile')}
            <View style={styles.content}>
              <ProfileScreen />
            </View>
          </>
        );
      default:
        return (
          <>
            {Header('Splash')}
            <View style={styles.content}>
              <SplashScreen onComplete={() => setCurrentScreen('onboarding')} />
            </View>
          </>
        );
    }
  };

  return <View style={styles.container}>{renderScreen()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4a148c',
    width: '100%',
  },
  content: {
    flex: 1,
    marginTop: 10, // space below header
    paddingHorizontal: 6,
  },
});
