
export const isEmpty = (obj): boolean =>
    Object.keys(obj).length === 0 && obj.constructor === Object;

export const AppLogger = (value: any) => {
    // console.log(`<------------------------------------ ${value} ------------------------------------>`);
};