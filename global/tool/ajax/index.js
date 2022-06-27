import { serialize } from "../prototype/prototypeFormData.js"
import TAF from "../../var/TAF.js"

// create a function to put in ajaxResponse and ajaxArrayResponse to allow the user the property to create a personal function

let blankWindow

export function ini() {
    blankWindow = TAF.module.manager.window.createBlank()
}

export const ajaxResponsePrototype = new(class AjaxResponsePrototype {
    // the param function have to be the function for the AjaxResponse only and not the ArrayAjaxResponse
    addCustomProperty(name, func, force) {
        if (!(this.hasCustomProperty(name) && !force)) {
            AjaxResponse.prototype[name] = func
        }
        if (func.constructor.name === "AsyncFunction") {
            ArrayAjaxResponse.prototype[name] = async function(...args) { return Array.from(await Promise.all(this.map(async(ajaxResponse) => await ajaxResponse[name](...args)))) }
                // paste the async function to AjaxResponse and copty the async function form ArrayAjaxResponse
        } else {
            ArrayAjaxResponse.prototype[name] = function(...args) { return Array.from(this.map(ajaxResponse => ajaxResponse[name](...args))) }
                // paste the function to AjaxResponse and copty the function form ArrayAjaxResponse
        }
        return AjaxResponse[name]
    }

    removeCustomProperty(name) {
        if (this.hasCustomProperty())
            Object.getOwnPropertyNames(ArrayAjaxResponse.prototype).find((str) => str == name)
    }

    hasCustomProperty(name) {
        return Object.getOwnPropertyNames(ArrayAjaxResponse.prototype).includes(name)
    }

    getPrototypeFunc() {
        return Object.getOwnPropertyNames(ArrayAjaxResponse.prototype).filter((str) => { return !['constructor', 'prototype', '__proto__'].includes(str) })
    }
})


// ArrayAjaxResponse is a container of AjaxResponse with all array property
class ArrayAjaxResponse extends Array {
    constructor(...ajaxResponse) {
        super(...ajaxResponse.flat())
    }

    /* A function that takes a method as a parameter and returns an array of the results of calling the method on each element of the array. */
    async parse(method) { return Array.from(await Promise.all(this.map(async(ajaxResponse) => await ajaxResponse.parse(method)))) }

    /* Converting an array of ajax responses into an array of strings. */
    toString() { return Array.from(this.map(ajaxResponse => ajaxResponse.toString())) }

    /* Converting an array-like object into an array. */
    xml() { return Array.from(this.map(ajaxResponse => ajaxResponse.xml())) }
        /* Using the Array.from() method to convert the map() method's return value into an array. */
    response() { return Array.from(this.map(ajaxResponse => ajaxResponse.response())) }

    /* Using the Array.from() method to create a new array from the map() method. The map() method is used to call the getType() method on each element of the array. */
    type() { return Array.from(this.map(ajaxResponse => ajaxResponse.type())) }

    /* Using the Array.from() method to create a new array from the map() method. */
    url() { return Array.from(this.map(ajaxResponse => ajaxResponse.url())) }

    /* Creating an array of all the status codes from the ajax responses. */
    status() { return Array.from(this.map(ajaxResponse => ajaxResponse.status())) }

    /* Creating an array from the status text of each ajax response. */
    statusText() { return Array.from(this.map(ajaxResponse => ajaxResponse.statusText())) }

    /* Creating an array of booleans from the ajax responses. */
    ok() { return Array.from(this.map(ajaxResponse => ajaxResponse.ok())) }

    see() {
        setTimeout(() => {
            blankWindow.add(`<link rel=\"stylesheet\" href=\"${TAF.info.globalLocation}style/underline.css\">`)
            console.log("ui")
        }, 30)
        blankWindow.add(this.toString());
        return this
    }

    time() { return Array.from(this.map(ajaxResponse => ajaxResponse.time())) }

    headers() { return Array.from(this.map(ajaxResponse => ajaxResponse.headers())) }

    header(header) { return Array.from(this.map(ajaxResponse => ajaxResponse.header(header))) }

    getCalleeStackFrame() { return Array.from(this.map(ajaxResponse => ajaxResponse.callee())) }
}

// AjaxResponse is a class to treat an ajax response with multiple property
class AjaxResponse {
    constructor(xmlRequest, response, responseTime, calleeStackFrame) {
        this.AjaxXml = xmlRequest
        this.ajaxResponse = response
        this.responseString = response
        this.responseTime = responseTime
        this.calleeStackFrame = calleeStackFrame
    }

    /* Parsing a string. */
    async parse(method) {
        if (method.toUpperCase().trim() == "AUTO") {
            let mimeType = await TAF.module.loader.script.require({ module: "db/mime-type", property: "default" })
            if (this.xml().getResponseHeader("Content-Type")) {
                for (let ext of mimeType.extension(this.xml().getResponseHeader("Content-Type").split(";")[0])) {
                    let parsed
                    if (ext != "text") {
                        parsed = await TAF.module.util.parser.parseFromStr(this.responseString, ext);
                        if (!(parsed instanceof Error)) { return parsed }
                    }
                }
            }
            console.error("the content type of the requested file can't be readed (return default parse: text)")
            return TAF.module.util.parser.parseFromStr(this.responseString, "TEXT")
        } else {
            let ret = TAF.module.util.parser.parseFromStr(this.responseString, method)
            if (ret instanceof Error) {
                throw new Error("method must be JSON, TEXT, YAML, INI, XML or CSV")
            }
            return ret
        }
    }

    /* Defining a function called toString that returns the responseString. */
    toString() { return this.responseString }

    /* A getter function that returns the value of the xml property. */
    xml() { return this.AjaxXml }

    /* A function that returns the value of this.response. */
    response() { return this.ajaxResponse }

    /* A function that returns the responseType property of the XMLHttpRequest object. */
    type() { return this.xml().responseType }

    /* Returning the URL of the XMLHttpRequest. */
    url() { return this.xml().responseURL }

    /* A lambda function that returns the status of the XMLHttpRequest object. */
    status() { return this.xml().status }

    /* A function that returns the status text of the XMLHttpRequest object. */
    statusText() { return this.xml().statusText }

    /* A lambda expression that returns true if the response is "ok". */
    ok() { return this.response().toLowerCase().trim() == "ok" }

    see() {
        blankWindow.add(this.toString(), `<a target="blank" class="underline" href=\"${this.callee().getFileName()}\"> ${this.callee().getFileName()}:${this.callee().getLineNumber()}:${this.callee().getColumnNumber()}</a>`);
        return this
    }

    time() {
        return this.responseTime
    }

    headers() {
        return this.xml().getAllResponseHeaders()
    }

    header(header) {
        return this.xml().getResponseHeader(header)
    }

    callee() {
        return this.calleeStackFrame
    }

    test = "ui"

    static __option__ = {
        retType: {
            xml: XMLHttpRequest,
            test: String
        },
        addVal: {
            property: ["test"]
        }
    }
}

// todo
class ArrayAjaxCacheResponse extends Array {
    constructor(...ajaxCacheResponse) {
        super(...ajaxCacheResponse.flat())
    }

    method() {}
    ok() {}
    see() {}
    toString() {}
    response() {}
    status() {}
    statusText() {}
    headers() {}
    type() {}
    parse() {}

}

// todo
class AjaxCacheResponse {
    constructor(method, headers, responseString, response, xhrParams = {}) {
        Object.assign(this, {
            responseString,
            method,
            headers,
            response,
            xhrParams
        })
    }

    method() {}
    ok() {}
    see() {}
    toString() {}
    response() {}
    status() {}
    statusText() {}
    headers() {}
    type() {}
    parse() {}

}

export default new(class Ajax {
    allRequest = []

    acceptedMethod = {
        default: ["GET", "POST", "PUT", "DELETE"],
        cypted: ["GET", "POST"]
    }
    isValidMethod = (str) => this.acceptedMethod.default.includes(str.toUpperCase().trim())
    isValidCryptedMethod = (str) => this.acceptedMethod.crypted.includes(str.toUpperCase().trim())

    array = (function() {
        return {
            get: function(...array) {

                return TAF.module.manager.promise.custom(
                    new Promise(async(resolve, reject) => {
                        resolve(new ArrayAjaxResponse(...await Promise.all(array.map(function(item) { return this.get(item) }.bind(this)))))
                    }),
                    ajaxResponsePrototype.getPrototypeFunc().map(function(name) {
                        return { name, func: function(funcArgs) { return this[name](...funcArgs) } }
                    })
                )
            }.bind(this)
        }
    }.bind(this))()

    getCalleeStackFrame = function() {
        return (new TAF.module.util.StackContainer(
            import.meta.url)).getLast()
    }

    /**
     * @param {FormData} formData
     * @param {string} url
     * @param {string} method
     * @param {boolean} crypt
     */
    async setCryptedFormData(formData, url, method, crypt) {
        let isCryptActive = false
        let formDataToSend = new FormData()
        let uncryptFunc = function(str) { return str }
        if (crypt) {
            isCryptActive = true
            if (method.toUpperCase().trim() != "POST" && method.toUpperCase().trim() != "GET") {
                throw new Error("when you use the crypt argument, the params must be send by POST or GET method (other http method is not supported)")
            }
            if (crypt == true) {
                crypt = "send"
            }
            if (!["SEND", "RECEIVE", "DEFAULT", "ALL"].includes(crypt.toUpperCase().trim())) {
                throw new Error("the type argument must be SEND, RECEIVE, DEFAULT, ALL")
            }

            if (!window.sodium) window.sodium = await SodiumPlus.auto();

            if (crypt.toUpperCase().trim() == "SEND" || crypt.toUpperCase().trim() == "ALL" || crypt.toUpperCase().trim() == "DEFAULT") {
                let [publicHex, id] = (
                    await ajax.get({
                        url: import.meta.url + "/../getKey.php",
                        method: "GET"
                    })
                ).toString().split(";;;")

                if (publicHex.substring(0, 5) == "<?php") {
                    throw new Error("the php is require to use the ajax crypt function please put this folder in an apache server")
                }
                let publicKey = X25519PublicKey.from(publicHex, "hex")

                for (let [name, val] of Array.from(formData.entries())) {
                    if (typeof val == "string") {
                        let cipherText = await sodium.crypto_box_seal(val, publicKey);
                        formDataToSend.append(name, cipherText.toString("hex"))
                    }
                }

                formDataToSend.append("__ajax-crypt-id__", id)
            }
            if (crypt.toUpperCase().trim() == "RECEIVE" || crypt.toUpperCase().trim() == "ALL") {
                let clientKeyPair = await sodium.crypto_box_keypair();
                let clientSecretKey = await sodium.crypto_box_secretkey(clientKeyPair)
                let clientPublicKey = await sodium.crypto_box_publickey(clientKeyPair)
                formDataToSend.append("__ajax-client-key__", await sodium.sodium_bin2hex(clientPublicKey.getBuffer()))
                uncryptFunc = async function(cipherText) {
                    return (await sodium.crypto_box_seal_open(sodium.sodium_hex2bin(cipherText), clientPublicKey, clientSecretKey)).toString();
                }
            }
            formDataToSend.append("__ajax-crypt-path__", url)

            url =
                import.meta.url + "/../ajaxRedirect.php"

            formData = formDataToSend
        }

        return { url, uncryptFunc, formData, isCryptActive }
    }


    // this function send and receive data
    // param = Object<route = false, parse = text(json, text, yaml, ini, xml, csv), data:any, headers:Headers>
    // return an XMLRequest object (with the finished request) || if the param.parse is set return the parsed XMLRequest.responseText
    get(param) {
        let startTime = performance.now()
        param = param || {};
        if (!(param instanceof Object)) {
            throw new Error("the param argument must be of type object")
        }

        let headers = param.headers || null,
            data = param.data || null,
            parse = param.parse || null,
            route = param.route || false,
            crypt = param.crypt || false,
            formData = new FormData(),
            url = param.url,
            method = param.method || "GET",
            timeout = param.timeout,
            cache = param.cache || false;

        let calleeStackFrame = this.getCalleeStackFrame()
        let calleeFile = calleeStackFrame.getFileName()
        if (calleeFile.substring(0, 5) == "async") {
            calleeFile = calleeFile.split(" ").slice(1).join(" ")
        }

        formData.id = Math.random()

        if (typeof url !== "string") {
            throw new Error("url must be string");
        }

        if (typeof method !== "string") {
            throw new Error("method must be string");
        }

        if (!this.isValidMethod(method)) {
            throw new Error("method must be GET, POST, PUT, DELETE");
        }

        if (method.toUpperCase().trim() == "GET" && this.warning == true && data) {
            throw new Error("GET with parameters will overide the url parameters");
        }

        if (url.substring(0, 2) == "./") {
            let calleeDir = calleeFile.split("/").slice(0, -1).join("/")
            url = calleeDir + "/" + url.substring(2)
        }


        if (data) {
            if (typeof data == "string") {
                formData.append("string", data);
            } else if (data instanceof FormData) {
                Array.from(data.entries()).forEach(function([name, val]) {
                    formData.append(name, val)
                })
            } else if (data instanceof Object) {
                formData = serialize(data)
            } else {
                throw new Error("data must be string, FormData or Object");
            }
        }

        let xhr = new XMLHttpRequest()

        let promise = new Promise(async(resolve, reject) => {

            this.lastRequest = xhr;
            this.allRequest.push(xhr);

            let uncryptFunc
            let isCryptActive

            if (!TAF.module.util.isValidURL(url) && !route) {
                url = TAF.info.projectBaseLocation + url;
            } else if (route) {
                url = route
            };

            ({ url, uncryptFunc, formData, isCryptActive } = await this.setCryptedFormData(formData, url, method, crypt));

            let TIMEOUT

            xhr.getUncrypted = function() {
                return uncryptFunc(xhr.responseText)
            }
            xhr.onreadystatechange = async function() {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        clearTimeout(TIMEOUT)
                        if (parse) {
                            if (typeof parse === "function") {
                                resolve(new AjaxResponse(this, parse(await uncryptFunc(this.responseText)), performance.now() - startTime, calleeStackFrame))
                            } else if (typeof parse === "string") {
                                let ajaxResponse = new AjaxResponse(this, await uncryptFunc(this.responseText), performance.now() - startTime, calleeStackFrame)
                                ajaxResponse.ajaxResponse = await ajaxResponse.parse(parse)
                                resolve(ajaxResponse)
                            } else {
                                throw new Error("unknow parsing type variable");
                            }
                        } else {
                            resolve(new AjaxResponse(this, await uncryptFunc(this.responseText), performance.now() - startTime, calleeStackFrame))
                        }
                    } else {
                        reject(new AjaxResponse(this, await uncryptFunc(this.responseText), performance.now() - startTime, calleeStackFrame))
                    }
                }
            }
            if (headers) {
                if (!(headers instanceof Headers)) { throw new Error("headers must be instance of Headers") }
                if (isCryptActive) {
                    formData.append("__ajax-crypt-headers__", JSON.stringify(Array.from(headers.entries())))
                }
                Array.from(headers.entries()).map(([key, value]) => {
                    xhr.setRequestHeader(key, value)
                })
            } else if (isCryptActive) {
                formData.append("__ajax-crypt-headers__", JSON.stringify([]))
            }

            if (method.toUpperCase().trim() == "GET") {
                url = url.split("?")[0] + "?" + Array.from(formData.entries()).filter(function([key, value]) { return typeof value == "string" }).map(([key, value]) => { formData.delete(key); return key + "=" + value }).join("&")
                xhr.open(method.toUpperCase().trim(), url.at(-1) == "?" ? url.substring(0, url.length - 1) : url, true);
            } else {
                xhr.open(method.toUpperCase().trim(), url, true);
            }

            if (formData && method.toUpperCase().trim() != "GET") {
                xhr.send(formData)
            } else {
                xhr.send()
            }

            if (typeof timeout == "number") {
                TIMEOUT = setTimeout(function() {
                    xhr.abort()
                }, timeout)
            }
        })


        // ! todo
        // if (cache) {
        //     let result = (await cacheManager.get(url, {
        //         method: method.toUpperCase().trim()
        //     })).data
        //     if (result) {
        //         return new Promise((resolve, reject) => {
        //             resolve(new AjaxResponse(result))
        //         })
        //     }
        // }

        promise = promise.then(res => {
            if (param.success) {
                if (typeof param.success == "function") {
                    param.success(res)
                } else {
                    throw new Error("the success property had to be a callback")
                }
            }
            return res
        }, res => {
            if (param.error) {
                if (typeof param.error == "function") {
                    param.error(res)
                } else {
                    throw new Error("the error property had to be a callback")
                }
            }
            return res
        }, AjaxResponse)

        promise.abort = function() {
            xhr.abort()
        }

        return promise
    }


    getLastXmlRequest = () => this.lastRequest


    // this function send data
    // param = Object<route = false, data:any, headers:Headers>
    send(param) {
        param = param || {};
        let headers = param.headers || new Headers(),
            data = param.data || null,
            route = param.route || false,
            crypt = param.crypt || false,
            formData = new FormData(),
            url = param.url,
            method = param.method || "POST"

        if (typeof url !== "string") {
            throw new Error("url must be string");
        }

        if (typeof method !== "string") {
            throw new Error("method must be string");
        }

        if (!this.isValidMethod(method)) {
            throw new Error("method must be GET, POST, PUT, DELETE");
        }

        if (method.toUpperCase().trim() == "GET" && this.warning == true && data) {
            throw new Error("GET with parameters will overide the url parameters");
        }


        if (!(headers instanceof Headers)) { throw new Error("headers must be instance of Headers") }

        if (data) {
            if (typeof data == "string") {
                formData.append("string", data);
            } else if (Array.isArray(data)) {
                for (let i = 0; i < data.length; i++) {
                    formData.append(i, data[i]);
                }
            } else if (data instanceof FormData) {
                formData = data;
            } else if (data instanceof Object) {
                for (let key in data) {
                    formData.append(key, data[key]);
                }
            } else {
                throw new Error("data must be string, array, FormData or Object");
            }
        }

        return (async function() {
            ({ url } = await this.setCryptedFormData(formData, url, method, crypt))
            let xhr = new XMLHttpRequest();
            this.lastRequest = xhr;
            this.allRequest.push(xhr);
            if (!TAF.module.util.isValidURL(url) && !route) {
                url = TAF.info.projectBaseLocation + url;
            } else if (route) {
                url = route
            }
            if (method.toUpperCase().trim() == "GET") {
                xhr.open(method.toUpperCase().trim(), url.split("?")[0] + "?" + Array.from(formData.entries()).map(([key, value]) => { return key + "=" + value }).join("&"), true)
            } else {
                xhr.open(method.toUpperCase().trim(), url, true);
            }
            Array.from(headers.entries()).map(([key, value]) => {
                xhr.setRequestHeader(key, value)
            })
            if (formData && method.toUpperCase().trim() != "GET") {
                xhr.send(formData)
            } else {
                xhr.send()
            }
        })()
    }
})()