import { withLayoutProps } from "~/utils/withLayoutProps";
import { TouchableOpacity as RNTouchableOpacity } from "react-native";

export const TouchableOpacity = withLayoutProps(RNTouchableOpacity);
export type TouchableOpacityProps = React.ComponentProps<
  typeof TouchableOpacity
>;
