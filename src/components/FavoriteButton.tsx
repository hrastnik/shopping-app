import React from "react";
import { observer } from "mobx-react";

import { useStore } from "~/mobx/useStore";
import { IconButton } from "./IconButton";

export const FavoriteButton = observer(() => {
  const store = useStore();
  const product = store.uiStore.activeProduct;

  if (!product) return null;

  return (
    <IconButton
      onPress={product.toggleFavorite}
      iconName={product.isFavorited ? "heart" : "heart-outline"}
    />
  );
});
