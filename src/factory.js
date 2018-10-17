const initialCursorMeta = {
  endCursor: null,
  hasNextPage: null,
  startCursor: null
};

const initialPaginationMeta = {
  currentPage: 0,
  nextPage: 0,
  prevPage: null,
  totalPages: 0,
  totalCount: 0,
}

export const createInitialMetaData = (params, useCursor=false) => {
  const meta = useCursor ? initialCursorMeta : initialPaginationMeta;
  return {
   ...meta,
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