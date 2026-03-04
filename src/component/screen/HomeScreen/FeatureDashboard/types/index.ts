export interface FeatureItem {
  id?: string;
  title?: string;
  icon?: string;
  show?: boolean;
  route?: string;
  text?: string;
  logo?: string;
  textColor?: string;
  backgroundColor?: string;
}

export interface Props {
  data: FeatureItem[];
  onPress?: (item: FeatureItem) => void;
}