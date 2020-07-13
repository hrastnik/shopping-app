import { RefObject, useRef, useEffect } from "react";
import { LayoutChangeEvent, ScrollView } from "react-native";

export function useScrollToField(
  fieldName: string,
  scrollView: RefObject<ScrollView>,
  touched,
  errors
) {
  const y = useRef(0);
  const onLayout = (event: LayoutChangeEvent) =>
    (y.current = event.nativeEvent.layout.y);
  const shouldScroll = Boolean(touched[fieldName] && errors[fieldName]);

  useEffect(() => {
    if (shouldScroll)
      scrollView.current.scrollTo({ y: y.current, animated: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldScroll]);

  return onLayout;
}
