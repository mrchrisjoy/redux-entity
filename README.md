# @foundcareers/redux-entity
This library contains a bunch of helpers to manage entity collections in a redux store. 
## Installation 
Install via npm: 
```npm i -s @foundcareers/redux-entity``` \
Install via yarn: 
```yarn add @foundcareers/redux-entity```
## Design Considerations
- Please ensure all entities have unique Ids.

Here's an example store that `@foundcareers/redux-entity` can work with, with the following collections: `todos` and `users`.
```
{
  todos: {
    entities: {
      'be9a-a25d21033a20': {
        id: 'be9a-a25d21033a20',
        value: 'Wash clothes'
      },
      'be9a-423mfas5345sd': {
        id: 'be9a-423mfas5345sd',
        value: 'Write todo'
      },
      'be9a-a245gf2033a20': {
        id: 'be9a-a245gf2033a20',
        value: 'Grill salmon'
      },      
    },
    meta: {
      currentPage: 2,
      nextPage: 3,
      prevPage: 1,
      totalPages: 4,
      totalCount: 12,
    },
    selectedEntityId: 'be9a-a245gf2033a20',
  },
  users: {
    entities: {
      'be9a-a245gf2033a21': {
        id: 'be9a-a245gf2033a21',
        name: 'Bob cutlass'
      },
      'ke9a-a245gf2033a22': {
        id: 'ke9a-a245gf2033a22',
        name: 'Peter Noopter'
      },
    },
    meta: {
      currentPage: 2,
      nextPage: 1,
      prevPage: 1,
      totalPages: 2,
      totalCount: 3,
    },
    selectedEntityId: 'ke9a-a245gf2033a22',
  },
}
```

## Factory Helpers
### createCollectionState(initialState, options)
`initialState` is an object, allowing you to expand the default initial state.
`options` is an object, with the following attributes: `userCursor` (boolean) and `metaState` (object).

Returns an entity state object.

Example Usage:
```
import {createCollectionState} from '@foundcareers/redux-entity';

const stateWithStandardPagination = createCollectionState({
  previouslySelectedEntityId: null,
}, false);

const options = {
  useCursor: true
};
const stateWithMetaPagination = createCollectionState({}, options);
```
Resulting in the following initial collection objects:
```
// stateWithStandardPagination
{
  entities: {},
  meta: {
    currentPage: 0,
    nextPage: 0,
    prevPage: null,
    totalPages: 0,
    totalCount: 0
  },
  selectedEntityId: null,  
}

// stateWithMetaPagination
{
  entities: {},
  meta: {
    endCursor: null,
    hasNextPage: null,
    startCursor: null,
  },
  selectedEntityId: null,  
}
```

## Reducer Helpers

Example usage: `reducers/todo.js`
```
import * as reduxEntity from '@foundcareers/redux-entity';
import * as action from '../actions/todo.js';

const initialState = reduxEntity.createCollectionState();

export const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case action.ADD_ENTITY:
      return reduxEntity.addEntity(state, payload);
    case action.ADD_ENTITIES:
      return reduxEntity.addEntities(state, payload);
    case action.REMOVE_ENTITY:
      return reduxEntity.removeEntity(state, payload);
    case action.REMOVE_ENTITIES:
      return reduxEntity.removeEntities(state, payload);
    case action.REMOVE_SELECTED_ENTITY:
      return reduxEntity.removeSelectedEntity(state, payload);
    case action.ADD_META:
      return reduxEntity.addMeta(state, payload);
    case action.SELECT:
      return reduxEntity.select(state, payload);
    case action.RESET:
      return reduxEntity.reset(state, payload);
    default:
      return state;
  }
};
```
### addEntity
Takes in a collection object and entity object as the payload.

Returns a new collection object with the entity you've specified to add to the entities collection.
### addEntities
Takes in a collection object and entities object (ie. an object containing multiple entities) as the payload.

Returns a new collection object containing the entities you've passed into the function.
### removeEntity
Takes in a collection object and the entity object you'd like to remove as the payload.

Returns a new collection object without the entity you've specified to remove.
### removeEntities
Takes in a collection object and an array of entity ids as the payload.

Returns a new collection object without the entities you've specified to remove.
### removeSelectedEntity
Takes in a collection object.

Returns a new collection object with `selectedEntityId` set to `null`.
### addMeta
Takes in a collection object and a meta object.

Returns a new collection object containing the meta object.
### select
Takes in a collection object and a entity id as the payload.

Return a new collection object with the specified entity id selected (ie. set `selectedEntityId` with the payload).
### reset
Takes in an existing collection object and an initial collection object.

Returns a new collection object with the existing state replaced with the initial collection object.

## Selector Helpers

### getEntities
Takes in a collection object and returns the entities object (ie. `state.entities`).
### getEntitiesArray
Takes in a collection object, and a comparison function (optional), used when sorting the array.

Returns a sorted array of entities, otherwise if no comparison function is specified it returns an unsorted array of entities.

Example usage:
```
import {getEntitiesArray} from '@foundcareers/redux-entity';

const todoState = {
  entities: {
    'be9a-a25d21033a20': {
      id: 'be9a-a25d21033a20',
      value: 'Wash clothes'
    },
    'be9a-423mfas5345sd': {
      id: 'be9a-423mfas5345sd',
      value: 'Write todo'
    },
    'be9a-a245gf2033a20': {
      id: 'be9a-a245gf2033a20',
      value: 'Grill salmon'
    },      
  },
  meta: {
    currentPage: 2,
    nextPage: 3,
    prevPage: 1,
    totalPages: 4,
    totalCount: 12,
  },
  selectedEntityId: 'be9a-a245gf2033a20',
};

const compareFunction = (a, b) => a.value.localeCompare(b.value);

const entities = getEntitiesArray(todoState, compareFunction);
```
Resulting in the following `entities` array:
```
[
    {
      id: 'be9a-a245gf2033a20',
      value: 'Grill salmon'
    },
    {
      id: 'be9a-a25d21033a20',
      value: 'Wash clothes'
    },
    {
      id: 'be9a-423mfas5345sd',
      value: 'Write todo'
    }
]
```
### getSelectedEntityId
Takes in a collection object and returns the selected entity.
### getMeta
Takes in a collection object and returns its meta.
### getNextPage
Takes in a collection object and returns the next page based on the meta.
### getPrevPage
Takes in a collection object and returns the previous page based on the meta.
