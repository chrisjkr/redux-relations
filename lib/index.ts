export function mapRelationalStateToProps<IStore extends IAbstractStore>(storeNames: [keyof IStore]) {
  return (state: IStore) => {
    let relationalState: { [key: string]: any } = {}
    storeNames.forEach((storeName) => {
      const store: IRelationalStore<{ [key: string]: any }> = state[storeName]
      const items = store.items

      const foreignKeys = store.foreignKeys
      const foreignKeyNames = Object.keys(foreignKeys)

      let newItems: object[] = []
      for (let itemKey in items) {
        const item = items[itemKey]
        let newItem = { ...item }
        foreignKeyNames.forEach((foreignKeyName) => {
          const foreignKey = foreignKeys[foreignKeyName]
          const relatedStore = state[foreignKey.store]
          let relatedData
          const dataKey = foreignKey.keyName
            ? foreignKey.keyName
            : foreignKey.store
          if (foreignKey.kind === RelationTypes.One) {
            const id = item[foreignKeyName]
            relatedData = relatedStore.items[id]
          } else if (foreignKey.kind === RelationTypes.Many) {
            const ids: string[] = item[foreignKeyName]
            relatedData = ids.map((id) => relatedStore.items[id])
          }
          newItem[dataKey] = relatedData
          delete newItem[foreignKeyName]
        })
        newItems.push(newItem)
      }
      relationalState[storeName] = newItems
    })

    return relationalState
  }
}

export interface IAbstractStore {
  [key: string]: IRelationalStore<object>,
}

export interface IRelationalStore<ItemType> {
  items: IStoreItems<ItemType>,
  foreignKeys: IForeignKeys
}

export interface IStoreItems<ItemType> {
  [id: string]: ItemType,
}

export enum RelationTypes {
  One = 'one',
  Many = 'many',
}

export interface IForeignKey {
  store: string,
  kind: RelationTypes,
  keyName?: string,
}

export interface IForeignKeys {
  [key: string]: IForeignKey,
}
