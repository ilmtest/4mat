import {
  applyRules,
  applySmartQuotes,
  cleanMultilineSpaces,
  condenseMultilines,
  fixQuotes as fixMyQuotes,
  fixSalutations,
  reduceSpaces as reduceMySpaces,
  singleToDoubleQuotes,
} from '@ilmtest/ilmtest-sdk-js';

const fixQuotes = (body) => applySmartQuotes(fixMyQuotes(body));

const reduceSpaces = (body) => reduceMySpaces(cleanMultilineSpaces(body));

export {
  applyRules,
  condenseMultilines,
  fixQuotes,
  fixSalutations,
  reduceSpaces,
  singleToDoubleQuotes,
};
