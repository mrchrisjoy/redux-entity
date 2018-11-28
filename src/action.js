/** @module Actions */
import { camelToMacroCase, camelToTitleCase } from './utils';

const defaultConfig = [
  'addEntity',
  'addEntities',
  'removeEntity',
  'removeEntities',
  'removeSelectedEntity',
  'addMeta',
  'select',
  'reset',
];

/**
 * Helper used to create action types.
 * @memberof Actions
 * @param {*} namespace Suffix for action types in camelCase.
 * @param {*} config Array of strings in camelCase.
 * @private
 */
const createTypes = (namespace, config) => config.reduce((accumulator, action) => ({
  [camelToMacroCase(action)]: `[${camelToTitleCase(namespace)}] ${camelToTitleCase(action)}`,
  ...accumulator,
}), {});

/**
 * Helper used to create action creator functions.
 * @memberof Actions
 * @param {*} types Action types object (see Actions::createTypes).
 * @param {*} config Array of strings in camelCase.
 * @private
 */
const createCreators = (types, config) => config.reduce((accumulator, action) => ({
  [action]: payload => ({ type: types[camelToMacroCase(action)], payload }),
  ...accumulator,
}), {});

/**
 * Helper used to create action config array.
 * @memberof Actions
 * @param {string[]} config Custom action config array.
 * @example
 * const config = createActionsConfig(['fetch', 'delete'])
 *
 * Output:
 * [
 *    'addEntity',
 *    'addEntities',
 *    'removeEntity',
 *    'removeEntities',
 *    'removeSelectedEntity',
 *    'addMeta',
 *    'select',
 *    'reset',
 *    // Custom config
 *    'fetch',
 *    'delete'
 * ]
 */
export const createActionsConfig = (config = []) => [...defaultConfig, ...config];

/**
 * Helper used to create actions objects (including action types and creators).
 * @memberof Actions
 * @param {string} namespace Suffix for action types in camelCase.
 * @param {string[]} config Array of strings in camelCase.
 * @example
 * const { types, creators } = createActions('collection', ['addEntity', 'removeEntity']);
 *
 * // Types
 * {
 *  REMOVE_ENTITY: '[Collection] Remove Entity',
 *  ADD_ENTITY: '[Collection] Add Entity'
 * }
 *
 * // Creators
 * {
 *  removeEntity: payload => ({ type: '[Collection] Remove Entity', payload }),
 *  addEntity: payload => ({ type: '[Collection] Add Entity', payload })
 * }
 */
export const createActions = (namespace = 'undefined', config = []) => {
  const types = createTypes(namespace, config);
  const creators = createCreators(types, config);
  return { types, creators };
};
