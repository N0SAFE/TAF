// contain all association between class name string and current class
import promiseManager from "./manager/promiseManager.js";
import association_string_to_object from "../association/string-class.js"
import TAF from "../var/TAF.js";

export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default new(class PrototypeModifier {
    // contain all association between fileName and associate object
    // example : association{"prototype/array": Array}
    association = {}

    constructor() {
        this.prototype = {}
    }

    async ini() {
        this.setAssociations()
        this.add(Array, "asyncForEach", asyncForEach)
        this.add(Promise, 'then', THEN)
        this.add(Promise, 'catch', CATCH)
    }

    add(object, propertyName, value, moduleNameForConflict = "") {
        moduleNameForConflict = moduleNameForConflict != "" ? "[" + moduleNameForConflict + "]" : ""
        this.createNewBibl(object.name)
        object.prototype[propertyName] = value

        if (this.prototype[object.name + moduleNameForConflict] == undefined) {
            this.prototype[object.name + moduleNameForConflict] = { "class": object, "property": [] }
        }

        this.prototype[object.name + moduleNameForConflict].property.push(value)

    }

    async addFromPrototypeModules(...array) {
        return await Promise.all(array.map(async function([fileName, funcName, name]) {
            return await this.addFromPrototypeModule(fileName, funcName, name)
        }, this))
    }

    async addFromPrototypeModule(fileName, property, name = undefined) {
        if (scriptLoader == undefined) {
            throw new Error("to use the function loadPrototypeFromFile, you must ini the built-in package")
        }
        fileName = capitalize(fileName)
            // console.log(scriptLoader.call(fileName, funcName))
        this.add(this.association[fileName], name ? name : (Array.isArray(property) ? property.join("_") : property), await scriptLoader.require({ module: "n0safe/prototype/" + fileName, property }))
    }

    async addFromModules(...array) {
        return await Promise.all(array.map(async function([object, module, property, name]) {
            return this.addFromModule(object, module, property, name)
        }, this))
    }

    async addFromModule(object, module, property, name) {
        if (scriptLoader == undefined) {
            throw new Error("to use the function loadPrototypeFromFile, you must ini the built-in package")
        }

        this.add(object, name ? name : funcName, await scriptLoader.require({ module, property }))
        return object.prototype;
    }

    getPersonnalizedProperty(object, propertyName = null) {
        return propertyName == null ? this.prototype[object] : this.prototype[object][propertyName]
    }
    getAllObjectsWithPersonnalizedProperty() { return this.prototype }
    createNewBibl(biblName) {
        if (!this.isBilbExist) {
            this.prototype[biblName] = {}
        }
        return biblName
    }

    isBilbExist(biblName) {
        return Object.keys(this.prototype).includes(biblName)
    }

    setAssociations() {
        let association = Object.keys(TAF.json.loader.packageTAF.n0safe.prototype).map(function(key) { return [key, TAF.json.loader.packageTAF.n0safe.prototype[key]] })
        association.forEach(function([name, object]) {
            try { this.association[name] = association_string_to_object[object.params.object]; } catch {}
        }.bind(this))
    }

    getModifiedPrototype() {
        return this.prototype
    }
})

async function asyncForEach(callback = () => { throw new Error("error no callback assign"); }, wait = true, timeout = 0) {
    let ret = [];
    callback = callback.bind(this)
    for (let i = 0; i < this.length; i++) {
        this.index = i
        if (i != 0 && timeout != 0 && !isNaN(timeout)) {
            await new Promise(resolve => setTimeout(resolve, timeout))
        }
        if (wait == false) {
            this.actualReturn = callback(this[i])
            ret.push(this.actualReturn)

        } else {
            this.actualReturn = await callback(this[i])
            ret.push(this.actualReturn)

        }
    }
    return ret;
}

let Then = Promise.prototype.then
let Catch = Promise.prototype.catch


function THEN(callbackSuccess, callbackError, object, options) {
    if (!(this instanceof Promise)) {
        return new Error("this function has to be attach to a promise object")
    }


    let promise = Then.call(this, callbackSuccess, callbackError)
    if (object) {
        return promiseManager.custom(
            promise,
            object,
            options
        )
    }
    return promise
}

function CATCH(callbackSuccess, callbackError, object, options) {
    if (!(this instanceof Promise)) {
        return new Error("this function has to be attach to a promise object")
    }
    if (TAF.module.util.isClass(object)) {
        object = object.prototype
    }
    let promise = Catch.call(this, callbackSuccess, callbackError)
    if (object) {
        return promiseManager.custom(
            promise,
            object,
            options
        )
    }
    return promise
}