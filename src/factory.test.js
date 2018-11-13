import * as factory from './factory';

describe('Testing factory', () => {
  describe('createCollectionState', () => {
    it('should create initial collection state, with standard pagination', () => {
      const initialCollectionState = factory.createCollectionState();
      const initialMetaData = {
        currentPage: 0,
        nextPage: 0,
        prevPage: null,
        totalPages: 0,
        totalCount: 0,
      };
      expect(Object.keys(initialCollectionState).length).toEqual(3);
      expect(initialCollectionState.meta).toMatchObject(initialMetaData);
      expect(initialCollectionState.selectedEntityId).toBeNull();
    });
    
    it('should create initial collection state, with cursor pagination', () => {
      const initialCollectionState = factory.createCollectionState({}, {useCursor: true});
      const initialMetaData = {
        endCursor: null,
        hasNextPage: null,
        startCursor: null
      };
      expect(Object.keys(initialCollectionState).length).toEqual(3);
      expect(initialCollectionState.meta).toMatchObject(initialMetaData);
      expect(initialCollectionState.selectedEntityId).toBeNull();
    });
  });
});