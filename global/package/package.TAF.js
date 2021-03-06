export default {
    "n0safe": {
        "dev": {
            "__custom-processing__": {
                "test": {
                    "try": {
                        "load": [{
                            "controller": "dev/customFunction::[try]",
                            "value": "[$promise$]"
                        }]
                    }
                }
            },
            "__repo__": {
                "test": true,
                "path": "app.js",
                "sort": "built-in-dev",
                "require": [
                    { "script": "manager/window", "use": ["default"] },
                    { "script": "dev/components", "use": ["default"] },
                    { "script": "dev/onrequestreceive", "use": ["default"] }
                ],
                "other": "ui"
            },
            "customFunction": {
                "path": "customFunction.js",
                "sort": "buil-in-dev"
            },
            "onrequestreceive": {
                "path": "onrequestreceive.js",
                "sort": "built-in-dev"
            },
            "components": {
                "path": "components.js",
                "sort": "built-in-dev",
                "require": [{ "script": "manager/element", "use": ["creator"] }]
            }
        },
        "ajax": {
            "path": "ajax/ajax.js",
            "sort": "n0safe-ajax"
        },
        "sandbox": {
            "dom": {
                "path": "dom.js",
                "sort": "n0safe-sandbox"
            }
        },
        "function": {
            "__global__": {
                "sort": "built-in-func"
            },
            "__repo__": {
                "path": "function.js"
            },
            "Timer": {
                "path": "Timer.js"
            },
            "async": {
                "path": "async.js"
            },
            "parser": {
                "path": "parser.js"
            }
        },
        "objFunction": {
            "array": {
                "path": "ArrayFunction.js",
                "sort": "built-in-object-func"
            },
            "dom": {
                "path": "DomFunction.js",
                "sort": "built-in-object-func"
            },
            "object": {
                "path": "ObjectFunction.js",
                "sort": "built-in-object-func"
            }
        },
        "observer": {
            "mutation": {
                "path": "MutationObserver.js",
                "sort": "built-in-observer"
            },
            "slim": {
                "path": "ObservableSlim.js",
                "sort": "built-in-observer"
            }
        },
        "prototype": {
            "__global__": {
                "sort": "built-in-prototype"
            },
            "Array": {
                "path": "prototypeArray.js",
                "sort": "built-in-prototype",
                "params": { "object": "Array" }
            },
            "Object": {
                "path": "prototypeObject.js",
                "sort": "built-in-prototype",
                "params": { "object": "Object" }
            },
            "String": {
                "path": "prototypeString.js",
                "sort": "built-in-prototype",
                "params": { "object": "String" }
            },
            "Number": {
                "path": "prototypeNumber.js",
                "sort": "built-in-prototype",
                "params": { "object": "Number" }
            },
            "Bool": {
                "path": "prototypeBool.js",
                "sort": "built-in-prototype",
                "params": { "object": "Boolean" }
            },
            "Date": {
                "path": "prototypeDate.js",
                "sort": "built-in-prototype",
                "params": { "object": "Date" }
            },
            "RegExp": {
                "path": "prototypeRegExp.js",
                "sort": "built-in-prototype",
                "params": { "object": "RegExp" }
            },
            "Function": {
                "path": "prototypeFunction.js",
                "sort": "built-in-prototype",
                "params": { "object": "Function" }
            },
            "Window": {
                "path": "prototypeWindow.js",
                "sort": "built-in-prototype",
                "params": { "object": "Window" }
            },
            "Document": {
                "path": "prototypeDocument.js",
                "sort": "built-in-prototype",
                "params": { "object": "HTMLDocument" }
            },
            "HTMLElement": {
                "path": "prototypeHTMLElement.js",
                "sort": "built-in-prototype",
                "params": { "object": "HTMLElement" }
            },
            "HTMLCollection": {
                "path": "prototypeHTMLCollection.js",
                "sort": "built-in-prototype",
                "params": { "object": "HTMLCollection" }
            },
            "Symbol": {
                "path": "prototypeSymbol.js",
                "sort": "built-in-prototype",
                "params": { "object": "Symbol" }
            },
            "Promise": {
                "path": "prototypePromise.js",
                "params": {
                    "object": "Promise"
                }
            },
            "FormData": {
                "path": "prototypeFormData.js",
                "params": {
                    "object": "FormData"
                }
            }
        },
        "verification": {
            "custom": {
                "path": "customVerification.js",
                "sort": "built-in-regex"
            },
            "regex": {
                "path": "regexVerification.js",
                "sort": "built-in-regex"
            },
            "type": {
                "path": "typeVerification.js",
                "sort": "built-in-regex"
            }
        },
        "manager": {
            "__global__": {
                "sort": "n0safe-manager"
            },
            "__realName__": "manager",
            "cache": {
                "path": "cacheManager.js"
            },
            "interface": {
                "path": "interfaceManager.js"
            },
            "element": {
                "path": "elementManager.js"
            },
            "cookie": {
                "path": "cookieManager.js"
            },
            "hierarchy": {
                "path": "hierarchyManager.js",
                "styles": ["manager/css/hierarchyManager.css", "|default.css"],
                "src": "font-awesome~~6.0.0-beta3~~all~~css",
                "require": [
                    { "script": "manager/element", "use": "creator" },
                    { "script": "prototype/string", "use": "capitalize" }
                ]
            },
            "form": {
                "path": "formManager.js"
            },
            "popUp": {
                "path": "popUpManager.js",
                "styles": ["manager/css/popUpManager.css", "|default.css"],
                "require": [
                    { "script": "manager/element", "use": "creator" }
                ]
            },
            "window": {
                "path": "windowManager.js"
            },
            "video": {
                "path": "videoManager.js",
                "require": [{ "script": "manager/element", "use": ["creator"] }]
            },
            "event": {
                "path": "eventManager.js",
                "sort": "built-in-event"
            },
            "HMI": {
                "path": "hmiManager.js",
                "prototype": ["Array::[removeItemAll, pushOnce, has, findBy]"]
            },
            "http": {
                "path": "httpManager.js"
            },
            "object": {
                "path": "objectManager.js"
            },
            "spa": {
                "path": "spa.js"
            }
        },
        "compiler/css": {
            "path": "compiler/cssCompiler.js",
            "sort": "n0safe-compiler"
        },
        "urlParser": {
            "path": "url/UrlParamParser.js",
            "sort": "n0safe-url"
        },
        "unique": {
            "id": {
                "path": "Id.js",
                "sort": "n0safe-unique"
            },
            "uuid": {
                "path": "Uuid.js",
                "sort": "n0safe-unique"
            }
        },
        "__unique/super__": {
            "path": "unique/Super.js",
            "sort": "n0safe-unique"
        },
        "dom": {
            "magneticScroll": {
                "env": "dev",
                "path": "./MagneticScroll.js",
                "sort": "n0safe-dom"
            }
        },
        "console": {
            "color": {
                "path": [1, "console/color.js"],
                "sort": "n0safe-console"
            },
            "dynamic": {
                "path": "dynamic.js",
                "sort": "n0safe-console"
            },
            "error": {
                "path": "error.js",
                "require": [
                    { "script": "n0safe/console/prettyError", "use": ["default"] },
                    { "script": "n0safe/console/errorStackParser", "use": ["default"] }
                ],
                "sort": "n0safe-console"
            },
            "prettyError": {
                "path": [1, "console/prettyError.js"],
                "sort": "n0safe-console"
            },
            "errorStackParser": {
                "path": "ErrorStackParser.js",
                "sort": "n0safe-console"
            },
            "figlet": {
                "path": "figlet.js",
                "sort": "n0safe-console"
            },
            "enquirer": {
                "url": "https://cdn.skypack.dev/enquirer-browserify",
                "sort": "n0safe-console"
            }
        },
        "dump": {
            "path": "dump.js",
            "sort": "n0safe-function"
        }
    },
    "db": {
        "mime-type": {
            "path": [-1, "index.js"],
            "sort": "db"
        },
        "randomData": {
            "path": [-1, "index.js"],
            "sort": "db"
        }
    },
    "node_modules": {
        "__global__": {
            "sort": "node_modules"
        },
        "gsap": {
            "path": "gsap.js",
            "sort": "node_modules"
        },
        "lodash": {
            "path": "lodash.js",
            "sort": "node_modules"
        },
        "bcrypt": {
            "path": "bcrypt.js",
            "sort": "node_modules"
        },
        "moment": {
            "path": "moment.js",
            "sort": "node_modules"
        },
        "uuid": {
            "path": "uuid.js",
            "sort": "node_modules"
        },
        "yup": {
            "path": "yup.js",
            "sort": "node_modules"
        },
        "socket.io": {
            "path": "socket.io.js",
            "sort": "node_modules"
        },
        "underscore": {
            "path": "underscore.js",
            "sort": "node_modules"
        },
        "ramda": {
            "path": "ramda.js",
            "sort": "node_modules"
        },
        "validator": {
            "path": "validator.js",
            "sort": "node_modules"
        },
        "axios": {
            "path": "axios.js",
            "sort": "node_modules"
        },
        "dayjs": {
            "path": "dayjs.js",
            "sort": "node_modules"
        },
        "date-fsn": {
            "path": "date-fsn.js",
            "sort": "node_modules"
        },
        "sodium": {
            "path": "sodium.js",
            "sort": "node_modules"
        },
        "deep-equal": {
            "path": "deep-equal.js"
        },
        "faker": {
            "path": "faker.js"
        }
    }
}