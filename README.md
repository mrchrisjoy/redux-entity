# @foundcareers/redux-entity
This library is contains a collection of helper methods to help manage entities in a redux store. 
## Installation 
Install using npm: 
```npm i -s @foundcareers/redux-entity``` \
Install using yarn: 
```yarn add @foundcareers/redux-entity```
## Design Considerations
- Please ensure all entities have unique Ids.

Here's an example store that `@foundcareers/redux-entity` can work with:
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
    selectedParentEntityId: null,
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
    selectedParentEntityId: null,
    selectedEntityId: 'ke9a-a245gf2033a22',
  },
}
```

## Factory Helpers
### createInitialMetaData
Takes in an object (optional) containing additional meta data, allowing you to expand the default meta object.

Returns the default initial meta state, containing page details etc.

Example Usage:
```
import {createInitialMetaData} from '@foundcareers/redux-entity';

const meta = createInitialMetaData({author: 'Bob Cutlass'});
```
Resulting in the following meta object:
```
{
  currentPage: 0,
  nextPage: 0,
  prevPage: null,
  totalPages: 0,
  totalCount: 0,
  author: 'Bob Cutlass'
 }
```

### createInitialNestedCollectionState
Takes in an object used to extend the initial nested collection object.  

Returns a nested entity state object.

Example Usage:
```
import {createInitialNestedCollectionState} from '@foundcareers/redux-entity';

const nestedState = {
  todo: createInitialNestedCollectionState(),
  users: createInitialNestedCollectionState()  
};
```


### createInitialCollectionState
Takes in a state object (optional), allowing you to expand the initial state.

Returns an entity state object.

Example Usage:
```
import {createInitialCollectionState} from '@foundcareers/redux-entity';

const state = createInitialCollectionState({
  previouslySelectedEntityId: null,
});
```
Resulting in the following collection object:
```
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
```

## Reducer Helpers

Example usage: `reducers/todo.js`
```
import * as reduxEntity from '@foundcareers/redux-entity';
import * as action from '../actions/todo.js';

const initialState = reduxEntity.createInitialCollectionState();

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
Take in a collection object.

Returns a new collection object with `selectedEntityId` set to `null`.
### addMeta
Takes in a collection object and a meta object.

Returns a new collection object containing the meta object.
### addNestedMeta
Takes in a collection object, `parentId` and a meta object as the payload.

Returns a new collection object with a nested meta object.
### select
Takes in a collection object and a entity id as the payload.

Return a new collection object with the specified entity id selected (ie. set `selectedEntityId` with the payload).
### reset
Takes in an existing collection object and an initial collection object.

Returns a new collection object with the existing state replaced with the initial collection object.
## Selector Helpers
The following entity selector functions return particular 
### getEntities
Takes in a collection object and returns the entities object (ie. `state.entities`).
### getEntitiesArray
Takes in a collection object, and a comparison function (optional) used to sort the entities.

Returns a sorted array of entity objects. If no comparison function is specified it returns an unsorted array of entitiy objects.

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
  selectedParentEntityId: null,
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
Takes in a collection object and returns the selected entity (ie. return `state.selectedEntityId`).
### getMeta
Takes in a collection object and returns the meta.
### getNextPage
Takes in a collection object and returns the next page located in the meta.
### getPrevPage
Takes in a collection object and returns the previous page located in the meta.
