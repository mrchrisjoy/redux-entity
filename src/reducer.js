export const addEntity = (state, payload) => {
  const {id} = payload;
  const entities = Object.assign({}, state.entities, {[id]: payload});
  return {...state, entities};
};

export const addEntities = (state, payload) => {
  const entities = Object.assign({}, state.entities, payload);
  return {...state, entities};
};

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

export const removeSelectedEntity = (state) => {
  return {...state, selectedEntityId: null};
};

export const addMeta = (state, payload) => {
  return {...state, meta: {...payload}};
};

export const select = (state, payload) => {
  return {...state, selectedEntityId: payload};
};

export const reset = (state, initialState) => {
  return {...state, ...initialState};
};