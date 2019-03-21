/* global describe, it, expect */
import { createActions } from './action';
import { createCollectionState } from './factory';
import { camelToMacroCase } from './utils';
import * as reducer from './reducer';

describe('reducer.js', () => {
  const initialState = createCollectionState({
    entities: {
      1: { id: '1' },
      2: { id: '2' },
      3: { id: '3' },
      4: { id: '4' },
      5: { id: '5' },
    },
    selectedEntityId: '1',
  });

  describe('addEntity', () => {
    it('should add new entity', () => {
      const payload = { id: '6' };
      const prevState = Object.assign({}, initialState);
      const finalState = reducer.addEntity(prevState, payload);
      expect(Object.keys(prevState.entities).length).toEqual(5);
      expect(prevState.entities['6']).not.toBeDefined();
      expect(Object.keys(finalState.entities).length).toEqual(6);
      expect(finalState.entities['1'].id).toBe('1');
      expect(finalState.entities['6'].id).toBe('6');
    });

    it('should update existing entity', () => {
      const payload = { id: '3', data: 'some thing' };
      const prevState = Object.assign({}, initialState);
      const finalState = reducer.addEntity(prevState, payload);
      expect(Object.keys(prevState.entities).length).toEqual(5);
      expect(Object.keys(finalState.entities).length).toEqual(5);
      expect(finalState.entities['3'].data).toBeDefined();
    });

    it('should add new entities to empty initial state', () => {
      const payload = { id: '6' };
      const prevState = createCollectionState();
      const finalState = reducer.addEntity(prevState, payload);
      expect(Object.keys(prevState.entities).length).toEqual(0);
      expect(Object.keys(finalState.entities).length).toEqual(1);
    });

    it('should merge existing entity when adding', () => {
      const payload = { id: '6', newAttribute: true };
      const prevState = createCollectionState({
        entities: {
          6: {
            id: '6',
            oldAttribute: true,
          },
        },
      });
      const finalState = reducer.addEntity(prevState, payload);
      expect(finalState.entities).toEqual({
        6: {
          id: '6',
          oldAttribute: true,
          newAttribute: true,
        },
      });
    });
  });

  describe('addEntities', () => {
    it('should add new set of entities', () => {
      const payload = { 6: { id: '6' }, 7: { id: '7' } };
      const prevState = Object.assign({}, initialState);
      const finalState = reducer.addEntities(prevState, payload);
      expect(Object.keys(prevState.entities).length).toEqual(5);
      expect(Object.keys(finalState.entities).length).toEqual(7);
      expect(finalState.entities['6'].id).toEqual('6');
      expect(finalState.entities['7'].id).toEqual('7');
    });

    it('should update existing entities', () => {
      const payload = {
        1: { id: '1', data: 'hello' },
        5: { id: '5', data: 'bye' },
      };
      const prevState = Object.assign({}, initialState);
      const finalState = reducer.addEntities(prevState, payload);
      expect(Object.keys(prevState.entities).length).toEqual(5);
      expect(Object.keys(finalState.entities).length).toEqual(5);
      expect(finalState.entities['1'].data).toBeDefined();
      expect(finalState.entities['5'].data).toBeDefined();
    });

    it('should add new entities to empty initial state', () => {
      const payload = { 1: { id: '1' }, 2: { id: '2' }, 3: { id: '3' } };
      const prevState = createCollectionState();
      const finalState = reducer.addEntities(prevState, payload);
      expect(Object.keys(prevState.entities).length).toEqual(0);
      expect(Object.keys(finalState.entities).length).toEqual(3);
    });
  });

  describe('removeEntity', () => {
    it('should remove an entity', () => {
      const payload = '1';
      const prevState = Object.assign({}, initialState);
      const finalState = reducer.removeEntity(prevState, payload);
      expect(Object.keys(prevState.entities).length).toEqual(5);
      expect(Object.keys(finalState.entities).length).toEqual(4);
      expect(finalState.entities['1']).toBeUndefined();
    });

    it('shouldn\'t remove an entity', () => {
      const payload = '7';
      const prevState = Object.assign({}, initialState);
      const finalState = reducer.removeEntity(prevState, payload);
      expect(Object.keys(prevState.entities).length).toEqual(5);
      expect(Object.keys(finalState.entities).length).toEqual(5);
    });
  });

  describe('removeEntities', () => {
    it('should remove entities', () => {
      const payload = ['1', '2', '3'];
      const prevState = Object.assign({}, initialState);
      const finalState = reducer.removeEntities(prevState, payload);
      expect(Object.keys(prevState.entities).length).toBe(5);
      expect(Object.keys(finalState.entities).length).toBe(2);
      expect(finalState.entities['1']).toBeUndefined();
      expect(finalState.entities['2']).toBeUndefined();
      expect(finalState.entities['3']).toBeUndefined();
    });

    it('shouldn\'t remove entities', () => {
      const payload = ['6', '7', '8'];
      const prevState = Object.assign({}, initialState);
      const finalState = reducer.removeEntities(prevState, payload);
      expect(Object.keys(prevState.entities).length).toBe(5);
      expect(Object.keys(finalState.entities).length).toBe(5);
    });
  });

  describe('removeSelectedEntity', () => {
    it('should remove selected entity', () => {
      const prevState = Object.assign({}, initialState);
      const finalState = reducer.removeSelectedEntity(prevState);
      expect(prevState.selectedEntityId).toBe('1');
      expect(finalState.selectedEntityId).toBeNull();
    });
  });

  describe('addMeta', () => {
    it('should add meta to entity', () => {
      const payload = {
        currentPage: 1,
        nextPage: null,
        prevPage: null,
        totalPages: 1,
        totalCount: 3,
      };
      const prevState = Object.assign({}, initialState);
      const finalState = reducer.addMeta(prevState, payload);
      expect(prevState.meta).toMatchObject({});
      expect(finalState.meta).toMatchObject(payload);
    });
  });

  describe('select', () => {
    it('should change selected entity', () => {
      const payload = '2';
      const prevState = Object.assign({}, initialState);
      const finalState = reducer.select(prevState, payload);
      expect(prevState.selectedEntityId).toBe('1');
      expect(finalState.selectedEntityId).toEqual(payload);
    });
  });

  describe('reset', () => {
    it('should reset state to prevState', () => {
      const prevState = Object.assign({}, initialState);
      const emptyInitialState = createCollectionState();
      const finalState = reducer.reset(prevState, emptyInitialState);
      expect(prevState.selectedEntityId).toEqual('1');
      expect(Object.keys(prevState.entities).length).toEqual(5);
      expect(finalState.selectedEntityId).toBeNull();
      expect(Object.keys(finalState.entities).length).toEqual(0);
    });
  });

  describe('createReducer', () => {
    it('should reduce state using a simple action', () => {
      const actionTypes = { ADD_ENTITY: '[Collection] Add Entity' };
      const reducerFunction = reducer.createReducer(initialState, actionTypes);
      const payload = { id: 6, name: 'Bob Cutlass' };
      const action = { type: actionTypes.ADD_ENTITY, payload };
      const reducedState = reducerFunction(initialState, action);
      expect(reducedState.entities).toMatchObject({
        ...initialState.entities, ...{ [payload.id]: payload },
      });
      expect(reducedState.entities[payload.id]).toMatchObject(payload);
      expect(Object.keys(reducedState.entities).length).toBe(6);
    });

    it('should reduce state using a custom action', () => {
      const actionTypes = { CUSTOM_ACTION: '[Collection] Custom Action' };
      const handlers = {
        [actionTypes.CUSTOM_ACTION]: (state, { payload }) => ({
          ...state, custom: payload,
        }),
      };
      const reducerFunction = reducer.createReducer(initialState, actionTypes, handlers);
      const payload = { id: 6, name: 'Bob Cutlass' };
      const action = { type: actionTypes.CUSTOM_ACTION, payload };
      const reducedState = reducerFunction(initialState, action);
      expect(reducedState.custom).toMatchObject(payload);
      expect(reducedState.entities).toMatchObject(initialState.entities);
    });

    it('should reduce state using createActions helper', () => {
      const { types, creators } = createActions('collection', [
        'addEntity',
        'addEntities',
        'removeEntity',
        'addMeta',
      ]);
      const state = createCollectionState();
      const reducerFunction = reducer.createReducer(state, types, creators);
      const creatorKeys = Object.keys(creators);
      creatorKeys.forEach((creator) => {
        const type = types[camelToMacroCase(creator)];
        const payload = { id: 6, name: 'Bob Cutlass' };
        const action = { type, payload };
        const reducedState = reducerFunction(state, action);
        const expectedState = reducer[creator](state, payload);
        expect(reducedState).toMatchObject(expectedState);
      });
    });

    it('should reduce state using mixed actions via createActions', () => {
      const { types } = createActions('collection', ['removeEntities', 'removeSelectedEntity', 'select', 'reset', 'custom']);
      const reducerFunction = reducer.createReducer(initialState, types, {
        [types.CUSTOM]: (state, { payload }) => ({ ...state, custom: payload }),
      });
      // Remove entities
      expect(reducerFunction(undefined, {
        type: types.REMOVE_ENTITIES,
        payload: [1, 2, 3, 4, 5],
      })).toMatchObject(Object.assign({}, initialState, { entities: {} }));
      // Remove selected entity
      expect(reducerFunction(initialState, {
        type: types.REMOVE_SELECTED_ENTITY,
        payload: '1',
      })).toMatchObject(Object.assign({}, initialState, { selectedEntityId: null }));
      // Select
      expect(reducerFunction(initialState, {
        type: types.SELECT,
        payload: '1',
      })).toMatchObject(Object.assign({}, initialState, { selectedEntityId: '1' }));
      // Reset
      expect(reducerFunction(Object.assign({}, initialState, { selectedEntityId: '1' }), {
        type: types.RESET,
        payload: initialState,
      })).toMatchObject(initialState);
      // Custom
      expect(reducerFunction(initialState, {
        type: types.CUSTOM,
        payload: 'test',
      })).toMatchObject({
        ...initialState,
        custom: 'test',
      });
      // Custom unknown type
      expect(reducerFunction(initialState, {
        type: '[Custom] Unknown Type',
        payload: 'test',
      })).toMatchObject(initialState);
    });

    it('should prioritise custom actions before default actions', () => {
      const { types } = createActions('collection', ['select']);
      const reducerFunction = reducer.createReducer(initialState, {
        type: types.SELECT,
        payload: 'test',
      }, {
        [types.SELECT]: state => ({
          ...state, selectedEntityId: 'override',
        }),
      });
      expect(reducerFunction(initialState, { type: types.SELECT, payload: 'something' })).toMatchObject({
        ...initialState,
        selectedEntityId: 'override',
      });
    });
  });
});
