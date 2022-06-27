import * as util from "../../tool/util/util.js"

export default class PrefixManager {
    prefix = {}
    link = {}

    constructor(array, options) {
        this.options = options || {}
        array.forEach(function(array) {
            this.addPrefix(...array)
        }, this)
    }

    getPrefix(prefix) {
        return this.prefix[prefix]
    }

    addPrefix(prefix, value, compare) {
        if (!Array.isArray(compare)) {
            if (compare === undefined) {
                compare = []
            } else {
                compare = [compare]
            }
        }
        let obj = Object.entries(this.link).find(function([key, val]) { return val == prefix })
        if (obj) {
            this.prefix[obj[0]].push({ value, compare })
        } else {
            let id = (new Date()).getTime() + (Math.round(Math.random() * 10000))
            this.link[id] = prefix
            this.prefix[id] = [{ value, compare }]
        }
        return this
    }

    removePrefix(prefix) {
        delete this.prefix[prefix]
        return this
    }

    findPrefix(value, { funcArgs, compare, option }) {

        // this class is use to create a default value of type not found
        // the extends is use if you want to search if this class is a instance of the util notFound
        class notFound extends util.notFound {}

        let ret = Object.entries(this.prefix).reduce(({ previousValue, previousLength }, [curretnKeyId, arrayArgs], currentIndex, array) => {
            let currentKey = this.link[curretnKeyId]
                // verify if the prefix f value is the came as the currentPrefix in array
            if ((currentKey instanceof util.notFound && previousLength == -1) || (value.substring(0, currentKey.length) == currentKey && previousLength < currentKey.length)) {
                // create another reduce to search in all of compare in the currentPrefix
                let ret = arrayArgs.reduce(({ previousVal, previousCompLength }, { value: currentVal, compare: currentComp }, currentInd, arr) => {
                    if (!Array.isArray(compare)) {
                        if (currentComp.length > 0) {
                            return { previousVal, previousCompLength }
                        } else {
                            return { previousVal: currentVal, previousCompLength: 0 }
                        }
                    }
                    if (compare.length < currentComp.length) {
                        return { previousVal, previousCompLength }
                    }
                    if (
                        currentComp.every((v, i, a) => {
                            return v == compare[i]
                        })
                    ) {
                        if (previousCompLength < currentComp.length) {
                            return { previousVal: currentVal, previousCompLength: currentComp.length }
                        }
                        return { previousVal, previousCompLength }
                    }
                    return { previousVal, previousCompLength }
                }, { previousVal: new notFound, previousCompLength: -1 })

                if (ret.previousVal instanceof notFound) {
                    return { previousValue, previousLength }
                }
                if (currentKey instanceof util.notFound) {
                    return { previousValue: ret.previousVal, previousLength }
                }
                return { previousValue: ret.previousVal, previousLength: currentKey.length }

            }
            return { previousValue, previousLength }

        }, { previousValue: new notFound, previousLength: -1 })

        if (!(option instanceof Object)) {
            option = {}
        }

        if (!Array.isArray(funcArgs)) {
            if (funcArgs === undefined) {
                funcArgs = []
            } else {
                funcArgs = [funcArgs]
            }
        }

        if (ret.previousValue instanceof notFound) {
            if (typeof this.options.default == "function") {
                console.log(funcArgs)
                return this.options.default(value, { funcArgs, compare, option })
            } else if (this.options.default) {
                return this.options.default
            } else {
                return undefined
            }
        }

        if (typeof ret.previousValue == "function") {
            return ret.previousValue(value, ...funcArgs)
        }
        if (option.addPrefix == false) {
            return ret.previousValue
        }
        return ret.previousValue + value.substring(ret.previousLength)
    }
}