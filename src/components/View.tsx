import { View as RNView, ViewProps as RNViewProps } from "react-native";
import { withLayoutProps } from "~/utils/withLayoutProps";

export type View = typeof View;
export const View = withLayoutProps<RNView, RNViewProps>(RNView);
export type ViewProps = React.ComponentProps<View>;
