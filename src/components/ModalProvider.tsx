import React, { ReactNode } from "react";
import {
  TouchableWithoutFeedback,
  StyleSheet,
  BackHandler
} from "react-native";
import { View } from "~/components/View";

const ModalContext = React.createContext(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [contentList, setContentList] = React.useState([]);

  // Create a value to pass to modal
  const push = React.useRef(content => {
    const key = Math.random();
    setContentList(list => [...list, { content, key }]);
    return () => setContentList(list => list.filter(item => item.key !== key));
  });

  return (
    <ModalContext.Provider value={push.current}>
      {children}
      {contentList.map(({ content, key }) => (
        <TouchableWithoutFeedback key={key}>
          <View style={StyleSheet.absoluteFill}>{content}</View>
        </TouchableWithoutFeedback>
      ))}
    </ModalContext.Provider>
  );
};

export interface ModalProps {
  blockHardwareBackButton?: boolean;
  children?: ReactNode;
}

export function Modal({
  children,
  blockHardwareBackButton = true
}: ModalProps) {
  const push = React.useContext(ModalContext);

  // push the content to be rendered by ModalProvider
  React.useEffect(() => {
    const remove = push(children);
    return remove;
  }, [children, push]);

  // block back button from interfering with app
  React.useEffect(() => {
    if (!blockHardwareBackButton) return;
    const handler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return handler.remove;
  }, [blockHardwareBackButton]);

  // nothing to render - ModalProvider handles the rendering
  return null;
}
