/* eslint-disable import/prefer-default-export */
/** @module Factories */

/**
 * Creates a cursor meta object.
 * @private
 */
const createCursorMeta = () => ({
  endCursor: null,
  hasNext: null,
  startCursor: null,
});

/**
 * Create a default meta object.
 * @private
 */
const createDefaultMeta = () => ({
  currentPage: 0,
  nextPage: 0,
  prevPage: null,
  totalPages: 0,
  totalCount: 0,
});

/**
 * Creates a meta object.
 * @param {boolean} useCursor `true` to use cursor meta object, otherwise use default meta object.
 * @private
 */
const createMeta = useCursor => (useCursor ? createCursorMeta() : createDefaultMeta());

/**
 * Creates an initial collection state object with standard or cursor meta.
 * @memberof Factories
 * @param {Object} state Object that's spread into the collection state.
 * @param {Object} options Configuration object.
 * @param {boolean} options.useCursor Set to `true` to use cursor meta. `false` for default meta.
 * @example
 * import { createCollectionState } from '@foundcareers/redux-entity';
 *
 * // State with Cursor Pagination
 * const stateWithMetaPagination = createCollectionState({}, {
 *  useCursor: true
 * });
 *
 * // stateWithMetaPagination
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
export const createCollectionState = (state = {}, options = {}) => ({
  entities: {},
  meta: createMeta(options.useCursor),
  selectedEntityId: null,
  ...state,
});
