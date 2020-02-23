import React, { useState, createContext, useCallback } from "react";
import {
  StyleSheet,
  AlertButton,
  TouchableWithoutFeedback,
  AlertOptions,
  ViewStyle,
  View,
  Text,
  Button,
  Modal
} from "~/components";
import { shadow } from "~/utils/shadow";

import { constants as C } from "~/style";
import { Spacer } from "./Spacer";

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

const MODAL_BACKDROP_COLOR = "rgba(126,126,126,0.5)";

const S = StyleSheet.create({
  containerStyle: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: MODAL_BACKDROP_COLOR
  },
  alertContainer: {
    backgroundColor: C.colorBackgroundLight,
    width: "80%",
    ...shadow(4)
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

  const buttonsRender = buttons.map((button, index) => {
    // "default" | "cancel" | "destructive";
    const buttonStyle = button.style || "default";
    const defaultButtonStyle = {
      flex: 1
    };

    let buttonProps;

    if (buttonStyle === "default") {
      buttonProps = {
        transparent: true,
        title: button.text,
        onPress: handleButtonPress(button),
        key: button.text,
        containerStyle: defaultButtonStyle
      };
    } else if (buttonStyle === "cancel") {
      buttonProps = {
        transparent: true,
        title: button.text,
        onPress: handleButtonPress(button),
        key: button.text,
        containerStyle: defaultButtonStyle
      };
    } else if (buttonStyle === "destructive") {
      buttonProps = {
        colorDanger: true,
        transparent: true,
        title: button.text,
        onPress: handleButtonPress(button),
        key: button.text,
        containerStyle: defaultButtonStyle
      };
    }

    return (
      <React.Fragment key={index}>
        {index !== 0 && <Spacer medium />}
        <Button {...buttonProps} />
      </React.Fragment>
    );
  });

  const shouldShowTitle = typeof title === "string" && title !== "";
  const shouldShowBody = typeof body === "string" && body !== "";
  const defaultButtonsContainerStyle =
    buttons.length > 1
      ? { flexDirection: "row" }
      : { flexDirection: "row-reverse" };

  const preparedButtonsContainerStyle: object = {
    ...defaultButtonsContainerStyle,
    ...buttonsContainerStyle
  };

  return (
    <AlertContext.Provider value={contextValue} {...otherProps}>
      {children}
      {alertVisible && (
        <Modal>
          <View style={S.containerStyle}>
            <TouchableWithoutFeedback onPress={handleModalPress}>
              <View
                justifyContentCenter
                alignItemsCenter
                style={S.containerStyle}
              >
                <View paddingLarge style={S.alertContainer}>
                  {shouldShowTitle && (
                    <View paddingVerticalMedium>
                      <Text weightSemiBold>{title}</Text>
                    </View>
                  )}
                  {shouldShowBody && (
                    <View paddingVerticalMedium>
                      <Text>{body}</Text>
                    </View>
                  )}
                  <View
                    paddingVerticalMedium
                    style={preparedButtonsContainerStyle}
                  >
                    {buttonsRender.length === 0 ? (
                      <Button
                        transparent
                        title="OK"
                        onPress={() => {
                          setAlertVisible(false);
                        }}
                      />
                    ) : (
                      buttonsRender
                    )}
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Modal>
      )}
    </AlertContext.Provider>
  );
}
