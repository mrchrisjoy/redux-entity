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

export const createInitialCollectionState = (params, useCursor=false) => {
  return {
    entities: {},
    meta: createInitialMetaData({}, useCursor),
    selectedEntityId: null,
    ...params
  };
};