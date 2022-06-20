import { areEquals } from './util.js'

export default class Assert {
    constructor(...vals) {
        this.vals = vals
    }
}

class AssertError extends Error {

}

export class Equal extends Assert {
    test(error, success) {
        if (this.vals.length < 2) {
            throw new Error("the number of arguments is under 2")
        }
        if (this.vals[0] == this.vals[1]) {
            success ? console.log(success) : null
            return true
        }
        throw new AssertError(error)
    }
}

export class Equals extends Assert {
    test(error, success) {
        if (areEquals(this.vals)) {
            success ? console.log(success) : null
            return true
        }
        throw new AssertError(error)
    }
}