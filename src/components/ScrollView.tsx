import {
  ScrollView as RNScrollView,
  ScrollViewProps as RNScrollViewProps,
} from "react-native";
import { withLayoutProps } from "~/utils/withLayoutProps";

export type ScrollView = typeof ScrollView;
export const ScrollView = withLayoutProps<RNScrollView, RNScrollViewProps>(
  RNScrollView
);
export type ScrollViewProps = React.ComponentProps<ScrollView>;
