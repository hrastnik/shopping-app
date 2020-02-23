import React from "react";
import { observer } from "mobx-react";
import { TouchableOpacity, FlatList, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Screen } from "~/components/Screen";
import { Text } from "~/components/Text";
import { View } from "~/components/View";
import { Spacer } from "~/components/Spacer";
import { Spinner } from "~/components/Spinner";
import { shadow } from "~/utils/shadow";
import { constants as C } from "~/style";
import { useRightComponent } from "~/hooks/headerHooks";
import { IconButton } from "~/components";
import { keyExtractor } from "~/utils/keyExtractor";
import { useQuery } from "~/mobx/useQuery";

interface SecretListItemProps {
  secret: {
    title: string;
    image: string;
  };
  onPress: (secret: SecretListItemProps["secret"]) => any;
}

const SecretListItem = ({ secret, onPress }: SecretListItemProps) => {
  const { image, title } = secret;
  return (
    <TouchableOpacity
      onPress={() => onPress(secret)}
      style={{ borderRadius: 8, ...shadow(3), opacity: 0.99 }}
    >
      <View
        style={{
          aspectRatio: 2.66,
          borderRadius: 8,
          backgroundColor: C.colorBackgroundDark,
          justifyContent: "flex-end",
          alignItems: "flex-start"
        }}
        paddingLarge
      >
        <Image
          source={{ uri: image }}
          style={{ ...StyleSheet.absoluteFillObject, borderRadius: 8 }}
        />

        <View style={{ backgroundColor: "blue" }} paddingSmall>
          <Text sizeSmall weightBold colorLight>
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const SecretZadarScreen = observer(() => {
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

  const query = useQuery(
    store => store.postStore.readPostList,
    store => store.postStore.map
  );

  const handlePress = secret => {
    navigation.navigate("SecretDetails");
  };

  if (query.isFirstLoad) {
    return (
      <View centerContent aspectRatioOne>
        <Spinner />
      </View>
    );
  }

  console.warn(query.data);

  return (
    <Screen preventScroll>
      <FlatList
        {...query.flatListProps}
        keyExtractor={keyExtractor}
        contentContainerStyle={{ flexGrow: 1, padding: C.spacingMedium }}
        ItemSeparatorComponent={Spacer}
        renderItem={({ item: secret }) => {
          return <SecretListItem secret={secret} onPress={handlePress} />;
        }}
        ListFooterComponent={
          query.isFetchingNext ? (
            <View paddingMedium>
              <Spinner />
            </View>
          ) : null
        }
      />
    </Screen>
  );
});
