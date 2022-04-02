export const isArray = (array: Array<any>) => {
    return array instanceof Array;
};

export const isString = (text: string) => {
    return typeof text == "string" && text.constructor == String;
};

export const stringIsEmpty = (text: string) => {
    if (isString(text)) {
        return text.length <= 0;
    }
    throw new Error("text is not a String");
};

export const arrayIsEmpty = (array: Array<any>) => {
    if (isArray(array)) {
        return array.length <= 0;
    }
    throw new Error("array is not a Array");
};
