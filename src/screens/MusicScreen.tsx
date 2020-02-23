import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import {
  Image as RNImage,
  ImageProps as RNImageProps,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Screen } from "~/components/Screen";
import { Text } from "~/components/Text";
import { View } from "~/components/View";
import { Spacer } from "~/components/Spacer";
import { Spinner } from "~/components/Spinner";
import { Icon } from "~/components/Icon";
import { IconButton } from "~/components/IconButton";
import { constants as C } from "~/style";
import { shadow } from "~/utils/shadow";
import { useRightComponent } from "~/hooks/headerHooks";

const S = StyleSheet.create({
  borderRadius: { borderRadius: 4 },
  textWrap: {
    backgroundColor: C.colorBackgroundLightDark,
    borderRadius: 4,
    zIndex: -1
  },
  flexEnd: { alignItems: "flex-end" },
  flex: { flex: 1 },

  locationWrap: {
    position: "absolute",
    bottom: -30,
    right: C.spacingExtraLarge,

    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: C.colorBackgroundAccent,
    opacity: 0.99,
    ...shadow(5),
    justifyContent: "center",
    alignItems: "center"
  }
});

interface ImageProps extends Omit<RNImageProps, "source"> {
  uri: string;
}

const Image = ({ uri, style, ...props }: ImageProps) => {
  const [aspectRatio, setAspectRatio] = useState(1);
  useEffect(() => {
    setAspectRatio(1);
    RNImage.getSize(
      uri,
      (width, height) => setAspectRatio(width / height),
      console.error
    );
  }, [uri]);

  return (
    <RNImage source={{ uri }} style={[{ aspectRatio }, style]} {...props} />
  );
};

export const MusicScreen = observer(() => {
  const navigation = useNavigation();

  useRightComponent(
    <View centerContent>
      <IconButton
        onPress={() => {
          navigation.navigate("Map");
        }}
        iconName="location-on"
        iconColor={C.colorTextLight}
      />
    </View>,
    []
  );

  const secret = {
    title: "This is the title",
    image: "https://placebear.com/800/1200"
  };

  const isLoading = false;

  if (isLoading) {
    return (
      <View centerContent aspectRatioOne>
        <Spinner />
      </View>
    );
  }

  return (
    <Screen>
      <View paddingMedium>
        <View style={S.borderRadius}>
          <Image uri={secret.image} style={S.borderRadius} />

          <TouchableOpacity style={S.locationWrap} onPress={() => {}}>
            <Icon name="location-on" />
          </TouchableOpacity>
        </View>

        <Spacer />

        <View paddingMedium style={S.textWrap}>
          <Spacer large />

          <View flexDirectionRow style={S.flexEnd}>
            <Text weightBold sizeLarge colorTheme style={S.flex}>
              Hello this is the text
            </Text>
            <Text sizeSmall>129km</Text>
          </View>
          <Spacer />
          <Text>
            Curabitur et urna porttitor, viverra ante nec, mollis neque. Donec
            non dui molestie velit tristique commodo. Vestibulum a laoreet nibh.
            Phasellus eu faucibus enim. Cras rutrum ante ac arcu scelerisque
            aliquam. Phasellus cursus risus sit amet dolor finibus dictum.
            Pellentesque sed faucibus mauris, et sodales ex. Donec at mattis
            tellus. Integer ultrices est tortor, a posuere ipsum sagittis sed.
            Sed aliquam ut arcu eget egestas. Phasellus sed finibus dui.
            Praesent in dapibus erat. Aenean maximus ante diam. Donec sed sapien
            eget metus ornare tempor eu eget nunc. Phasellus quis leo id risus
            auctor hendrerit. Fusce varius, lorem in porttitor blandit, orci
            tortor condimentum justo, eget scelerisque magna nunc vitae nisi.
            Phasellus urna erat, tempus a tincidunt vitae, condimentum nec
            tortor. Suspendisse pulvinar a quam nec mollis. Duis ipsum mauris,
            porttitor eget eros sed, aliquam auctor odio. Sed urna ex, mollis
            sed dui eget, ornare hendrerit turpis. Nunc id orci convallis,
            auctor justo at, luctus leo. Maecenas dui neque, dapibus fermentum
            elit nec, tincidunt eleifend nisi. Mauris egestas urna sed felis
            aliquet, non tincidunt urna fermentum. Vestibulum fringilla urna ac
            lobortis rhoncus. Nam iaculis tempus orci. Vestibulum finibus
            sollicitudin tellus, at ultrices lectus laoreet non. Mauris non ex
            rhoncus, facilisis erat at, rhoncus quam. Donec urna libero,
            facilisis at ultricies nec, elementum et leo. Nulla ultrices arcu
            sed elementum mollis. In convallis elementum commodo. Aenean
            elementum arcu nisl. Vestibulum ante ipsum primis in faucibus orci
            luctus et ultrices posuere cubilia Curae; Aenean volutpat vehicula
            ex, non pulvinar leo ultrices ac. Nam porttitor velit ac lacus
            consequat aliquet in et odio. Nunc iaculis enim velit, nec sagittis
            nunc blandit ac. Cras cursus purus felis, sit amet lacinia risus
            auctor at. Fusce volutpat accumsan sagittis. Nunc ullamcorper nisl
            odio. Mauris ullamcorper nulla justo, sit amet volutpat enim laoreet
            ut.
          </Text>
        </View>
      </View>
    </Screen>
  );
});
