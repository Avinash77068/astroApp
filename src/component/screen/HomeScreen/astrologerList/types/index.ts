export interface activeUser {
  id: string;
  name: string;
  image: string;
  isLive?: number;
}

export interface Props {
  data: activeUser[];
  onPress?: (item: activeUser) => void;
}