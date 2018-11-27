/* global describe, it, expect */
import { createActions, createActionsConfig } from './action';
import { camelToMacroCase } from './utils';

describe('action.js', () => {
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

  describe('createActionsConfig', () => {
    it('should return default config when passing no params', () => {
      expect(createActionsConfig()).toEqual(defaultConfig);
      expect(createActionsConfig([])).toEqual(defaultConfig);
    });

    it('should return default config when passing no params', () => {
      const additionalConfig = ['destroy', 'fetch', 'load'];
      expect(createActionsConfig(additionalConfig))
        .toMatchObject([...defaultConfig, ...additionalConfig]);
    });
  });

  describe('createActions', () => {
    // Choose random payload
    const payload = [
      'test',
      { custom: 1 },
      null,
      undefined,
      43,
    ][Math.floor(Math.random() * 5)];

    it('should produce empty action types and creators', () => {
      expect(createActions()).toMatchObject({
        types: {},
        creators: {},
      });
    });

    it('should return default action types and creators with undefined namespace', () => {
      const { types, creators } = createActions(undefined, createActionsConfig());
      const creatorKeys = Object.keys(creators);
      expect(types).toMatchObject({
        RESET: '[Undefined] Reset',
        SELECT: '[Undefined] Select',
        ADD_META: '[Undefined] Add Meta',
        REMOVE_SELECTED_ENTITY: '[Undefined] Remove Selected Entity',
        REMOVE_ENTITIES: '[Undefined] Remove Entities',
        REMOVE_ENTITY: '[Undefined] Remove Entity',
        ADD_ENTITIES: '[Undefined] Add Entities',
        ADD_ENTITY: '[Undefined] Add Entity',
      });
      expect(Object.keys(creators).sort()).toEqual(defaultConfig.sort());
      creatorKeys.forEach(creator => expect(creators[creator](payload)).toMatchObject({
        type: types[camelToMacroCase(creator)],
        payload,
      }));
    });

    it('should return default action types and creators with a defined namespace', () => {
      const { types, creators } = createActions('collection', createActionsConfig());
      const creatorKeys = Object.keys(creators);
      expect(types).toMatchObject({
        RESET: '[Collection] Reset',
        SELECT: '[Collection] Select',
        ADD_META: '[Collection] Add Meta',
        REMOVE_SELECTED_ENTITY: '[Collection] Remove Selected Entity',
        REMOVE_ENTITIES: '[Collection] Remove Entities',
        REMOVE_ENTITY: '[Collection] Remove Entity',
        ADD_ENTITIES: '[Collection] Add Entities',
        ADD_ENTITY: '[Collection] Add Entity',
      });
      expect(creatorKeys.sort()).toEqual(defaultConfig.sort());
      creatorKeys.forEach(creator => expect(creators[creator](payload)).toMatchObject({
        type: types[camelToMacroCase(creator)],
        payload,
      }));
    });
  });
});
