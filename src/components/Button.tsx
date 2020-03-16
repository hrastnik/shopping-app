import React, { ReactNode, useState, forwardRef } from "react";
import {
  TouchableOpacity,
  TextStyle,
  StyleSheet,
  TouchableOpacityProps,
  Platform,
  TouchableWithoutFeedback
} from "react-native";

import { Modal } from "~/components/ModalProvider";
import { Spacer } from "~/components/Spacer";
import { Spinner } from "~/components/Spinner";
import { Text } from "~/components/Text";
import { View } from "~/components/View";
import { constants as C } from "~/style";
import { shadow } from "~/utils/shadow";

export interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  small?: boolean;
  outline?: boolean;
  transparent?: boolean;
  colorLight?: boolean;
  colorDark?: boolean;
  colorTheme?: boolean;
  colorAccent?: boolean;
  colorDanger?: boolean;
  children?: ReactNode;
  onPress?: TouchableOpacityProps["onPress"] | (() => Promise<any>);
  blockUi?: boolean;
}

const Button = forwardRef<TouchableOpacity, ButtonProps>(function Button(
  {
    title,

    small = false,
    outline = false,
    transparent = false,
    colorLight = false,
    colorDark = false,
    colorTheme = false,
    colorAccent = false,
    colorDanger = false,

    style: inheritedStyle,
    disabled,
    children,
    onPress,
    blockUi = true,
    ...props
  }: ButtonProps & TouchableOpacity,
  ref
) {
  const shouldRenderTitle = typeof title === "string";

  const resolveBackgroundColor = () => {
    if (outline) return "transparent";
    if (transparent) return "transparent";

    if (colorLight) return C.colorBackgroundLight;
    else if (colorDark) return C.colorBackgroundDark;
    else if (colorTheme) return C.colorBackgroundTheme;
    else if (colorAccent) return C.colorBackgroundAccent;
    else if (colorDanger) return C.colorBackgroundDanger;

    // This should work well with default button text color
    return C.colorBackgroundTheme;
  };

  const resolvePadding = () => {
    if (small) return C.spacingSmall;
    return C.spacingMedium;
  };

  const resolveTextStyle = () => {
    const style: TextStyle = {};
    if (small) style.fontSize = C.fontSizeSmall;
    else style.fontSize = C.fontSizeMedium;

    if (outline || transparent) {
      if (colorLight) style.color = C.colorTextLight;
      else if (colorDark) style.color = C.colorTextDark;
      else if (colorTheme) style.color = C.colorTextTheme;
      else if (colorAccent) style.color = C.colorTextAccent;
      else if (colorDanger) style.color = C.colorTextDanger;
      else style.color = C.colorTextTheme;
    } else {
      style.color = C.colorTextLight;
    }

    return style;
  };

  const resolveBorderColor = () => {
    if (outline) return resolveTextStyle().color;
    if (transparent) return "transparent";
    if (colorDanger) return C.colorBackgroundDanger;
    if (colorTheme) return C.colorBackgroundTheme;
    if (colorAccent) return C.colorBackgroundAccent;
    return C.colorBackgroundTheme;
  };

  const resolveShadow = () => {
    if (transparent) return 0;
    if (outline) return Platform.select({ ios: 2, android: 0 });
    else return 2;
  };

  const [isLoading, setIsLoading] = useState(false);

  function handleButtonPress(event) {
    if (typeof onPress === "function") {
      const maybePromise = onPress(event);

      if (maybePromise && typeof maybePromise.then === "function") {
        setIsLoading(true);
        maybePromise
          .then(() => {
            setIsLoading(false);
          })
          .catch(() => {
            setIsLoading(false);
          });
      }
    }
  }

  const resolveBorderRadius = () => {
    if (small) return 4;
    return 8;
  };

  const borderRadius = resolveBorderRadius(); // shared between the button and the spinner overlay
  const style: TouchableOpacityProps["style"] = {
    flexDirection: "row",
    justifyContent: "center", // ideja kod dodavanja ikona -> children != null ? "flex-start" : "center"
    alignItems: "center",
    backgroundColor: resolveBackgroundColor(),
    borderColor: resolveBorderColor(),
    borderWidth: 1,
    padding: resolvePadding(),
    borderRadius,
    ...shadow(resolveShadow()),
    opacity: isLoading ? 0.5 : 1
  };

  const textStyle = resolveTextStyle();

  return (
    <>
      <TouchableOpacity
        ref={ref}
        style={[style, inheritedStyle]}
        onPress={handleButtonPress}
        disabled={isLoading || disabled}
        {...props}
      >
        <>
          {children}
          {Boolean(children && shouldRenderTitle) && <Spacer small />}
          {shouldRenderTitle && (
            <Text numberOfLines={1} style={textStyle}>
              {title}
            </Text>
          )}
        </>
        {isLoading && (
          <View
            centerContent
            style={{ ...StyleSheet.absoluteFillObject, borderRadius }}
          >
            <Spinner size="small" color={C.colorTextDarkSoft} />
          </View>
        )}
      </TouchableOpacity>

      {Boolean(blockUi && isLoading) && (
        <Modal blockHardwareBackButton>
          <TouchableWithoutFeedback>
            <View flex />
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </>
  );
});

const ButtonMemoized = React.memo(Button);

export { ButtonMemoized as Button };
