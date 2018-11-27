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

const createTypes = (namespace, config) => config.reduce((accumulator, action) => ({
  [camelToMacroCase(action)]: `[${camelToTitleCase(namespace)}] ${camelToTitleCase(action)}`,
  ...accumulator,
}), {});

const createCreators = (types, config) => config.reduce((accumulator, action) => ({
  [action]: payload => ({ type: types[camelToMacroCase(action)], payload }),
  ...accumulator,
}), {});

export const createActionsConfig = (config = []) => [...defaultConfig, ...config];

export const createActions = (namespace = 'undefined', config = []) => {
  const types = createTypes(namespace, config);
  const creators = createCreators(types, config);
  return { types, creators };
};
