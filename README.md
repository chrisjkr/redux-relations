# redux-relations
Redux helpers for creating relational stores.

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

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
