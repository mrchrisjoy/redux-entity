export const camelToTitleCase = str => str
  .replace(/([A-Z])/g, ' $1')
  .replace(/\w\S*/g, txt => `${txt.charAt(0).toUpperCase()}${txt.substr(1).toLowerCase()}`);

export const camelToMacroCase = str => str
  .replace(/([A-Z])/g, '_$1')
  .toUpperCase();

export const filterMacroCaseKeys = actions => Object.keys(actions)
  .filter(action => action.match(new RegExp(/^([A-Z])+(_)?/, 'g')))
  .reduce((accumulator, key) => ({ ...accumulator, [key]: actions[key] }), {});
