export const addEntity = (state, payload) =>
  ({...state, entities: {...state.entities, [payload.id]: payload}});

export const addEntities = (state, payload) => 
  ({...state, entities: {...state.entities, ...payload}});

export const removeEntity = (state, id) => {
  const entities = Object.assign({}, state.entities);
  delete entities[id];
  return {...state, entities};
};

export const removeEntities = (state, ids) => {
  const entities = Object.assign({}, state.entities);
  ids.forEach(id => delete entities[id])
  return {...state, entities};
};

export const removeSelectedEntity = (state) =>
  ({...state, selectedEntityId: null});

export const addMeta = (state, payload) =>
  ({...state, meta: {...payload}});

export const select = (state, payload) =>
  ({...state, selectedEntityId: payload});

export const reset = (state, initialState) => 
  ({...state, ...initialState});

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
