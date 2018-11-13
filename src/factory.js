const createCursorMeta = () => ({
  endCursor: null,
  hasNextPage: null,
  startCursor: null
});

const createDefaultMeta = () => ({
  currentPage: 0,
  nextPage: 0,
  prevPage: null,
  totalPages: 0,
  totalCount: 0,
});

const createMetaData = useCursor => 
  useCursor ? createCursorMeta() : createDefaultMeta();

export const createCollectionState = (initialState, options={}) => ({
  entities: {},
  meta: createMetaData(options.useCursor),
  selectedEntityId: null,
  ...initialState
});