import React from "react";
import { Image as RNImage, ImageProps as RNImageProps } from "react-native";

export interface ImageProps extends RNImageProps {}

export type Image = typeof Image;
export const Image = (props: ImageProps) => {
  return <RNImage fadeDuration={0} {...props} />;
};
