/**
 *
 * @param {number} depth - integer between 1 - 24 - creates a shadow that looks same accross platforms
 * Copied values from https://ethercreative.github.io/react-native-shadow-generator/
 */
function shadow(depth) {
  const height = depth / 2;
  // prettier-ignore
  const shadowOpacity = [
    0.18, 0.20, 0.21, 0.23, 0.25, 0.27,
    0.28, 0.30, 0.32, 0.34, 0.35, 0.37,
    0.39, 0.41, 0.42, 0.44, 0.46, 0.48,
    0.49, 0.51, 0.53, 0.55, 0.56, 0.58
  ][depth];
  // prettier-ignore
  const shadowRadius = [
     1.00,  1.41,  2.22,  2.62,  3.84,  4.65, 
     4.65,  4.65,  5.46,  6.27,  6.68,  7.49, 
     8.30,  9.11,  9.51, 10.32, 11.14, 11.95,
    12.35, 13.16, 13.97, 14.78, 15.19, 16.00
  ][depth];

  return {
    shadowColor: "#000",
    shadowOffset: { width: 0, height },
    shadowOpacity,
    shadowRadius,
    zIndex: depth,

    elevation: depth,
  };
}

export { shadow };
