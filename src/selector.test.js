/* global describe, it, expect */
import { createCollectionState } from './factory';
import * as selector from './selector';

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

describe('selector.js', () => {
  describe('getEntities', () => {
    it('should select entities', () => {
      const state = Object.assign({}, initialState);
      const { entities } = state;
      const selected = selector.getEntities(state);
      expect(selected).toMatchObject(entities);
    });
  });

  describe('getEntitiesArray', () => {
    it('should retrieve entities array', () => {
      const state = Object.assign({}, initialState);
      const { entities } = state;
      const entityArray = Object.values(entities);
      const selected = selector.getEntitiesArray(state);
      expect(selected).toEqual(expect.arrayContaining(entityArray));
    });

    it('should retrieve entities sorted array', () => {
      const state = Object.assign({}, initialState);
      const { entities } = state;
      const compareFunc = (a, b) => a.id > b.id;
      const entityArray = Object.values(entities).sort(compareFunc);
      const selected = selector.getEntitiesArray(state, compareFunc);
      expect(selected).toEqual(expect.arrayContaining(entityArray));
    });
  });

  describe('getSelectedEntityId', () => {
    it('should select entity id', () => {
      const state = Object.assign({}, initialState);
      const { selectedEntityId } = state;
      const selected = selector.getSelectedEntityId(state);
      expect(selected).toEqual(selectedEntityId);
    });
  });

  describe('getMeta', () => {
    it('should select meta', () => {
      const state = Object.assign({}, initialState);
      const { meta } = state;
      const selected = selector.getMeta(state);
      expect(selected).toMatchObject(meta);
    });
  });

  describe('getNextPage', () => {
    it('should select next page', () => {
      const state = Object.assign({}, initialState);
      const { meta: { nextPage } } = state;
      const selected = selector.getNextPage(state);
      expect(selected).toEqual(nextPage);
    });
  });

  describe('getPrevPage', () => {
    it('should select previous page', () => {
      const state = Object.assign({}, initialState);
      const { meta: { prevPage } } = state;
      const selected = selector.getPrevPage(state);
      expect(selected).toEqual(prevPage);
    });
  });
});
