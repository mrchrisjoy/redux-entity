# @foundcareers/redux-entity
[![build status](https://img.shields.io/npm/v/@foundcareers/redux-entity.svg)](https://www.npmjs.com/package/@foundcareers/redux-entity) [![build status](https://img.shields.io/travis/com/foundcareers/redux-entity.svg)](https://travis-ci.com/foundcareers/redux-entity) [![npm downloads](https://img.shields.io/npm/dt/@foundcareers/redux-entity.svg)](https://www.npmjs.com/package/@foundcareers/redux-entity) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

`redux-entity` is a tiny javascript library which aims to normalise the way you manage entities in a redux store. It mainly comprises of helper functions that'll help reduce a lot of redundant `action` and `reducer` code.

## Installation

```sh
npm install @foundcareers/redux-entity
```

## Example Usage
```js
// todo.action.js
import { createActions } from '@foundcareers/redux-entity';

const { types, creators } = createActions('todo');
export default { actionTypes: types, actionCreators: creators };
```

```js
// todo.reducer.js
import { actionTypes } from 'todo.action.js';
import { createCollectionState, createReducer } from '@foundcareers/redux-entity';

export const reducer = createReducer(
  createCollectionState(null, { useCursor: true }),
  actionTypes
);
```


## Example State

```js
{
  todos: {
    entities: {
      'be9af423msd': {
        id: 'be9af423msd',
        value: 'Write todo'
      },
      'fdsi33g24dsd': {
        id: 'fdsi33g24dsd',
        value: 'Boil potatoes'
      },      
    },
    selectedEntityId: 'be9af423msd',
  },
}
```
