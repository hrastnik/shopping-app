import React, { useState, createContext, useCallback, useContext } from "react";
import {
  StyleSheet,
  AlertButton,
  TouchableWithoutFeedback,
  AlertOptions,
  ViewStyle
} from "react-native";

import { Button } from "~/components/Button";
import { Modal } from "~/components/ModalProvider";
import { Spacer } from "~/components/Spacer";
import { Text } from "~/components/Text";
import { View } from "~/components/View";
import { shadow } from "~/utils/shadow";

import { constants as C } from "~/style";

interface ContextType {
  alert: (
    title: string,
    message?: string,
    buttons?: AlertButton[],
    options?: AlertOptions & { buttonsContainerStyle?: ViewStyle }
  ) => void;
}

export const AlertContext = createContext<ContextType>(undefined);

const defaultOptions = {
  cancelable: false,
  onDismiss: () => {},
  buttonsContainerStyle: {}
};

const MODAL_BACKDROP_COLOR = "rgba(0,0,0,0.2)";

const S = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: MODAL_BACKDROP_COLOR,
    alignItems: "center",
    justifyContent: "center"
  },
  alertWrap: {
    ...shadow(4),
    backgroundColor: C.colorBackgroundLight,
    borderRadius: 8,
    width: "80%",
    padding: C.spacingMedium
  }
});

export function AlertProvider(props) {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertParams, setAlertParams] = useState({
    title: "",
    body: "",
    buttons: [],
    options: defaultOptions
  });

  const alert: ContextType["alert"] = useCallback(
    (title = "", body = "", buttons = [], options = defaultOptions) => {
      const preparedOptions = { ...defaultOptions, ...options };
      setAlertParams({ title, body, buttons, options: preparedOptions });
      setAlertVisible(true);
    },
    []
  );

  const contextValue = { alertVisible, setAlertVisible, alert };

  const { children, ...otherProps } = props;

  const { title, body, buttons, options } = alertParams;

  const { onDismiss, cancelable, buttonsContainerStyle } = options;

  const handleButtonPress = button => () => {
    button.onPress();
    setAlertVisible(false);
  };

  const handleModalPress = () => {
    if (cancelable) {
      onDismiss();
      setAlertVisible(false);
    }
  };

  const renderedButtons = buttons.map((button, index) => {
    // "default" | "cancel" | "destructive";
    const buttonStyle = button.style ?? "default";

    const buttonProps = {
      transparent: true,
      title: button.text,
      onPress: handleButtonPress(button),
      key: button.text,
      // containerStyle: defaultButtonStyle,
      colorDanger: buttonStyle === "destructive"
    };

    return (
      <React.Fragment key={index}>
        {index !== 0 && <Spacer medium />}
        <Button {...buttonProps} />
      </React.Fragment>
    );
  });

  return (
    <AlertContext.Provider value={contextValue} {...otherProps}>
      {children}
      {alertVisible && (
        <Modal>
          <TouchableWithoutFeedback onPress={handleModalPress}>
            <View style={S.container}>
              <View style={S.alertWrap}>
                <Text colorDark>{title}</Text>
                <Text colorDarkSoft>{body}</Text>
                <View
                  flexDirectionRow
                  justifyContentFlexEnd
                  style={buttonsContainerStyle}
                >
                  {buttons.length > 0 ? (
                    renderedButtons
                  ) : (
                    <Button
                      colorTheme
                      transparent
                      title="OK"
                      onPress={() => {
                        setAlertVisible(false);
                      }}
                    />
                  )}
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const { alert } = useContext(AlertContext);
  return alert;
}
