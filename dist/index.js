"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mapRelationalStateToProps(storeNames) {
    return (state) => {
        let relationalState = {};
        storeNames.forEach((storeName) => {
            const store = state[storeName];
            const items = store.items;
            const foreignKeys = store.foreignKeys;
            const foreignKeyNames = Object.keys(foreignKeys);
            let newItems = [];
            for (let itemKey in items) {
                const item = items[itemKey];
                let newItem = Object.assign({}, item);
                foreignKeyNames.forEach((foreignKeyName) => {
                    const foreignKey = foreignKeys[foreignKeyName];
                    const relatedStore = state[foreignKey.store];
                    let relatedData;
                    const dataKey = foreignKey.keyName
                        ? foreignKey.keyName
                        : foreignKey.store;
                    if (foreignKey.kind === RelationTypes.One) {
                        const id = item[foreignKeyName];
                        relatedData = relatedStore.items[id];
                    }
                    else if (foreignKey.kind === RelationTypes.Many) {
                        const ids = item[foreignKeyName];
                        relatedData = ids.map((id) => relatedStore.items[id]);
                    }
                    newItem[dataKey] = relatedData;
                    delete newItem[foreignKeyName];
                });
                newItems.push(newItem);
            }
            relationalState[storeName] = newItems;
        });
        return relationalState;
    };
}
exports.mapRelationalStateToProps = mapRelationalStateToProps;
var RelationTypes;
(function (RelationTypes) {
    RelationTypes["One"] = "one";
    RelationTypes["Many"] = "many";
})(RelationTypes = exports.RelationTypes || (exports.RelationTypes = {}));
