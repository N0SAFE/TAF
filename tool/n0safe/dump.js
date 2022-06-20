export const dump = function(obj) {
    var objIdMap = new WeakMap,
        objectCount = 0,
        dumpId;

    function objectId(object) {
        if (!objIdMap.has(object)) {
            objIdMap.set(object, ++objectCount)
            return { id: objectCount, state: false }
        };
        return { id: objIdMap.get(object), state: true };
    }

    let recursiveFunc = function(_) {
        if (Array.isArray(_)) {
            _.forEach(function(item) {
                console.log(item)
            })
        }
    }



}


class die extends Error {
    constructor() {
        super(...arguments)
    }
}

export const dd = function() {
    stop()
    throw new die('execution stopped')
}