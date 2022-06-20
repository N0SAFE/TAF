import superIo from "./super.js";
import * as util from "../util/util.js"
import { parse } from "../objFunction/ArrayFunction.js"

export default class ARGS extends superIo {
    val = {}
    Undefined = class Undefined {}
    DefaultNotFound = class DefaultNotFound extends util.notFound {}
    get(url) {
        const self = this
        if (self.val[url]) {
            if (Array.isArray(self.val[url].constraint)) {
                return self.val[url].constraint.reduce(function(acc, { path, types, default: Default }) {

                    // console.log(Default)
                    // console.log(self.Undefined)
                    // console.log(Default == self.Undefined)
                    if (Default instanceof self.Undefined) {
                        Default == undefined
                    } else if (Default === undefined) {
                        Default = new self.DefaultNotFound()
                    }

                    // if path == undefined return the acc to continue the loop and avoid the path
                    if (path == undefined) {
                        console.error("an error occure during the parse of the args")
                        return acc
                    }

                    // defaultVal as to default a anonymous function that can't be replicate (so we can compare if the defaultVal is the same as the actual val without having a conflict)
                    let defaultBool = false
                    path = parse(path) // parse is a function that verify if the args is an array (if not it transform into an array)

                    let value = util.searchInObject(self.val[url].val, path)
                    if (value instanceof util.types.notFounds.searchInObject) {
                        value = undefined
                    }

                    if (value === undefined) {
                        if (!(Default instanceof util.notFound)) {
                            if (typeof Default == "function") {
                                util.addInObject(acc, path, Default(value))
                            } else {
                                if (Default instanceof self.Undefined) {
                                    util.addInObject(acc, path, undefined)
                                } else {
                                    util.addInObject(acc, path, Default)
                                }
                            }
                        } else if (types.includes(undefined)) {
                            util.addInObject(acc, path, undefined)
                        } else {
                            throw new Error("the args '" + path.join(".") + "' cannot be null")
                        }
                        defaultBool = true
                    }
                    if (types && !defaultBool) {

                        if (!Array.isArray(types)) {
                            throw new Error("the types arguments must be an array")
                        }

                        if (
                            types.some(function(type) {
                                try {
                                    if (value instanceof type) {
                                        return true
                                    }
                                } catch {}
                                if (value === type) {
                                    return true
                                }
                                if (typeof value === type) {
                                    return true
                                }
                                if (typeof value === "string" && type == String) {
                                    return true
                                }
                                if (typeof value === "number" && type == Number) {
                                    return true
                                }
                                return false
                            })
                        ) {
                            util.addInObject(acc, path, value)
                        } else {
                            console.group()
                            console.info("the type of '" + path.join(".") + "' is not include in the types array")
                            console.error("types array : ", types)
                            console.error("Default val : ", Default)
                            console.error("path : ", path)
                            console.groupEnd()
                            throw new Error()
                        }
                    }
                    return acc
                }, {})
            } else {
                console.error("on the function setContaint the second arguments must be in type Array")
            }
            return self.val[url].val
        }
        return undefined
    }

    setConstraint(url, constraint) {
        if (this.val[url]) {
            this.val[url].constraint = constraint
        } else {
            this.val[url] = {
                constraint: constraint
            }
        }
        return this
    }

    set(url, val) {
        if (this.val[url]) {
            this.val[url].val = val
        } else {
            this.val[url] = {
                constraint: new util.notFound,
                val: val
            }
        }
        return this
    }
}