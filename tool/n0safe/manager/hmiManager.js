import { contains } from "../../../global/tool/objFunction/ArrayFunction.js"
import TAF from "../../../global/var/TAF.js"
import { unique } from "../unique/Id.js"




export const keyboard = new(class KeyboardManager {
    listnerKey = []
    keyPressed = {}
    listnerSequence = []
    sequenceKeyPress = {
        total: [],
        concat: [],
        DdownUp: []
    }
    listnerLoop = []

    constructor() {
        window.addEventListener('keydown', this.keyDown.bind(this))
        window.addEventListener('keyup', this.keyUp.bind(this))
    }

    // todo
    removeKeyListener(callback) {
        return Array.from(this.listnerKey).find(function(obj, index) {
            if (obj.callback == callback) {
                delete this.listnerKey[index]
                return true
            }
            return false
        }, this)
    }

    // todo
    removeKeyListenerByKey(...keys) {
        return Array.from(this.listnerKey).find(function(obj, index) {
            if (obj.keys.includes(keys)) {
                // TODO: change this (it makes an empty index in array)
                // this.listnerKey =
                delete this.listnerKey[index]
                return true
            }
            return false
        }, this)
    }

    // keys is an object with the key, the type (press, up, down, all) <-- format
    // type is a global type for the callback call
    keyListen(callback, keys, type) {
        this.listnerKey.push({ keys, callback, type })
    }

    removeSequenceListner() {

    }

    sequenceListen(sequence) {
        this.listnerKey
    }

    removLoopListner() {

    }

    loopListen(callback, key, num, param = { loop: false }) {
        this.listnerLoop.push({ callback, key, type: param.type, loop: param.loop, toReach: num, i: 0 })
    }

    listenAll(callback) {

    }


    verify(val) {
        // console.log(this.sequenceKeyPress.total)
        let self = this
        let typeAction = new Set()
        let actuaKeysString = Object.values(this.keyPressed).map(function(obj) {
            return [obj.key, obj.keyCode, ...obj.types.map(function(type) {
                typeAction.add(type)
                return [`${obj.key}-${type}`, `${obj.keyCode}-${type}`]
            }).flat()]
        }).flat()

        // console.log(actuaKeysString)

        this.listnerKey.filter(function(listnerObj) {
            let tempTypeAction = new Set()
            let tempTypeActionBool = true
            let ret = listnerObj.keys.every(function(keyObj) {
                if (keyObj instanceof TAF.module.logic.default.Super) {
                    tempTypeActionBool = false
                    return keyObj.test({ keys: actuaKeysString })
                } else {
                    let ret = contains(
                        [keyObj.key, `${keyObj.key}-${keyObj.type || "press"}`],
                        actuaKeysString
                    )

                    // verification du type action (up, down, once), cela retourne les type pour les keys du keyObj, la verification ne peut pas etre faite sur le Logic Processor parceque cette fonction est une boite noir (nous ne pouvons pas voir quelle sont les verification faite)
                    if (ret) {
                        Object.values(self.keyPressed).filter(function(obj) {
                            return obj.key == keyObj.key
                        }).forEach(function(obj) {
                            obj.types.forEach(function(type) {
                                tempTypeAction.add(type)
                            })
                        })
                    }
                    return ret
                }
            })
            if (ret) {
                if (tempTypeActionBool) {
                    listnerObj.typeAction = tempTypeAction
                } else {
                    listnerObj.typeAction = typeAction
                }
            }
            return ret
        }).forEach(async function(listnerObj) {
            let typeAction = Array.from(listnerObj.typeAction)
            if (listnerObj.type == "down") {
                if (typeAction.includes("down")) {
                    return listnerObj.callback(listnerObj)
                }
                return
            } else if (listnerObj.type == "up") {
                if (typeAction.includes("up")) {
                    return listnerObj.callback(listnerObj)
                }
                return
            } else if (listnerObj.type == "once") {
                if (!listnerObj.param || !listnerObj.param.end) {
                    listnerObj.param ? listnerObj.param.end = true : listnerObj.param = { end: true }
                    return listnerObj.callback(listnerObj)
                }
                return
            }
            return listnerObj.callback(listnerObj)
        })

        if (this.listnerLoop.length) {
            this.listnerLoop.filter(function(item) {
                if (item.type && item.type != "all" && item.type != "press" && item.type != "keep") {
                    return ((item.key == val.key || item.key == val.keyCode) && val.types.some(function(type) {
                        return type == item.type
                    }))
                } else if (item.type == "keep") {
                    Object.values(self.keyPressed).some(function(keyPressedObj) {
                        if (keyPressedObj.key == item.key && keyPressedObj.pressIter == item.toReach) {
                            item.callback()
                            if (item.loop) {
                                keyPressedObj.pressIter = 0
                            }
                        }
                        return keyPressedObj.key == item.key
                    })
                    return false
                } else {
                    return item.key == val.key || item.key == val.keyCode
                }
            }).forEach(function(item) {
                if (item.i + 1 == item.toReach) {
                    item.callback()
                    if (item.loop) {
                        item.i == 0
                    }
                }
                item.i = item.i + 1
            })
        }
    }


    keyDown(e) {
        let val
        if (val = Object.values(this.keyPressed).find(function(obj) {
                return obj.keyCode == e.keyCode
            })) {
            val.types = ["press"]
            val.pressIter++;
            this.sequenceKeyPress.total.push({...val })
        } else {
            Object.values(this.keyPressed).forEach(function(obj) {
                if (obj.keyCode != e.keyCode && !obj.types.includes("up")) {
                    obj.types = ["press"]
                }
            })
            let uniqueId = unique()
            val = this.keyPressed[uniqueId] = { key: e.key.toLowerCase(), types: ["down", "press"], keyCode: e.keyCode, pressIter: 1 }
            this.sequenceKeyPress.total.push({...val })
        }
        this.verify(val)
    }

    keyUp(e) {
        // ? dump the error when the Object.entries(this.keyPressed) return an undefined value
        try {
            let [index] = Object.entries(this.keyPressed).find(function([key, value]) {
                return value.keyCode == e.keyCode
            })
            this.keyPressed[index].types = ["up"]
            this.sequenceKeyPress.total.push({...this.keyPressed[index] })
            this.verify(this.keyPressed[index])
            delete this.keyPressed[index]
        } catch {}
    }
})

export const mouse = new(class MouseManager {

})