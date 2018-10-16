import * as factory from './factory';

describe('Testing factory', () => {
  describe('createInitialMetaData', () => {
    it('should create initial meta object', () => {
      const initialMetaData = factory.createInitialMetaData();
      expect(Object.keys(initialMetaData).length).toEqual(5);
      expect(initialMetaData.currentPage).toEqual(0);
      expect(initialMetaData.nextPage).toEqual(0);
      expect(initialMetaData.prevPage).toBeNull();
      expect(initialMetaData.totalPages).toEqual(0);
      expect(initialMetaData.totalCount).toEqual(0);
    });
  });

  describe('createInitialNestedCollectionState', () => {
    it('should create initial nested collection state', () => {
      const initialNestedCollectionState = factory.createInitialNestedCollectionState();
      expect(Object.keys(initialNestedCollectionState).length).toEqual(4);
      expect(typeof initialNestedCollectionState.entities).toBe('object');
      expect(typeof initialNestedCollectionState.meta).toBe('object');
      expect(initialNestedCollectionState.selectedParentEntityId).toBeNull();
      expect(initialNestedCollectionState.selectedEntityId).toBeNull();
    });
  });

  describe('createInitialCollectionState', () => {
    it('should create initial collection state', () => {
      const initialCollectionState = factory.createInitialCollectionState();
      const initialMetaData = factory.createInitialMetaData();
      expect(Object.keys(initialCollectionState).length).toEqual(3);
      expect(initialCollectionState.meta).toMatchObject(initialMetaData);
      expect(initialCollectionState.selectedEntityId).toBeNull();
    });
  });
});