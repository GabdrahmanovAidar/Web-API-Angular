export function assign(...args) {
    return Object.assign.apply(Object, [{}, ...args]);
}

export function sortItemInArray(array: any[], fromIndex: number, toIndex: number): any[] {
    const newArray = [...array];
    const item = newArray[fromIndex];
    if (toIndex === fromIndex) {
        return array;
    } else if (toIndex > fromIndex) {
        newArray.splice(fromIndex, 1);
        newArray.splice(toIndex, 0, item);
    } else {
        newArray.splice(toIndex, 0, item);
        newArray.splice(fromIndex + 1, 1);
    }
    return newArray;
}

export function updateItemInArray(array, item, index) {
    const newArray = [...array];
    newArray[index] = item;

    return newArray;
}

export function addToArray(array: any[] = [], item: any, position?: number, replace?: boolean): any[] {
    const newArray = [...array];
    if (position >= 0) {
        const removeItemsCount = replace === true ? 1 : 0;
        newArray.splice(position, removeItemsCount, item);
    } else {
        newArray.push(item);
    }
    return newArray;
}

export function removeFromArray(array: any[], index: number): any[] {
    return array.filter((item, i) => i !== index);
}