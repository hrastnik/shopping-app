import { Dimensions, StyleSheet } from "react-native";
import Color from "color";
import { TextStyle } from "react-native";

const window = Dimensions.get("window");
export const windowWidth = window.width;
export const windowHeight = window.height;

export const colorTransparent = "transparent";

export const colorBackgroundTheme = "#587f8d";
export const colorBackgroundAccent = "#ef8f79";
export const colorBackgroundLight = "#f5fcff";
export const colorBackgroundDark = "#242424";
export const colorBackgroundDanger = "#ff4444";

export const colorBackgroundThemeSoft = "#85B0BA";
export const colorBackgroundThemeSofter = "#ABD6DC";
export const colorBackgroundThemeHard = "#406679";
export const colorBackgroundThemeHarder = "#2C4E65";

export const colorBackgroundLightDark = Color(colorBackgroundLight)
  .darken(0.03)
  .rgb()
  .string(2);
export const colorBackgroundLightDarker = Color(colorBackgroundLight)
  .darken(0.25)
  .rgb()
  .string(2);

export const colorBackgroundDarkLight = Color(colorBackgroundDark)
  .lighten(0.25)
  .rgb()
  .string(2);
export const colorBackgroundDarkLighter = Color(colorBackgroundDark)
  .lighten(0.5)
  .rgb()
  .string(2);

export const colorTextTheme = "#587F8D";
export const colorTextAccent = "#F5B29A";
export const colorTextLight = "#e6f9f9";
export const colorTextDark = "#091524";
export const colorTextDanger = "#ff4444";

export const colorTextLightSoft = Color(colorTextLight)
  .fade(0.3)
  .rgb()
  .string(2);
export const colorTextLightSofter = Color(colorTextLight)
  .fade(0.5)
  .rgb()
  .string(2);

export const colorTextDarkSoft = Color(colorTextDark).fade(0.3).rgb().string(2);
export const colorTextDarkSofter = Color(colorTextDark)
  .fade(0.5)
  .rgb()
  .string(2);

export const spacingSmall = 4;
export const spacingMedium = 8;
export const spacingLarge = 16;
export const spacingExtraLarge = 32;

export const fontSizeExtraSmall = 10;
export const fontSizeSmall = 12;
export const fontSizeMedium = 16;
export const fontSizeLarge = 20;
export const fontSizeExtraLarge = 24;

export const fontWeightLight = "300";
export const fontWeightRegular = "400";
export const fontWeightSemiBold = "600";
export const fontWeightBold = "800"; // This is usually 700 but doesn't show correct font
// export const fontWeightExtraBold = "800";

const transparentColor = "rgba(255, 255, 255, 0)";

const markdownDisabledFontStyle: TextStyle = {
  fontFamily: "SignikaNegative-Regular",
  color: colorTextDark,
  fontSize: 16,
  fontWeight: "400",
  textAlign: "auto",
  fontStyle: "normal",
};
export const markdownDisabledStyle = StyleSheet.create({
  heading: markdownDisabledFontStyle,
  heading1: markdownDisabledFontStyle,
  heading2: markdownDisabledFontStyle,
  heading3: markdownDisabledFontStyle,
  heading4: markdownDisabledFontStyle,
  heading5: markdownDisabledFontStyle,
  heading6: markdownDisabledFontStyle,
  text: markdownDisabledFontStyle,
  strong: markdownDisabledFontStyle,
  strikethrough: markdownDisabledFontStyle,
  link: markdownDisabledFontStyle,
  em: markdownDisabledFontStyle,
  listUnorderedItemIcon: markdownDisabledFontStyle,
  listOrderedItemIcon: markdownDisabledFontStyle,

  autolink: markdownDisabledFontStyle,
  blockQuoteText: markdownDisabledFontStyle,
  blockQuoteSection: markdownDisabledFontStyle,
  blockQuoteSectionBar: markdownDisabledFontStyle,
  bgImage: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bgImageView: {
    flex: 1,
    overflow: "hidden",
  },
  view: {
    alignSelf: "stretch",
  },
  codeBlock: markdownDisabledFontStyle,
  del: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
  hr: {
    backgroundColor: colorBackgroundDark,
    height: 1,
  },
  image: {
    height: 200, // Image maximum height
    width: Dimensions.get("window").width - 30, // Width based on the window width
    alignSelf: "center",
    resizeMode: "contain", // The image will scale uniformly (maintaining aspect ratio)
  },
  imageBox: {
    flex: 1,
    resizeMode: "cover",
  },
  inlineCode: markdownDisabledFontStyle,
  list: {},
  sublist: {
    paddingLeft: 20,
    width: Dimensions.get("window").width - 60,
  },
  listItem: {
    flexDirection: "row",
  },
  listItemText: {
    flex: 1,
  },
  listItemBullet: {
    fontSize: 20,
    lineHeight: 20,
  },
  listItemNumber: markdownDisabledFontStyle,
  listRow: {
    flexDirection: "row",
  },
  paragraph: markdownDisabledFontStyle,
  paragraphCenter: markdownDisabledFontStyle,
  paragraphWithImage: markdownDisabledFontStyle,
  noMargin: {
    marginTop: 0,
    marginBottom: 0,
  },
  table: {
    borderWidth: 1,
    borderColor: colorBackgroundDark,
    borderRadius: 3,
  },
  tableHeader: {
    backgroundColor: colorBackgroundDark,
    flexDirection: "row",
  },
  tableHeaderCell: {
    ...markdownDisabledFontStyle,
  },
  tableRow: {
    //borderBottomWidth: 1,
    borderColor: colorBackgroundLightDark,
    flexDirection: "row",
  },
  tableRowLast: {
    borderColor: transparentColor,
  },
  tableRowCell: {
    padding: 5,
  },

  textRow: {
    flexDirection: "row",
  },
  u: {
    borderColor: colorBackgroundDark,
    borderBottomWidth: 1,
  },
});

export const markdownStyle = StyleSheet.create({
  heading: {
    fontFamily: "SignikaNegative-Regular",
    color: colorTextDark,
  },
  heading1: {
    fontFamily: "SignikaNegative-Bold",
    fontSize: 32,
  },
  heading2: {
    fontFamily: "SignikaNegative-Bold",
    fontSize: 24,
  },
  heading3: {
    fontFamily: "SignikaNegative-Bold",
    fontSize: 18,
  },
  heading4: {
    fontFamily: "SignikaNegative-Regular",
    fontSize: 16,
  },
  heading5: {
    fontFamily: "SignikaNegative-Regular",
    fontSize: 13,
  },
  heading6: {
    fontFamily: "SignikaNegative-Regular",
    fontSize: 11,
  },
  text: {
    fontFamily: "SignikaNegative-Regular",
    color: colorTextDark,
  },
  strong: {
    fontFamily: "SignikaNegative-Bold",
  },
  strikethrough: {
    textDecorationLine: "line-through",
    fontFamily: "SignikaNegative-Regular",
  },
  link: {
    fontFamily: "SignikaNegative-Regular",
    color: colorTextTheme,
  },
  em: {
    fontFamily: "SignikaNegative-Regular",
    fontStyle: "italic",
  },
  listUnorderedItemIcon: {
    fontFamily: "SignikaNegative-Regular",
    fontSize: 14,
    marginTop: 10,
    marginRight: 10,
  },
  listOrderedItemIcon: {
    fontFamily: "SignikaNegative-Regular",
    fontSize: 14,
    marginTop: 10,
    marginRight: 10,
  },

  // new ones
  autolink: {
    fontFamily: "SignikaNegative-Regular",
    color: colorTextAccent,
  },
  blockQuoteText: {
    fontFamily: "SignikaNegative-Regular",
    color: colorTextDarkSoft,
  },
  blockQuoteSection: {
    flexDirection: "row",
  },
  blockQuoteSectionBar: {
    width: 3,
    height: null,
    backgroundColor: colorBackgroundLightDarker,
    marginRight: 15,
  },
  bgImage: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bgImageView: {
    flex: 1,
    overflow: "hidden",
  },
  view: {
    alignSelf: "stretch",
  },
  codeBlock: {
    fontFamily: "SignikaNegative-Regular",
    fontWeight: "500",
    padding: spacingSmall,
    backgroundColor: colorBackgroundLightDark,
  },
  del: {
    fontFamily: "SignikaNegative-Regular",
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
  hr: {
    backgroundColor: colorBackgroundDark,
    height: 1,
  },
  image: {
    width: Dimensions.get("window").width - 30, // Width based on the window width
    alignSelf: "center",
    resizeMode: "center", // The image will scale uniformly (maintaining aspect ratio)
  },
  imageBox: {
    flex: 1,
    resizeMode: "cover",
  },
  inlineCode: {
    backgroundColor: colorBackgroundLightDarker,
    borderColor: colorBackgroundLightDarker,
    borderRadius: 3,
    borderWidth: 1,
    fontFamily: "SignikaNegative-Regular",
    fontWeight: "bold",
  },
  list: {},
  sublist: {
    paddingLeft: 20,
    width: Dimensions.get("window").width - 60,
  },
  listItem: {
    flexDirection: "row",
  },
  listItemText: {
    flex: 1,
  },
  listItemBullet: {
    fontSize: 20,
    lineHeight: 20,
  },
  listItemNumber: {
    fontWeight: "bold",
  },
  listRow: {
    flexDirection: "row",
  },
  paragraph: {
    marginTop: 10,
    marginBottom: 10,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  paragraphCenter: {
    marginTop: 10,
    marginBottom: 10,
    flexWrap: "wrap",
    flexDirection: "row",
    textAlign: "center",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  paragraphWithImage: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  noMargin: {
    marginTop: 0,
    marginBottom: 0,
  },
  table: {
    borderWidth: 1,
    borderColor: colorBackgroundLightDarker,
    borderRadius: 3,
  },
  tableHeader: {
    backgroundColor: colorBackgroundLightDarker,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  tableHeaderCell: {
    color: colorBackgroundLight,
    fontWeight: "bold",
    padding: 5,
  },
  tableRow: {
    borderColor: colorBackgroundLightDarker,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  tableRowLast: {
    borderColor: transparentColor,
  },
  tableRowCell: {
    padding: 5,
  },

  textRow: {
    flexDirection: "row",
  },
  u: {
    borderColor: colorBackgroundLightDarker,
    borderBottomWidth: 1,
  },
});

export const hitSlopSmall = 8 as const;
export const hitSlopMedium = 12 as const;
export const hitSlopLarge = 16 as const;
export const hitSlopExtraLarge = 32 as const;

export const hitSlop = {
  small: {
    top: hitSlopSmall,
    left: hitSlopSmall,
    bottom: hitSlopSmall,
    right: hitSlopSmall,
  },
  medium: {
    top: hitSlopMedium,
    left: hitSlopMedium,
    bottom: hitSlopMedium,
    right: hitSlopMedium,
  },
  large: {
    top: hitSlopLarge,
    left: hitSlopLarge,
    bottom: hitSlopLarge,
    right: hitSlopLarge,
  },
  extraLarge: {
    top: hitSlopExtraLarge,
    left: hitSlopExtraLarge,
    bottom: hitSlopExtraLarge,
    right: hitSlopExtraLarge,
  },
};
