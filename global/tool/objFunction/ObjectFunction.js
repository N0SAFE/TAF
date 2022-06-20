import isTypeOf from '../verification/typeVerification.js';


export const mergeObject = function mergeObject(obj1, obj2) {
    let obj3 = {};
    Object.assign(obj3, obj1);
    Object.assign(obj3, obj2);
    return obj3;
}

export const getObjectValue = function getObjectValue(obj) {
    return isTypeOf("object", obj) ? Object.values(obj) : () => { console.error("ObjectFunction.getObjectValue: obj is not an object"); return obj; };
}

export const getObjectKey = function getObjectKey(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]' ? Object.keys(obj) : () => { console.error("ObjectFunction.getObjectKey: obj is not an object"); return obj; };
}

export const isObject = function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}


// end