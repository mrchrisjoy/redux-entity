export const createInitialMetaData = params => {
  return {
    currentPage: 0,
    nextPage: 0,
    prevPage: null,
    totalPages: 0,
    totalCount: 0,
    ...params
  };
};

export const createInitialNestedCollectionState = params => {
  return {
    entities: {},
    meta: {},
    selectedParentEntityId: null,
    selectedEntityId: null,
    ...params
  };
};

export const createInitialCollectionState = params => {
  return {
    entities: {},
    meta: createInitialMetaData(),
    selectedEntityId: null,
    ...params
  };
};