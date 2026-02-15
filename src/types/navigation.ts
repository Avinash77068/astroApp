export type ScreenName = 
  | 'splash'
  | 'onboarding'
  | 'welcome'
  | 'otp'
  | 'home'
  | 'personal'
  | 'profile'
  | 'call'
  | 'chat-list'
  | 'live'
  | 'logout';

export interface NavigationProps {
  onNavigate: (screen: ScreenName) => void;
}

export interface ScreenProps extends NavigationProps {
  onComplete?: () => void;
}
