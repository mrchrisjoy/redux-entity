/**
 * @module Utils
 * @private
 */

/**
 * Convert string from camelCase to Title Case.
 * @memberof Utils
 * @param {string} str String to be converted
 * @private
 */
export const camelToTitleCase = str => str
  .replace(/([A-Z])/g, ' $1')
  .replace(/\w\S*/g, txt => `${txt.charAt(0).toUpperCase()}${txt.substr(1).toLowerCase()}`);

/**
 * Convert string from camelCase to MACRO_CASE.
 * @memberof Utils
 * @param {string} str String to be converted
 * @private
 */
export const camelToMacroCase = str => str
  .replace(/([A-Z])/g, '_$1')
  .toUpperCase();

/**
 * Reduce an object omitting non-MACRO_CASE keys.
 * @memberof Utils
 * @param {Object} object Object that needs to be reduced.
 * @private
 */
export const filterMacroCaseKeys = object => Object.keys(object)
  .filter(action => action.match(new RegExp(/^([A-Z])+(_)?/g)))
  .reduce((accumulator, key) => ({ ...accumulator, [key]: object[key] }), {});
