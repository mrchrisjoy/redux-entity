import { filterMacroCaseKeys } from './utils';

/**
 * @module Reducers
 * @example
 * import * as reduxEntity from '@foundcareers/redux-entity';
 * import * as action from '../actions/todo.js';
 *
 * const initialState = reduxEntity.createCollectionState();
 *
 * export const reducer = (state = initialState, {type, payload}) => {
 *  switch (type) {
 *    case action.ADD_ENTITY:
 *      return reduxEntity.addEntity(state, payload);
 *    case action.ADD_ENTITIES:
 *      return reduxEntity.addEntities(state, payload);
 *    case action.REMOVE_ENTITY:
 *      return reduxEntity.removeEntity(state, payload);
 *    case action.REMOVE_ENTITIES:
 *      return reduxEntity.removeEntities(state, payload);
 *    case action.REMOVE_SELECTED_ENTITY:
 *      return reduxEntity.removeSelectedEntity(state, payload);
 *    case action.ADD_META:
 *      return reduxEntity.addMeta(state, payload);
 *    case action.SELECT:
 *      return reduxEntity.select(state, payload);
 *    case action.RESET:
 *      return reduxEntity.reset(state, payload);
 *    default:
 *      return state;
 *  }
 * };
 */

/**
 * Add an entity to the collection state.
 * @memberof Reducers
 * @param {Object} state Collection state.
 * @param {Object} payload The entity object you'd like to add. Must contain an `id` attribute
 */
export const addEntity = (state, payload) => ({
  ...state, entities: { ...state.entities, [payload.id]: payload },
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
 * @param {Object} selectedEntityId Entity Id that's being selected.
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
 * Helper function used to create a reducer function.
 * @memberof Reducers
 * @param {Object} initialState Collection state.
 * @param {Object} actionTypes Object containing the reducer's default action types.
 * @param {Object} handlers Object containing custom reducer actions.
 * @example
 * // job.actions.js
 * export const jobActionTypes = {
 *  ADD_ENTITY: '[Job] Add Entity',
 *  REMOVE_ENTITY: '[Job] Remove Entity',
 *  CUSTOM: '[Job] Custom'
 *  ...
 * }
 *
 * // Creating a reducer for a collection of entities (default case)
 * // job.reducer.js
 * export const reducer = reduxEntity.createReducer(
 *  reduxEntity.createCollectionState(),
 *  jobActionTypes
 * );
 *
 * // Creating a reducer for a collection of entities (customized case)
 * // job.reducer.js
 * const initialState = reduxEntity.createCollectionState({
 *  entityIds: [ ]
 * });
 * const customHandlers = {
 *  [jobActionTypes.ADD_ENTITY_ID]: (state, action) => ({
 *    ...state, entityIds: [...state.entityIds, action.payload]
 *  }),
 *  [jobActionTypes.REMOVE_ENTITY_ID]: (state, action) => ({
 *    ...state, entityIds: state.entityIds.filter(e => e !== action.payload)
 *  })
 * };
 * export const reducer = reduxEntity.createReducer(
 *  initialState,
 *  jobActionTypes,
 *  customHandlers
 * );
 */
export const createReducer = (
  initialState,
  actionTypes,
  handlers = {},
) => (state = initialState, action) => {
  const { type, payload } = action;
  const filteredActionTypes = filterMacroCaseKeys(actionTypes);
  switch (type) {
    case filteredActionTypes.ADD_ENTITY:
      return addEntity(state, payload);
    case filteredActionTypes.ADD_ENTITIES:
      return addEntities(state, payload);
    case filteredActionTypes.REMOVE_ENTITY:
      return removeEntity(state, payload);
    case filteredActionTypes.REMOVE_ENTITIES:
      return removeEntities(state, payload);
    case filteredActionTypes.REMOVE_SELECTED_ENTITY:
      return removeSelectedEntity(state, payload);
    case filteredActionTypes.ADD_META:
      return addMeta(state, payload);
    case filteredActionTypes.SELECT:
      return select(state, payload);
    case filteredActionTypes.RESET:
      return reset(state, initialState);
    default:
      return Object.prototype.hasOwnProperty.call(handlers, type)
        ? handlers[type](state, action) : state;
  }
};
