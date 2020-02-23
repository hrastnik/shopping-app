import React, { useEffect } from "react";
import { Image, StatusBar, StyleSheet } from "react-native";
import Orientation from "react-native-orientation";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";

import { Screen } from "~/components/Screen";
import { View } from "~/components/View";
import { IconButton } from "~/components/IconButton";
import { MeasureLayout } from "~/components/MeasureLayout";

const S = StyleSheet.create({
  image: { width: "100%", height: "100%", borderRadius: 8 }
});

const renderItem = ({ item: source }) => {
  return (
    <View flex centerContent paddingLarge>
      <Image resizeMode="cover" source={source} style={S.image} />
    </View>
  );
};

export const GalleryScreen = observer(() => {
  useEffect(() => {
    Orientation.lockToLandscape();
    return Orientation.lockToPortrait;
  }, []);

  useEffect(() => {
    StatusBar.setHidden(true);
    return () => StatusBar.setHidden(false);
  }, []);

  const navigation = useNavigation();

  return (
    <Screen preventScroll>
      <MeasureLayout>
        {({ width }) => {
          return (
            <Carousel
              layout="stack"
              data={[
                require("../assets/images/zadar-0.jpg"),
                require("../assets/images/zadar-1.jpg"),
                require("../assets/images/zadar-2.jpg"),
                require("../assets/images/zadar-3.jpg"),
                require("../assets/images/zadar-4.jpg"),
                require("../assets/images/zadar-5.jpg")
              ]}
              renderItem={renderItem}
              sliderWidth={width}
              itemWidth={width}
            />
          );
        }}
      </MeasureLayout>

      <View absoluteTopLeftMedium>
        <IconButton
          iconName="chevron-left"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    </Screen>
  );
});
