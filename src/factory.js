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
 * Creates an initial collection state object with standard or cursor meta.
 * @memberof Factories
 * @param {Object} state Object that's spread into the collection state.
 * @param {Object} options Configuration object.
 * @param {boolean} options.useCursor Set to `true` to use cursor meta.
 * @example
 * import {createCollectionState} from '@foundcareers/redux-entity';
 * const stateWithStandardPagination = createCollectionState({
 *  previouslySelectedEntityId: null,
 * }, false);
 * 
 * const options = {
 *  useCursor: tru
 * };
 * 
 * const stateWithMetaPagination = createCollectionState({}, options);
 * 
 * // Returns the following collection state objects
 * 
 * // console.log(stateWithStandardPagination)
 * {
 *  entities: {},
 *  meta: {
 *    currentPage: 0,
 *    nextPage: 0,
 *    prevPage: null,
 *    totalPages: 0,
 *    totalCount: 0
 *  },
 *  selectedEntityId: null
 * }
 * 
 * // console.log(stateWithCursorPagination)
 * {
 *  entities: {},
 *  meta: {
 *    endCursor: null,
 *    hasNextPage: null,
 *    startCursor: null
 *  },
 *  selectedEntityId: null,  
 * }
 */
export const createCollectionState = (state, options={}) => ({
  entities: {},
  meta: createMetaData(options.useCursor),
  selectedEntityId: null,
  ...state
});
