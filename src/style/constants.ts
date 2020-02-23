import { Dimensions, StyleSheet } from "react-native";
import Color from "color";
import { TextStyle } from "react-native";

const window = Dimensions.get("window");
export const windowWidth = window.width;
export const windowHeight = window.height;

export const colorBackgroundTheme = "#0A3EA5";
export const colorBackgroundAccent = "#FC7808";
export const colorBackgroundLight = "#F2EFDC";
export const colorBackgroundDark = "rgba(10, 10, 10, 1)";
export const colorBackgroundDanger = "#ff4444";

export const colorBackgroundThemeSoft = Color(colorBackgroundTheme)
  .lighten(0.25)
  .rgb()
  .string(2);
export const colorBackgroundThemeSofter = Color(colorBackgroundTheme)
  .lighten(0.5)
  .rgb()
  .string(2);
export const colorBackgroundThemeHard = Color(colorBackgroundTheme)
  .darken(0.25)
  .rgb()
  .string(2);
export const colorBackgroundThemeHarder = Color(colorBackgroundTheme)
  .darken(0.5)
  .rgb()
  .string(2);

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

export const colorTextTheme = "#0A3EA5";
export const colorTextAccent = "#FC7808";
export const colorTextLight = "rgba(255, 255, 255, 0.9)";
export const colorTextDark = "rgba(0, 0, 0, 0.9)";
export const colorTextDanger = "#ff4444";

export const colorTextLightSoft = Color(colorTextLight)
  .fade(0.3)
  .rgb()
  .string(2);
export const colorTextLightSofter = Color(colorTextLight)
  .fade(0.5)
  .rgb()
  .string(2);

export const colorTextDarkSoft = Color(colorTextDark)
  .fade(0.3)
  .rgb()
  .string(2);
export const colorTextDarkSofter = Color(colorTextDark)
  .fade(0.5)
  .rgb()
  .string(2);

export const spacingSmall = 4;
export const spacingMedium = 8;
export const spacingLarge = 16;
export const spacingExtraLarge = 32;

export const fontSizeExtraSmall = 8;
export const fontSizeSmall = 12;
export const fontSizeMedium = 16;
export const fontSizeLarge = 20;
export const fontSizeExtraLarge = 24;

export const fontWeightLight = "300";
export const fontWeightRegular = "400";
export const fontWeightSemiBold = "500";
export const fontWeightBold = "700";
export const fontWeightExtraBold = "800";

const transparentColor = "rgba(255, 255, 255, 0)";

const markdownDisabledFontStyle: TextStyle = {
  fontFamily: "OpenSans-Regular",
  color: colorTextDark,
  fontSize: 16,
  fontWeight: "400",
  textAlign: "auto",
  fontStyle: "normal"
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
    bottom: 0
  },
  bgImageView: {
    flex: 1,
    overflow: "hidden"
  },
  view: {
    alignSelf: "stretch"
  },
  codeBlock: markdownDisabledFontStyle,
  del: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid"
  },
  hr: {
    backgroundColor: colorBackgroundDark,
    height: 1
  },
  image: {
    height: 200, // Image maximum height
    width: Dimensions.get("window").width - 30, // Width based on the window width
    alignSelf: "center",
    resizeMode: "contain" // The image will scale uniformly (maintaining aspect ratio)
  },
  imageBox: {
    flex: 1,
    resizeMode: "cover"
  },
  inlineCode: markdownDisabledFontStyle,
  list: {},
  sublist: {
    paddingLeft: 20,
    width: Dimensions.get("window").width - 60
  },
  listItem: {
    flexDirection: "row"
  },
  listItemText: {
    flex: 1
  },
  listItemBullet: {
    fontSize: 20,
    lineHeight: 20
  },
  listItemNumber: markdownDisabledFontStyle,
  listRow: {
    flexDirection: "row"
  },
  paragraph: markdownDisabledFontStyle,
  paragraphCenter: markdownDisabledFontStyle,
  paragraphWithImage: markdownDisabledFontStyle,
  noMargin: {
    marginTop: 0,
    marginBottom: 0
  },
  table: {
    borderWidth: 1,
    borderColor: colorBackgroundDark,
    borderRadius: 3
  },
  tableHeader: {
    backgroundColor: colorBackgroundDark,
    flexDirection: "row"
  },
  tableHeaderCell: {
    ...markdownDisabledFontStyle
  },
  tableRow: {
    //borderBottomWidth: 1,
    borderColor: colorBackgroundLightDark,
    flexDirection: "row"
  },
  tableRowLast: {
    borderColor: transparentColor
  },
  tableRowCell: {
    padding: 5
  },

  textRow: {
    flexDirection: "row"
  },
  u: {
    borderColor: colorBackgroundDark,
    borderBottomWidth: 1
  }
});

export const markdownStyle = StyleSheet.create({
  heading: {
    fontFamily: "OpenSans-Regular",
    color: colorTextDark
  },
  heading1: {
    fontFamily: "OpenSans-Bold",
    fontSize: 32
  },
  heading2: {
    fontFamily: "OpenSans-Bold",
    fontSize: 24
  },
  heading3: {
    fontFamily: "OpenSans-Bold",
    fontSize: 18
  },
  heading4: {
    fontFamily: "OpenSans-Regular",
    fontSize: 16
  },
  heading5: {
    fontFamily: "OpenSans-Regular",
    fontSize: 13
  },
  heading6: {
    fontFamily: "OpenSans-Regular",
    fontSize: 11
  },
  text: {
    fontFamily: "OpenSans-Regular",
    color: colorTextDark
  },
  strong: {
    fontFamily: "OpenSans-Bold"
  },
  strikethrough: {
    textDecorationLine: "line-through",
    fontFamily: "OpenSans-Regular"
  },
  link: {
    fontFamily: "OpenSans-Regular",
    color: colorTextTheme
  },
  em: {
    fontFamily: "OpenSans-Regular",
    fontStyle: "italic"
  },
  listUnorderedItemIcon: {
    fontFamily: "OpenSans-Regular",
    fontSize: 14,
    marginTop: 10,
    marginRight: 10
  },
  listOrderedItemIcon: {
    fontFamily: "OpenSans-Regular",
    fontSize: 14,
    marginTop: 10,
    marginRight: 10
  },

  // new ones
  autolink: {
    fontFamily: "OpenSans-Regular",
    color: colorTextAccent
  },
  blockQuoteText: {
    fontFamily: "OpenSans-Regular",
    color: colorTextDarkSoft
  },
  blockQuoteSection: {
    flexDirection: "row"
  },
  blockQuoteSectionBar: {
    width: 3,
    height: null,
    backgroundColor: colorBackgroundLightDarker,
    marginRight: 15
  },
  bgImage: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  bgImageView: {
    flex: 1,
    overflow: "hidden"
  },
  view: {
    alignSelf: "stretch"
  },
  codeBlock: {
    fontFamily: "OpenSans-Regular",
    fontWeight: "500",
    padding: spacingSmall,
    backgroundColor: colorBackgroundLightDark
  },
  del: {
    fontFamily: "OpenSans-Regular",
    textDecorationLine: "line-through",
    textDecorationStyle: "solid"
  },
  hr: {
    backgroundColor: colorBackgroundDark,
    height: 1
  },
  image: {
    width: Dimensions.get("window").width - 30, // Width based on the window width
    alignSelf: "center",
    resizeMode: "center" // The image will scale uniformly (maintaining aspect ratio)
  },
  imageBox: {
    flex: 1,
    resizeMode: "cover"
  },
  inlineCode: {
    backgroundColor: colorBackgroundLightDarker,
    borderColor: colorBackgroundLightDarker,
    borderRadius: 3,
    borderWidth: 1,
    fontFamily: "OpenSans-Regular",
    fontWeight: "bold"
  },
  list: {},
  sublist: {
    paddingLeft: 20,
    width: Dimensions.get("window").width - 60
  },
  listItem: {
    flexDirection: "row"
  },
  listItemText: {
    flex: 1
  },
  listItemBullet: {
    fontSize: 20,
    lineHeight: 20
  },
  listItemNumber: {
    fontWeight: "bold"
  },
  listRow: {
    flexDirection: "row"
  },
  paragraph: {
    marginTop: 10,
    marginBottom: 10,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  paragraphCenter: {
    marginTop: 10,
    marginBottom: 10,
    flexWrap: "wrap",
    flexDirection: "row",
    textAlign: "center",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  paragraphWithImage: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  noMargin: {
    marginTop: 0,
    marginBottom: 0
  },
  table: {
    borderWidth: 1,
    borderColor: colorBackgroundLightDarker,
    borderRadius: 3
  },
  tableHeader: {
    backgroundColor: colorBackgroundLightDarker,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  tableHeaderCell: {
    color: colorBackgroundLight,
    fontWeight: "bold",
    padding: 5
  },
  tableRow: {
    borderColor: colorBackgroundLightDarker,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  tableRowLast: {
    borderColor: transparentColor
  },
  tableRowCell: {
    padding: 5
  },

  textRow: {
    flexDirection: "row"
  },
  u: {
    borderColor: colorBackgroundLightDarker,
    borderBottomWidth: 1
  }
});

export const hitSlopSmall = 8;
export const hitSlopMedium = 12;
export const hitSlopLarge = 16;

export const hitSlop = {
  small: {
    top: hitSlopSmall,
    left: hitSlopSmall,
    bottom: hitSlopSmall,
    right: hitSlopSmall
  },
  medium: {
    top: hitSlopMedium,
    left: hitSlopMedium,
    bottom: hitSlopMedium,
    right: hitSlopMedium
  },
  large: {
    top: hitSlopLarge,
    left: hitSlopLarge,
    bottom: hitSlopLarge,
    right: hitSlopLarge
  }
};
