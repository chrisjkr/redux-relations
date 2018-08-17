export declare function mapRelationalStateToProps<IStore extends IAbstractStore>(storeNames: [keyof IStore]): (state: IStore) => {
    [key: string]: {
        [key: string]: any;
    }[];
};
export interface IAbstractStore {
    [key: string]: IRelationalStore<object>;
}
export interface IRelationalStore<ItemType> {
    items: IStoreItems<ItemType>;
    foreignKeys: IForeignKeys;
}
export interface IStoreItems<ItemType> {
    [id: string]: ItemType;
}
export declare enum RelationTypes {
    One = "one",
    Many = "many"
}
export interface IForeignKey {
    store: string;
    kind: RelationTypes;
    keyName?: string;
}
export interface IForeignKeys {
    [key: string]: IForeignKey;
}
