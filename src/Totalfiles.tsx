import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import SplashScreen from './SplashScreen';
import OnboardingScreens from './OnboardingScreens';
import WelcomeScreen from './WelcomeScreen';
import PersonalDetailScreen from './PersonalDetailScreen';
import HomeScreen from './HomeScreen';
import CallListScreen from './CallListScreen';
import ChatListScreen from './ChatListScreen';
import ChatScreen from './ChatScreen';
import LiveScreen from './LiveScreen';
import ProfileScreen from './ProfileScreen';
import ZodiacDetailScreen from './ZodiacDetailScreen';
import OTPScreen from './OTPScreen';

export default function Totalfiles() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [selectedZodiac, setSelectedZodiac] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderScreen = () => {
    switch(currentScreen) {
      case 'splash':
        return <SplashScreen onComplete={() => setCurrentScreen('onboarding')} />;
      case 'onboarding':
        return <OnboardingScreens onComplete={() => setCurrentScreen('welcome')} />;
      case 'welcome':
        return <WelcomeScreen onNext={() => setCurrentScreen('otp')} />;
      case 'otp':
        return <OTPScreen onChangeNumber={() => setCurrentScreen('welcome')} onVerify={() => setCurrentScreen('personal')} />;
      case 'personal':
        return <PersonalDetailScreen onComplete={() => setCurrentScreen('home')} />;
      case 'home':
        return <HomeScreen
          onNavigate={setCurrentScreen}
          onOpen={() => setSidebarOpen(!sidebarOpen)}
          isOpen={sidebarOpen}
          onZodiacSelect={(zodiac: string) => {
            setSelectedZodiac(zodiac);
            setCurrentScreen('zodiac-detail');
          }}
        />;
      case 'zodiac-detail':
        return <ZodiacDetailScreen zodiac={selectedZodiac} onBack={() => setCurrentScreen('home')} />;
      case 'call':
        return <CallListScreen onBack={() => setCurrentScreen('home')} onCall={() => {}} />;
      case 'chat-list':
        return <ChatListScreen onBack={() => setCurrentScreen('home')} onSelectChat={() => setCurrentScreen('chat')} />;
      case 'chat':
        return <ChatScreen onBack={() => setCurrentScreen('chat-list')} />;
      case 'live':
        return <LiveScreen onBack={() => setCurrentScreen('home')} />;
      case 'profile':
        return <ProfileScreen onBack={() => setCurrentScreen('home')} />;
      case 'logout':
        return <WelcomeScreen onNext={() => setCurrentScreen('otp')} />;
      default:
        return <SplashScreen onComplete={() => setCurrentScreen('onboarding')} />;
    }
  };

  return (
    <View style={styles.container}> 
    {renderScreen()  }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4a148c',
    width:'100%',
  },
});
