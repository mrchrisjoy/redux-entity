/** @module Selectors */

/**
 * Get entities from a collection state.
 * @memberof Selectors
 * @param {Object} state Collection state.
 */
export const getEntities = state => state.entities;

/**
 * Get a sorted array of entities from a collection state.
 * @memberof Selectors
 * @param {Object} state Collection state.
 * @param {function} compareFunction Comparator used to compare two objects.
 * @example
 * import {getEntitiesArray} from '@foundcareers/redux-entity';
 *
 * const todoState = {
 *  entities: {
 *    'be9a-423mfas5345sd': {
 *      id: 'be9a-a25d21033a20',
 *      value: 'Write todo'
 *    },
 *    'be9a-a245gf2033a20': {
 *      id: 'be9a-a245gf2033a20',
 *      value: 'Grill salmon'
 *    }
 *  },
 *  meta: {
 *    currentPage: 2,
 *    nextPage: 3,
 *    prevPage: 1,
 *    totalPages: 4,
 *    totalCount: 12,
 *  },
 *  selectedEntityId: 'be9a-a245gf2033a20'
 * };
 *
 * const compareFunction = (a, b) => a.value.localeCompare(b.value);
 *
 * const entities = getEntitiesArray(todoState, compareFunction);
 *
 * // Resulting in the following entities array
 * [
 *  {
 *    id: 'be9a-a245gf2033a20',
 *    value: 'Grill salmon'
 *  },
 *  {
 *    id: 'be9a-423mfas5345sd',
 *    value: 'Write todo'
 *  }
 * ]
 */
export const getEntitiesArray = (state, compareFunction) => Object
  .values(state.entities)
  .sort(compareFunction);

/**
 * Get the selected entity id from a collection state.
 * @memberof Selectors
 * @param {Object} state Collection state.
 */
export const getSelectedEntityId = state => state.selectedEntityId;

/**
 * Get meta from a collection state.
 * @memberof Selectors
 * @param {Object} state Collection state.
 */
export const getMeta = state => state.meta;

/**
 * Get next page from a collection meta.
 * @memberof Selectors
 * @param {Object} state Collection state.
 */
export const getNextPage = state => state.meta.nextPage;

/**
 * Get previous page from a collection meta.
 * @memberof Selectors
 * @param {Object} state Collection state.
 */
export const getPrevPage = state => state.meta.prevPage;

/**
 * Get start cursor from a collection meta.
 * @memberof Selectors
 * @param {Object} state Collection state.
 */
export const getStartCursor = state => state.meta.startCursor;

/**
 * Get end cursor from a collection state.
 * @memberof Selectors
 * @param {Object} state Collection state.
 */
export const getEndCursor = state => state.meta.endCursor;

/**
 * Get hasNext within cursor meta from a collection state.
 * @memberof Selectors
 * @param {Object} state Collection state.
 */
export const hasNextCursor = state => state.meta.hasNext;
