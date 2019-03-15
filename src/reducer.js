/** @module Reducers */

/**
 * Add an entity to the collection state.
 * @memberof Reducers
 * @param {Object} state Collection state.
 * @param {Object} payload The entity object you'd like to add. Must contain an `id` attribute.
 */
export const addEntity = (state, payload) => ({
  ...state,
  entities: {
    ...state.entities,
    [payload.id]: { ...state.entities[payload.id], ...payload },
  },
});

/**
 * Adds entities to the collection state.
 * @memberof Reducers
 * @param {Object} state Collection state.
 * @param {Object} payload Object containing entities you'd like to add to the collection.
 */
export const addEntities = (state, payload) => ({
  ...state, entities: { ...state.entities, ...payload },
});

/**
 * Remove an entity from the collection state.
 * @memberof Reducers
 * @param {Object} state Collection state.
 * @param {string} id Id of entity you'd like to remove from the collection state.
 */
export const removeEntity = (state, id) => {
  const entities = Object.assign({}, state.entities);
  delete entities[id];
  return { ...state, entities };
};

/**
 * Removes entities from the collection state.
 * @memberof Reducers
 * @param {Object} state  Collection state.
 * @param {string[]} ids An array of entity ids.
 */
export const removeEntities = (state, ids) => {
  const entities = Object.assign({}, state.entities);
  ids.forEach(id => delete entities[id]);
  return { ...state, entities };
};

/**
 * Remove the selected entity.
 * @memberof Reducers
 * @param {Object} state Collection state.
 */
export const removeSelectedEntity = state => ({
  ...state, selectedEntityId: null,
});

/**
 * Add a meta object to the collection state.
 * @memberof Reducers
 * @param {Object} state Collection state.
 * @param {Object} payload The meta object.
 */
export const addMeta = (state, payload) => ({
  ...state, meta: { ...payload },
});

/**
 * Select an entity in the collection state.
 * @memberof Reducers
 * @param {Object} state Collection state.
 * @param {string} selectedEntityId Entity Id that's being selected.
 */
export const select = (state, selectedEntityId) => ({
  ...state, selectedEntityId,
});

/**
 * Reset the collection state.
 * @memberof Reducers
 * @param {Object} state Current Collection state.
 * @param {Object} initialState Initial Collection state (refer to `createCollectionState`).
 */
export const reset = (state, initialState) => ({
  ...state, ...initialState,
});

/**
 * Creates a object literal of action types and their corresponding reducer
 * functions. Returns the selected reducer function. This is used to replace
 * the switch statement in the createReducer function.
 * @memberof Reducers
 * @param {Object} actionTypes Object containing required action types.
 * @private
 */
const selectReducer = (actionTypes, selectedType) => ({
  [actionTypes.ADD_ENTITY]: addEntity,
  [actionTypes.ADD_ENTITIES]: addEntities,
  [actionTypes.REMOVE_ENTITY]: removeEntity,
  [actionTypes.REMOVE_ENTITIES]: removeEntities,
  [actionTypes.REMOVE_SELECTED_ENTITY]: removeSelectedEntity,
  [actionTypes.ADD_META]: addMeta,
  [actionTypes.SELECT]: select,
  [actionTypes.RESET]: reset,
})[selectedType];

/**
 * Creates an returns a custom reducer function.
 * @memberof Reducers
 * @param {Object} initialState Collection state.
 * @param {Object} actionTypes Object containing required action types.
 * @param {Object} handlers Object containing custom reducer action creators.
 * @example
 * // job.actions.js
 * export default {
 *  ADD_ENTITY: '[Job] Add Entity',
 *  REMOVE_ENTITY: '[Job] Remove Entity',
 *  CUSTOM: '[Job] Custom'
 *  ...
 * }
 *
 * // job.reducer.js
 * import { createReducer, createCollectionState } from '@foundcareers/redux-entity';
 * import jobActionTypes from './job.action';
 *
 * // Creating a reducer for a collection of entities (default case)
 * export const reducer = createReducer(
 *  createCollectionState(),
 *  jobActionTypes
 * );
 *
 * // Creating a reducer for a collection of entities (*customized case)
 * export const reducer = createReducer(
 *  createCollectionState(),
 *  jobActionTypes,
 *  {
 *    [jobActionTypes.CUSTOM]: (state, payload) => ({
 *      ...state, custom: payload
 *    })
 *  }
 * );
 */
export const createReducer = (
  initialState,
  actionTypes,
  handlers = {},
) => (state = initialState, action) => {
  const { type, payload } = action;
  const reducer = selectReducer(actionTypes, type);
  return (reducer && reducer(state, payload)) || (
    Object.prototype.hasOwnProperty.call(handlers, type)
      ? handlers[type](state, action) : state
  );
};
