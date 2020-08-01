import React from "react";
import { observer } from "mobx-react";
import { StyleSheet, TouchableOpacity } from "react-native";
import color from "color";

import { Image } from "~/components/Image";
import { View } from "~/components/View";
import { Text } from "~/components/Text";
import { useStore } from "~/mobx/useStore";
import { CategoryInstance } from "~/mobx/entities/category/Category";
import { constants as C } from "~/style";
import { useNavigation } from "@react-navigation/native";
import { shadow } from "~/utils/shadow";
import { ScreenNavigationProp } from "~/screens/RouterTypes";

const S = StyleSheet.create({
  flex: { flex: 1 },
  contentContainer: { padding: C.spacingSmall },
  column: {
    width: "33.3333%",
    aspectRatio: 1,
    padding: C.spacingSmall,
  },
  overlay: {
    flex: 1,
    backgroundColor: color(C.colorBackgroundDark).alpha(0.15).string(),
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: C.colorBackgroundLight,
  },
  categoryText: {
    textShadowColor: C.colorBackgroundDark,
    textShadowRadius: 9,
    textShadowOffset: {
      width: 0,
      height: 0,
    },
  },
});

export interface CategoryListItemProps {
  category: CategoryInstance;
}

export const CategoryListItem = observer(
  ({ category }: CategoryListItemProps) => {
    const navigation = useNavigation<
      ScreenNavigationProp<"Tab.CategoryListScreen">
    >();

    const store = useStore();
    const regionId = store.uiStore.activeRegionId;

    return (
      <TouchableOpacity
        style={S.column}
        onPress={() => {
          navigation.navigate("ProductListScreen", {
            categoryId: category.id,
            regionId,
          });
        }}
      >
        <View
          flex
          style={{
            opacity: 0.99,
            borderRadius: 4,
            overflow: "hidden",
            ...shadow(2),
          }}
        >
          <Image
            style={S.image}
            source={category.image.source}
            resizeMode="cover"
          />
          <View style={S.overlay} paddingMedium>
            <Text sizeLarge weightBold style={S.categoryText}>
              {category.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
);
