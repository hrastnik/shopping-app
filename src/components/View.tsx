import { withLayoutProps } from "~/utils/withLayoutProps";
import { View as RNView } from "react-native";

export type View = typeof View;
export const View = withLayoutProps(RNView);
export type ViewProps = React.ComponentProps<View>;
