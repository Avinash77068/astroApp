export interface FeatureItem {
  id: string;
  title: string;
  icon: string;
}

export interface Props {
  data: FeatureItem[];
  onPress?: (item: FeatureItem) => void;
}