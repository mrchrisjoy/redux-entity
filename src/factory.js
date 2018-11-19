import reducer from './reducer';

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

export const createCollectionState = (state, options={}) => ({
  entities: {},
  meta: createMetaData(options.useCursor),
  selectedEntityId: null,
  ...state
});

export const createReducer = (initialState = createCollectionState(), actionTypes, handlers = {}) =>
  (state = initialState, {type, payload}) => {
    switch (type) {
      case actionTypes.ADD_ENTITY:
        return reducer.addEntity(state, payload);
      case actionTypes.ADD_ENTITIES:
        return reducer.addEntities(state, payload);
      case actionTypes.REMOVE_ENTITY:
        return reducer.removeEntity(state, payload);
      case actionTypes.REMOVE_ENTITIES:
        return reducer.removeEntities(state, payload);
      case actionTypes.ADD_META:
        return reducer.addMeta(state, payload);
      case actionTypes.SELECT:
        return reducer.select(state, payload);
      case actionTypes.RESET:
        return reducer.reset(state, initialState);
      default: {
        if (handlers.hasOwnProperty(type)) {
          return handlers[type](state, {type, payload});
        } else {
          return state
        }
      }
    }
  };
