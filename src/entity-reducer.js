export function addEntity (state, payload) {
  const {id} = payload;
  const entities = Object.assign({}, state.entities, {[id]: payload});
  return {...state, entities};
}

export function addEntities (state, payload) {
  const entities = Object.assign({}, state.entities, payload);
  return {...state, entities};
}

export function removeEntity (state, id) {
  const entities = Object.assign({}, state.entities);
  delete entities[id];
  return {...state, entities};
}

export function removeEntities (state, ids) {
  const entities = Object.assign({}, state.entities);
  ids.forEach(id => delete entities[id])
  return {...state, entities};
}

export function removeSelectedEntity (state) {
  return {...state, selectedEntityId: null};
}

export function addMeta (state, payload) {
  return {...state, meta: {...payload}};
}

export function addNestedMeta (state, parentId, payload) {
  const meta = Object.assign({}, state.meta, {[parentId]: payload})
  return {...state, meta};
}

export function select (state, payload) {
  return {...state, selectedEntityId: payload};
}

export function reset (state, initialState) {
  return {...state, ...initialState};
}