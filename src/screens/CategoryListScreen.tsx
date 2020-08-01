import React from "react";
import { observer } from "mobx-react";

import { ScreenNoScroll } from "~/components/Screen";

import { CategoryListView } from "~/features/category-list-view/category-list-view.component";

export const CategoryListScreen = observer(() => {
  return (
    <ScreenNoScroll>
      <CategoryListView />
    </ScreenNoScroll>
  );
});
