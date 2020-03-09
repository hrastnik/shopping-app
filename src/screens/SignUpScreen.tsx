import React from "react";
import { observer } from "mobx-react";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

import { Screen } from "~/components/Screen";
import { Text } from "~/components/Text";
import { View } from "~/components/View";
import { Spacer } from "~/components/Spacer";
import {
  Image,
  StyleSheet,
  ImageProps,
  TouchableOpacity,
  TouchableOpacityProps
} from "react-native";
import { constants as C } from "~/style";
import { shadow } from "~/utils/shadow";
import { Icon, IconProps } from "~/components/Icon";

const S = StyleSheet.create({
  cardWrap: { borderRadius: 8, ...shadow(3), opacity: 0.99 },
  cardInner: {
    aspectRatio: 2.66,
    borderRadius: 8,
    backgroundColor: C.colorBackgroundDark
  },
  cardImage: { ...StyleSheet.absoluteFillObject, borderRadius: 8 },
  titleWrap: { backgroundColor: C.colorBackgroundTheme },
  iconWrap: {
    borderRadius: 26,
    width: 52,
    height: 52,
    backgroundColor: C.colorBackgroundLight,
    opacity: 0.99,
    ...shadow(1)
  },

  logoImage: { width: "70%", aspectRatio: 2.8 },
  bottomLogo: { width: "20%", aspectRatio: 1 }
});

interface CardProps {
  source: ImageProps["source"];
  title: string;
  iconName: IconProps["name"];
  onPress: TouchableOpacityProps["onPress"];
}

const Card = ({ source, title, iconName, onPress }: CardProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={S.cardWrap}>
      <View style={S.cardInner}>
        <Image source={source} style={S.cardImage} />

        <View absoluteBottomLeftLarge style={S.titleWrap} paddingSmall>
          <Text sizeSmall weightBold colorLight>
            {title}
          </Text>
        </View>

        <View
          absoluteTopRightLarge
          style={S.iconWrap}
          paddingSmall
          centerContent
        >
          <Icon name={iconName} color={C.colorTextTheme} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const SignUpScreen = observer(() => {
  const navigation = useNavigation();

  return (
    <Screen>
      <View paddingMedium>
        <View centerContent paddingLarge>
          <Image
            resizeMode="center"
            source={{ uri: "https://placebear.com/500/250" }}
            style={S.logoImage}
          />
        </View>

        <Card
          onPress={() => {
            navigation.navigate("SecretZadar");
          }}
          source={{ uri: "https://placebear.com/800/300" }}
          title="SECRET ZADAR"
          iconName="pillar"
        />

        <Spacer />

        <Card
          onPress={() => {
            navigation.navigate("Gallery");
          }}
          source={{ uri: "https://placebear.com/800/301" }}
          title="BEST OF ZADAR"
          iconName="photo-camera"
        />

        <Spacer />

        <Card
          onPress={() => {
            navigation.navigate("Music");
          }}
          source={{ uri: "https://placebear.com/800/302" }}
          title="TRADITIONAL MUSIC OF THE CITY OF ZADAR"
          iconName="volume-up"
        />

        <View centerContent paddingLarge>
          <Image
            source={{ uri: "https://placebear.com/200/200" }}
            style={S.bottomLogo}
          />
          <Spacer />
          <Text colorLight alignCenter sizeSmall>
            © 2020 - {moment().format("YYYY")} ZADAR TOURIST BOARD
          </Text>
          <Text colorLight alignCenter sizeSmall>
            Developed by Lloyds Design
          </Text>
        </View>
      </View>
    </Screen>
  );
});
