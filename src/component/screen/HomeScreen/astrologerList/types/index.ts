export interface LiveUser {
  id: string;
  name: string;
  image: string;
  isLive?: boolean;
}

export interface Props {
  data: LiveUser[];
  onPress?: (item: LiveUser) => void;
}