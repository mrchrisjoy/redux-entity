/** @module Actions */
import { camelToMacroCase, camelToTitleCase } from './utils';

/**
 * Default actions configuration array.
 * @private
 */
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
 * Creates an action types object using the title case namespacing convention.
 * (eg. '[Collection] Action').
 * @memberof Actions
 * @param {string} namespace Action types namespace in camelCase.
 * @param {string[]} config Array of strings containing actions in camelCase.
 * @private
 */
const createTypes = (namespace, config) => {
  const typePrefix = `[${camelToTitleCase(namespace)}]`;
  return config.reduce((accumulator, action) => ({
    [camelToMacroCase(action)]: `${typePrefix} ${camelToTitleCase(action)}`,
    ...accumulator,
  }), {});
};

/**
 * Creates an object containing action creator functions.
 * @memberof Actions
 * @param {Object} types Action types object (see Actions::createTypes).
 * @param {string[]} config Array of strings in camelCase.
 * @private
 */
const createCreators = (types, config) => config.reduce((accumulator, action) => ({
  [action]: payload => ({ type: types[camelToMacroCase(action)], payload }),
  ...accumulator,
}), {});

/**
 * Helps create an actions config (used in Actions::createActions).
 * @memberof Actions
 * @param {string[]} config Array of strings containing actions in camelCase.
 * @example
 * import { createActionsConfig } from '@foundcareers/redux-entity';
 *
 * const config = createActionsConfig(['fetch', 'delete'])
 *
 * // config
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
 * Creates an object containing action types and creators.
 * @memberof Actions
 * @param {string} namespace Action types namespace in camelCase.
 * @param {string[]} config Array of strings containing actions in camelCase.
 * @example
 * import { createActionsConfig } from '@foundcareers/redux-entity';
 *
 * const { types, creators } = createActions('collection',
 *  ['addEntity', 'removeEntity']
 * );
 *
 * // types
 * {
 *  REMOVE_ENTITY: '[Collection] Remove Entity',
 *  ADD_ENTITY: '[Collection] Add Entity'
 * }
 *
 * // creators
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
