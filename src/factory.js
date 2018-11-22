/** @module Factories */

const createCursorMeta = () => ({
  endCursor: null,
  hasNextPage: null,
  startCursor: null
});

const createDefaultMeta = () => ({
  currentPage: 0,
  nextPage: 0,
  prevPage: null,
  totalPages: 0,
  totalCount: 0,
});

const createMetaData = useCursor => 
  useCursor ? createCursorMeta() : createDefaultMeta();

/**
 * Collection state Creator
 * @memberof Factories
 * @param {Object} state Object that's spread into the collection state.
 * @param {Object} options Configuration object.
 * @param {boolean} options.useCursor Set to `true` to use cursor meta.
 */
export const createCollectionState = (state, options={}) => ({
  entities: {},
  meta: createMetaData(options.useCursor),
  selectedEntityId: null,
  ...state
});
