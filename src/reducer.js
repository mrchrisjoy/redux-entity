/** @module Reducers */

/** 
 * Adds an entity to the collection state.
 * @memberof Reducers
 * @param {Object} state Collection state.
 * @param {Object} payload The entity object you'd like to add. Must contain an `id` attribute
 */
export const addEntity = (state, payload) =>
  ({...state, entities: {...state.entities, [payload.id]: payload}});

/**
 * Adds entities to the collection state.
 * @memberof Reducers
 * @param {Object} state Collection state.
 * @param {Object} payload The collection of entities you would 
 */
export const addEntities = (state, payload) => 
  ({...state, entities: {...state.entities, ...payload}});

/**
 * Removes an entity from the collection state.
 * @memberof Reducers
 * @param {Object} state Collection state.
 * @param {string} id Entity's id you'd like to remove from the collection state.
 */
export const removeEntity = (state, id) => {
  const entities = Object.assign({}, state.entities);
  delete entities[id];
  return {...state, entities};
};

/**
 * Removes entities from the collection state.
 * @memberof Reducers
 * @param {Object} state  Collection state.
 * @param {string[]} ids An array of entity ids.
 */
export const removeEntities = (state, ids) => {
  const entities = Object.assign({}, state.entities);
  ids.forEach(id => delete entities[id])
  return {...state, entities};
};

/**
 * Removes the selected entity.
 * @memberof Reducers
 * @param {Object} state Collection state.
 */
export const removeSelectedEntity = (state) =>
  ({...state, selectedEntityId: null});

/**
 * Adds meta to the collection state.
 * @memberof Reducers
 * @param {Object} state Collection state.
 * @param {Object} payload The meta object.
 */
export const addMeta = (state, payload) =>
  ({...state, meta: {...payload}});

/**
 * Selects an entity in the collection state.
 * @memberof Reducers
 * @param {Object} state Collection state.
 * @param {Object} payload Entity Id that's being selected.
 */
export const select = (state, payload) =>
  ({...state, selectedEntityId: payload});

/**
 * Resets the collection state.
 * @memberof Reducers
 * @param {Object} state Current Collection state.
 * @param {Object} initialState Initial Collection state (refer to `createCollectionState`).
 */
export const reset = (state, initialState) => 
  ({...state, ...initialState});

/**
 * Helper function used to create a reducer function.
 * @memberof Reducers
 * @param {Object} initialState Collection state.
 * @param {Object} actionTypes Object containing the reducer's default action types.
 * @param {Object} handlers Object containing custom reducer actions.
 */
export const createReducer = (
  initialState,
  actionTypes,
  handlers = {}
) => (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case actionTypes.ADD_ENTITY:
      return addEntity(state, payload);
    case actionTypes.ADD_ENTITIES:
      return addEntities(state, payload);
    case actionTypes.REMOVE_ENTITY:
      return removeEntity(state, payload);
    case actionTypes.REMOVE_ENTITIES:
      return removeEntities(state, payload);
    case actionTypes.REMOVE_SELECTED_ENTITY:
      return removeSelectedEntity(state, payload);
    case actionTypes.ADD_META:
      return addMeta(state, payload);
    case actionTypes.SELECT:
      return select(state, payload);
    case actionTypes.RESET:
      return reset(state, initialState);
    default: 
      return handlers.hasOwnProperty(type) ?
        handlers[type](state, action) : state
  }
};
