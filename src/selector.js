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
 */
export const getEntitiesArray = (state, compareFunction) =>
  Object.values(state.entities).sort(compareFunction);

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
 * Get next page from a collection state.
 * @memberof Selectors
 * @param {Object} state Collection state.
 */
export const getNextPage = state => state.meta.nextPage;

/**
 * Get previous page from a collection state.
 * @memberof Selectors
 * @param {Object} state Collection state.
 */
export const getPrevPage = state => state.meta.prevPage;
