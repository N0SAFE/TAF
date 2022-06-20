// templates obj:Object<?tag:string, ?element:HTMLElement<>, ?attribute:Object<key:value>, ?eventListner:Array<Object<key:string, value:any, ?propagation:bool>>, ?inner:string(innerHTML), ?child:creator(recursive)|Array<creator(recursive)>>
// priority order (tag, element, inner, attribute) overridden each other
// ! add the posibility to execute function 


export function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild;
}


export function parse(HTMLElement) {
    HTMLElement.child
}


class ReferencerLink {
    constructor(name, referencer) {
        this.name = name
        this.referencer = referencer
    }

    handle(callback) {
        this.referencer.addBind(this.name, function() {
            callback(this.referencer[this.name])
        }.bind(this))
        callback(this.referencer[this.name])
    }
}

export class Referencer {
    field = {}
    constructor(...fieldNames) {
        fieldNames.forEach(function(fieldName) {
            this.addField(fieldName)
        }, this)
    }

    bind = {}

    addField(fieldName) {
        Object.defineProperty(this, fieldName, {
            get() {
                return this.field[fieldName]
            },
            set(value) {
                this.field[fieldName] = value
                if (this.bind[fieldName]) {
                    this.bind[fieldName].forEach((callback) => {
                        callback(value)
                    })
                }
            }
        })
    }

    addBind(fieldName, callback) {
        if (this.bind[fieldName]) {
            this.bind[fieldName].push(callback)
        } else {
            this.bind[fieldName] = [
                callback
            ]
        }
    }

    link(name) {
        return new ReferencerLink(name, this)
    }
}


export function creator(obj = {}, sortType) {
    let ret = recursiveFunction(obj)
    console.log(sortType)
    if (sortType == "text")
        return ret.outerHTML
    return ret
}

function recursiveFunction(obj = {}) {
    // console.log(obj)
    if (!(typeof obj.tag === "string") && (obj.element != undefined && !(obj.element instanceof HTMLElement))) {
        return null;
    }
    if (typeof obj === "string") {
        return createElementFromHTML(obj);
    }
    if (obj.outer != undefined && typeof obj.outer == "string") {
        return createElementFromHTML(obj.outer);
    }
    obj.attribute = obj.attribute instanceof Object ? obj.attribute : {};
    obj.eventListner = obj.eventListner instanceof Array ? obj.eventListner : [];
    obj.style = obj.style instanceof Object ? obj.style : {};
    obj.property = obj.property instanceof Object ? obj.property : {};
    if (Object.prototype.toString.call(obj.child) === "[object Object]") {
        obj.child = [obj.child];
    }
    if (!Object.prototype.toString.call("[object Array]")) {
        obj.child = [];
    }
    if (typeof obj.inner !== "string") {
        obj.inner = undefined;
    }
    let elmt
    if (obj.element != undefined && obj.element instanceof HTMLElement) {
        elmt = obj.element;
    } else {
        elmt = document.createElement(obj.tag);
    }

    for (let val of obj.eventListner) {
        elmt.addEventListener(val.name, val.value, val.propagation);
    }
    Object.entries(obj.attribute).forEach(([key, value]) => {
        if (value instanceof ReferencerLink) {
            value.handle((val) => {
                elmt.setAttribute(key, val)
            })
        } else {
            elmt.setAttribute(key, value)
        }
    })
    Object.entries(obj.style).forEach(([key, value]) => {
        if (value instanceof ReferencerLink) {
            value.handle((val) => {
                elmt.style[key] = val
            })
        } else {
            elmt.style[key] = value;
        }
    })
    Object.entries(obj.property).forEach(([key, value]) => {
        if (value instanceof ReferencerLink) {
            value.handle((val) => {
                elmt[key] = val
            })
        } else {
            elmt[key] = value;
        }
    });

    if (obj.inner) {
        elmt.innerHTML = obj.inner;
    } else if (obj.child != undefined) {
        forEachRecursive(obj.child, elmt);
    }
    return elmt;
}

function forEachRecursive(child, elmt) {
    if (Array.isArray(child)) {
        child.forEach(child => {
            forEachRecursive(child, elmt)
        })
    } else if (typeof child === "function") {
        forEachRecursive(child(elmt), elmt)
    } else {
        if (child == undefined) {
            null
        } else if (child instanceof HTMLElement) {
            elmt.appendChild(child);
        } else {
            elmt.appendChild(creator(child));
        }
    }
}