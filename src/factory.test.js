import * as factory from './factory';

describe('Testing factory', () => {
  describe('createInitialMetaData', () => {
    it('should create initial paginated meta object', () => {
      const initialMetaData = factory.createInitialMetaData();
      expect(Object.keys(initialMetaData).length).toEqual(5);
      expect(initialMetaData.currentPage).toEqual(0);
      expect(initialMetaData.nextPage).toEqual(0);
      expect(initialMetaData.prevPage).toBeNull();
      expect(initialMetaData.totalPages).toEqual(0);
      expect(initialMetaData.totalCount).toEqual(0);
    });

    it('should create initial cursor meta object', () => {
      const initialMetaData = factory.createInitialMetaData({}, true);
      expect(Object.keys(initialMetaData).length).toEqual(3);
      expect(initialMetaData.currentPage).toBeUndefined();
      expect(initialMetaData.nextPage).toBeUndefined();
      expect(initialMetaData.prevPage).toBeUndefined();
      expect(initialMetaData.totalPages).toBeUndefined();
      expect(initialMetaData.totalCount).toBeUndefined();
      expect(initialMetaData.endCursor).toBeNull();
      expect(initialMetaData.hasNextPage).toBeNull();
      expect(initialMetaData.startCursor).toBeNull();
    });
  });

  describe('createInitialCollectionState', () => {
    it('should create initial collection state, with standard pagination', () => {
      const initialCollectionState = factory.createInitialCollectionState();
      const initialMetaData = factory.createInitialMetaData();
      expect(Object.keys(initialCollectionState).length).toEqual(3);
      expect(initialCollectionState.meta).toMatchObject(initialMetaData);
      expect(initialCollectionState.selectedEntityId).toBeNull();
    });
    
    it('should create initial collection state, with cursor pagination', () => {
      const initialCollectionState = factory.createInitialCollectionState({}, true);
      const initialMetaData = factory.createInitialMetaData({}, true);
      expect(Object.keys(initialCollectionState).length).toEqual(3);
      expect(initialCollectionState.meta).toMatchObject(initialMetaData);
      expect(initialCollectionState.selectedEntityId).toBeNull();
    });
  });
});