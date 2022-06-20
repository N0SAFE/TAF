import scriptLoader from "../loader/scriptLoader.js"

export default new(class Parser {
    await = {}
    ini() {
        this.await["/global/lib/parser/js-yaml.js"] = scriptLoader.require({ module: "parser/js-yaml.js", property: "load" })
        this.await["/global/lib/parser/js-ini.js"] = scriptLoader.require({ module: "parser/js-ini.js", property: "parse" })
        this.await["/global/lib/parser/js-xml.js"] = scriptLoader.require({ module: "parser/js-xml.js", property: "parseFromString" })
        this.await["/global/lib/parser/js-csv.js"] = scriptLoader.require({ module: "parser/js-csv.js", property: "parse" })
    }
    methods = {
        JSON: async(data) => JSON.parse(data),
        HTMLDOCUMENT: async(data) => new DOMParser().parseFromString(data, "text/html"),
        HTML: async(data) => {
            let doc = new DOMParser().parseFromString(data, "text/html")
            let body, head
            let xml = (await scriptLoader.require({ method: "/global/lib/parser/js-xml.js", property: "parseFromString" }))(data)
            if (xml && Array.isArray(xml) && xml.length > 0 && Array.isArray(xml[0].childNodes)) {
                xml[0].childNodes.forEach(function(node) {
                    if (node.tagName == "body") {
                        body = true
                    }
                    if (node.tagName == "head") {
                        head = true
                    }
                })
                if (body || head) {
                    return {
                        body: doc.body,
                        head: doc.head
                    }
                } else {
                    let div = document.createElement("div")
                    div.innerHTML = data
                    return Array.from(div.children)
                }
            }
            let div = document.createElement("div")
            div.innerHTML = data
            return Array.from(div.children)
        },
        HTMLNODE: async(data) => {
            let doc = document.createElement("div")
            doc.innerHTML = data
            return Array.from(doc.children)
        },
        TEXT: async(data) => data,
        SCRIPT: async(data) => {
            // info the script can't be of method module
            let module = {}
            eval(data);
            return module
        },
        YAML: async(data) => (await this.await["/global/lib/parser/js-yaml.js"])(data),
        INI: async(data) => (await this.await["/global/lib/parser/js-ini.js"])(data),
        XML: async(data) => (await this.await["/global/lib/parser/js-xml.js"])(data),
        CSV: async(data) => (await this.await["/global/lib/parser/js-csv.js"])(data)
    }

    parseFromStr(data, method) {
        if (this.isAvailableMethod(method)) {
            return this.methods[method.toUpperCase().trim()](data)
        }
        throw new Error("unsupported method")
    }

    isAvailableMethod = (method) => Object.keys(this.methods).includes(method.toUpperCase().trim())

    addMethod = (methodName, func) => {
        methodName = methodName.toUpperCase().trim()
        if (this.isAvailableSyncMethod(methodName)) {
            throw new Error("conflict with the method " + methodName)
        }
        this.methods[methodName] = func
    }
})