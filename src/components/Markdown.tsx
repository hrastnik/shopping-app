import React from "react";

import RNMPMarkdown from "react-native-markdown-package";
import * as WebBrowser from "expo-web-browser";

import { constants as C } from "~/style";
import { useAlert } from "~/hooks";
import { useStore } from "~/mobx/utils/useStore";

function Markdown({
  disabled,
  children,
  ...props
}: {
  disabled?: boolean;
  children: string;
}) {
  const alert = useAlert();
  const store = useStore();
  const { t } = store.i18n;
  const handleOnLink = async (url) => {
    WebBrowser.openBrowserAsync(url).catch(() => {
      alert(t("Warning"), `${t("Cannot not open link address")} (${url})`);
    });
  };

  return (
    <RNMPMarkdown
      styles={disabled ? C.markdownDisabledStyle : C.markdownStyle}
      onLink={handleOnLink}
      {...props}
    >
      {children}
    </RNMPMarkdown>
  );
}

export { Markdown };
