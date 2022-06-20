import { contains, parse } from "../objFunction/ArrayFunction.js"
import { areEquals, searchInObject } from "../util/util.js"

export default class Logic {}

export class Gate extends Logic {
    constructor(...vals) {
        super()
        this.vals = vals
    }
    vals = []
    numArgs = 1
    ret(a) { return !!a }
    test(obj) {
        const self = this
        let tempArr = []
        if (this.vals.length < this.numArgs) {
            throw new Error("the number of arguments is under the requirement")
        }
        this.vals.forEach(function(val) {
            if (val instanceof Gate) {
                tempArr.push(val.test(obj))
            } else if (val instanceof Compare) {
                tempArr.push(val.test(obj))
            } else if (val instanceof Val) {
                let val = val.get()
                if (!Array.isArray(val)) {
                    if (val != undefined) {
                        val = [val]
                    } else {
                        throw new Error("no arguments use in Val Object")
                    }
                }
                tempArr.push(searchInObject(obj, val))
            } else if (typeof val == "function") {
                tempArr.push(val(obj))
            }
        })
        return !!this.ret(...tempArr)
    }
}

// return inversed bool
export class Not extends Gate {
    numArgs = 1
    ret(a) { return !a }
}

// return correct bool
export class Buffer extends Gate {
    numArgs = 1
    ret(a) { return !!a }
}

// return bool
export class And extends Gate {
    numArgs = 2
    ret(a, b) { return a && b }
}

// return bool
export class Or extends Gate {
    numArgs = 2
    ret(a, b) { return a || b }
}

// return associate val obj
export class Val {
    constructor(a) {
        this.a = a
    }
    get() { return this.a }
}

// return bool
export class Compare extends Logic {
    toCompares = []
    constructor(...toCompares) {
        super()
        this.toCompares = toCompares
    }

    ret() {}
    test(obj) {
        const self = this
        let toCompares = this.toCompares.map(function(toCompare) {
            if (toCompare instanceof Val) {
                let val = toCompare.get()
                if (!Array.isArray(val)) {
                    if (val != undefined) {
                        val = [val]
                    } else {
                        throw new Error("no arguments use in Val Object")
                    }
                }
                return searchInObject(obj, val)
            }
            return toCompare
        })
        return this.ret(...toCompares)
    }
}

export class Equal extends Compare {
    ret() { return !!areEquals(...arguments) }
}

export class Different extends Compare {
    ret() { return !areEquals(...arguments) }
}

export class Contains extends Compare {
    /**
     * @param {Array} a
     * @param {Array} b
     */
    ret(a, b) { return contains(parse(a), parse(b)) }
}