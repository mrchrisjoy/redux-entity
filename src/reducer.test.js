import * as reducer from './reducer';
import {createInitialCollectionState} from './factory';

const initialState = createInitialCollectionState({
  entities: {
    '1': {id: '1'},
    '2': {id: '2'},
    '3': {id: '3'},
    '4': {id: '4'},
    '5': {id: '5'},
  },
  selectedEntityId: '1',
});

describe('Testing reducer', () => {
  describe('addEntity', () => {
    it('should add new entity', () => {
      const payload = {id: '6'};
      const prevState = Object.assign({}, initialState)
      const finalState = reducer.addEntity(prevState, payload);
      expect(Object.keys(prevState.entities).length).toEqual(5);
      expect(prevState.entities['6']).not.toBeDefined();
      expect(Object.keys(finalState.entities).length).toEqual(6);
      expect(finalState.entities['1'].id).toBe('1');
      expect(finalState.entities['6'].id).toBe('6');
    });

    it('should update existing entity', () => {
      const payload = {id: '3', data: 'some thing'};
      const prevState = Object.assign({}, initialState)
      const finalState = reducer.addEntity(prevState, payload);
      expect(Object.keys(prevState.entities).length).toEqual(5);
      expect(Object.keys(finalState.entities).length).toEqual(5);
      expect(finalState.entities['3'].data).toBeDefined();
    });

    it('should add new entities to empty initial state', () => {
      const payload = {id: '6'};
      const prevState = createInitialCollectionState();
      const finalState = reducer.addEntity(prevState, payload);
      expect(Object.keys(prevState.entities).length).toEqual(0);
      expect(Object.keys(finalState.entities).length).toEqual(1);
    });
  });

  describe('addEntities', () => {
    it('should add new set of entities', () => {
      const payload = {'6': {id: '6'}, '7': {id: '7'}};
      const prevState = Object.assign({}, initialState)
      const finalState = reducer.addEntities(prevState, payload);
      expect(Object.keys(prevState.entities).length).toEqual(5);
      expect(Object.keys(finalState.entities).length).toEqual(7);
      expect(finalState.entities['6'].id).toEqual('6');
      expect(finalState.entities['7'].id).toEqual('7');
    });

    it('should update existing entities', () => {
      const payload = {
        '1': {id: '1', data: 'hello'},
        '5': {id: '5', data: 'bye'},
      };
      const prevState = Object.assign({}, initialState)
      const finalState = reducer.addEntities(prevState, payload);
      expect(Object.keys(prevState.entities).length).toEqual(5);
      expect(Object.keys(finalState.entities).length).toEqual(5);
      expect(finalState.entities['1'].data).toBeDefined();
      expect(finalState.entities['5'].data).toBeDefined();
    });

    it('should add new entities to empty initial state', () => {
      const payload = {'1': {id: '1'}, '2': {id: '2'}, '3': {id: '3'}};
      const prevState = createInitialCollectionState();
      const finalState = reducer.addEntities(prevState, payload);
      expect(Object.keys(prevState.entities).length).toEqual(0);
      expect(Object.keys(finalState.entities).length).toEqual(3);
    });
  });

  describe('removeEntity', () => {
    it('should remove an entity', () => {
      const payload = '1';
      const prevState = Object.assign({}, initialState)
      const finalState = reducer.removeEntity(prevState, payload);
      expect(Object.keys(prevState.entities).length).toEqual(5);
      expect(Object.keys(finalState.entities).length).toEqual(4);
      expect(finalState.entities['1']).toBeUndefined();      
    });

    it('shouldn\'t remove an entity', () => {
      const payload = '7';
      const prevState = Object.assign({}, initialState)
      const finalState = reducer.removeEntity(prevState, payload);
      expect(Object.keys(prevState.entities).length).toEqual(5);
      expect(Object.keys(finalState.entities).length).toEqual(5);
    });
  });

  describe('removeEntities', () => {
    it('should remove entities', () => {
      const payload = ['1', '2', '3'];
      const prevState = Object.assign({}, initialState)
      const finalState = reducer.removeEntities(prevState, payload);
      expect(Object.keys(prevState.entities).length).toBe(5);
      expect(Object.keys(finalState.entities).length).toBe(2);
      expect(finalState.entities['1']).toBeUndefined();
      expect(finalState.entities['2']).toBeUndefined();
      expect(finalState.entities['3']).toBeUndefined();
    });

    it('shouldn\'t remove entities', () => {
      const payload = ['6', '7', '8'];
      const prevState = Object.assign({}, initialState)
      const finalState = reducer.removeEntities(prevState, payload);
      expect(Object.keys(prevState.entities).length).toBe(5);
      expect(Object.keys(finalState.entities).length).toBe(5);
    });
  });

  describe('removeSelectedEntity', () => {
    it('should remove selected entity', () => {
      const prevState = Object.assign({}, initialState)
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
      const prevState = Object.assign({}, initialState)
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
      const emptyInitialState = createInitialCollectionState();
      const finalState = reducer.reset(prevState, emptyInitialState);
      expect(prevState.selectedEntityId).toEqual('1');
      expect(Object.keys(prevState.entities).length).toEqual(5);
      expect(finalState.selectedEntityId).toBeNull();
      expect(Object.keys(finalState.entities).length).toEqual(0);
    });
  });
});
