# redux-relations
Redux helpers for creating relational stores.

## Installation 
```sh
npm install redux-relations --save
yarn add redux-relations
```

## Usage

```typescript
import { connect } from 'react-redux'
import { mapRelationalStateToProps } from 'redux-relations'

connect(mapRelationalStateToProps(['testStore']))(Component)
```
