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

const parseToTitleCase = str => str
  .replace(/([A-Z])/g, ' $1')
  .replace(/\w\S*/g, txt => `${txt.charAt(0).toUpperCase()}${txt.substr(1).toLowerCase()}`);

const parseToMacroCase = str => str
  .replace(/([A-Z])/g, '_$1')
  .toUpperCase();

const createTypes = (namespace, config) => config.reduce((accumulator, action) => ({
  [parseToMacroCase(action)]: `[${parseToTitleCase(namespace)}] ${parseToTitleCase(action)}`,
  ...accumulator,
}), {});

const createCreators = (types, config) => config.reduce((accumulator, action) => ({
  [action]: payload => ({ type: types[parseToMacroCase(action)], payload }),
  ...accumulator,
}), {});

export const filterActionTypes = actions => Object.keys(actions)
  .filter(action => action.match(new RegExp(/^([A-Z])+(_)?/, 'g')))
  .reduce((accumulator, key) => ({ ...accumulator, [key]: actions[key] }), {});

export const createActionsConfig = (config = []) => [...defaultConfig, ...config];

export const createActions = (namespace, config = defaultConfig) => {
  const types = createTypes(namespace, config);
  const creators = createCreators(types, config);
  return { types, creators };
};
