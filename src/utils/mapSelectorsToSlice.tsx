/**
 * Maps selectors to some state slice
 * For example if you have a selectors like this:
 *
 *  const selector = state => state.user.name
 *
 * after mapping it with `auth` as the sliceName it would look like this
 *
 *  mapSelectorsToSlice({ name: selector }, 'auth');
 *
 * returns a selector equivalent to this
 *
 *  { name: state => state.auth.user.name }
 *
 * @param {object} selectors Object containing the selectors of some state slice
 * @param {string} sliceName String to map the selectors to
 */
function mapSelectorsToSlice<SelectorType>(
  selectors: SelectorType,
  sliceName: string
) {
  const mappedSelectors: any = {};

  for (const key in selectors) {
    if (key === "global") continue;

    const selector: any = selectors[key];

    mappedSelectors[key] = (state, ...arg) =>
      selector(state[sliceName], ...arg);
  }

  return mappedSelectors as Omit<SelectorType, "global">;
}

export { mapSelectorsToSlice };
