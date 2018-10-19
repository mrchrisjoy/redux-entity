export const getEntities = state => state.entities;

export const getEntitiesArray = (state, compareFunction) =>
  Object.values(state.entities).sort(compareFunction);

export const getSelectedEntityId = state => state.selectedEntityId;

export const getMeta = state => state.meta;

export const getNextPage = state => state.meta.nextPage;

export const getPrevPage = state => state.meta.prevPage;
