import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SplashScreen from './Global/SplashScreen';
import OnboardingScreens from './OnboardingScreens';
import WelcomeScreen from './WelcomeScreen';
import HomeScreen from './HomeScreen';
import OTPScreen from './Global/OTPScreen';
import ArrowIcons from './Global/ArrowIcons';
import ProfileScreen from './screen/ProfileScreen';
import PersonalDetailScreen from './screen/personalDetailScreen/PersonalDetailScreen';

export default function Totalfiles() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [selectedZodiac, setSelectedZodiac] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
      case "home": 
        return (
          <HomeScreen onNavigate={setCurrentScreen} onOpen={() => setSidebarOpen(!sidebarOpen)} isOpen={sidebarOpen} />
        )
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
            {Header('home')}
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
