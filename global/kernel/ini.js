import "../../tool/node_modules/sodium.js"
import TAF from "../var/TAF.js"
import prototypeModifier from "../tool/prototype.modifier.js"

window.TAF = TAF

/**
 * @param {object} params <scriptLoader:Object<baseLocation:string>, requireScript:Array<string>, iniLoadScript:Array<string>>
 * @returns {object} <debugTool, devTool, modulesLoad, modulesLoadAssocName>
 */
export default async function setApp(params = { baseLocation: { ajax: "", script: "" }, requireScript: [], iniLoadScript: [], dev: false, tafDeep: "", cache: true }) {

    // set the stack limit off the error handler to infinity
    Error.stackTraceLimit = Infinity

    let metaScript =
        import.meta.url

    let startTime = performance.now();

    // #region require the scriptLoader object

    // set the setApp into the global var
    window.setApp = setApp
    window.elmtCreator = TAF.module.manager.element.creator
    window.scriptLoader = TAF.module.loader.script
    window.styleLoader = TAF.module.loader.style
    window.srcLoader = TAF.module.loader.src
    window.autoFunction = TAF.module.util.autoFunction
    window.http = TAF.module.http
    window.TAF = TAF
    window.ajax = TAF.module.ajax

    let TafBaseLocation = new URL(metaScript + "/../../../").href
    let TafProjectBaseLocation
    if (typeof params.projectLocation == "string" && TAF.module.util.isValidURL(params.projectLocation)) {
        TafProjectBaseLocation = params.projectLocation
    } else {
        if (TAF.module.util.isValidURL(params.projectLocation) && params.projectLocation) {
            console.error("the projectLocation is not a string")
        }
        TafProjectBaseLocation = new URL(metaScript + "/../../../../").href
    }
    let origin = new URL(metaScript).origin

    TAF.addTAFVar(["info", "baseLocation"], TafBaseLocation)
    TAF.addTAFVar(["info", "projectBaseLocation"], TafProjectBaseLocation)
    TAF.addTAFVar(["info", "origin"], origin + "/")
    TAF.addTAFVar(["info", "globalLocation"], TafBaseLocation + "global/")
    TAF.addTAFVar(["info", "libLocation"], TAF.info.baseLocation + "lib/")
    TAF.addTAFVar(["info", "packageLocation"], TAF.info.globalLocation + "package/")
    TAF.addTAFVar(["info", "parserLocation"], TAF.info.globalLocation + "lib/parser/")
    TAF.addTAFVar(["info", "utilLocation"], TAF.info.globalLocation + "tool/util/")
    TAF.addTAFVar(["info", "devLocation"], TAF.info.globalLocation + "tool/dev/")
    TAF.addTAFVar(["info", "errorLocation"], TAF.info.globalLocation + "tool/error/")

    TAF.module.util.multiCall(TAF.addTAFVar.bind(TAF), [
        [
            ["info", "ajaxBaseLocation"], TAF.module.util.searchInObject(params, ["baseLocation", "ajax"]) || ""
        ],
        [
            ["info", "scriptBaseLocation"], TAF.module.util.searchInObject(params, ["baseLocation", "script"]) || ""
        ],
        [
            ["info", "dirName"], TafBaseLocation.split("/").slice(-2)[0]
        ]
    ])

    // set the TAF property of scriptLoader (getParams, setParams, PARAMS and prefixManager)
    TAF.module.loader.script.ini()
    TAF.module.util.parser.ini()
    TAF.module.ajaxModule.ini()

    // let localLoad = [
    //     "loader/script",
    //     "loader/style",
    //     "loader/src",
    //     "prototype/modifier",
    //     "Error",
    //     "function"
    // ]

    // #endregion require the scriptLoader object

    // // #region verification
    // params = params || { baseLocation: { ajax: "", script: "" }, requireScript: [], iniLoadScript: [] }
    // params.baseLocation = params.baseLocation || {}
    // params.baseLocation.ajax = params.baseLocation.ajax || ""
    // params.baseLocation.script = params.baseLocation.script || ""
    // params.requireScript = params.requireScript || []
    // params.iniLoadScript = params.iniLoadScript || []
    // params.dev = params.dev || false
    // params.tafDeep = params.tafDeep || ""

    // if (params.projectLocation)
    //     try {
    //         params.projectLocation = new URL(params.projectLocation).href
    //     } catch {
    //         throw new Error("the projectLocation have to be a valid url")
    //     }

    // // verify if params is an object
    // if (typeof params != "object") {
    //     throw new Error("params must be an object")
    // }

    // // verify if params.scriptLoader is an object
    // if (typeof params.baseLocation != "object") {
    //     throw new Error("params.scriptLoader must be an object")
    // }

    // // verify if params.scriptLoader.baseLocation is a string
    // if (typeof params.baseLocation.ajax != "string" || typeof params.baseLocation.script != "string") {
    //     throw new Error("params.baseLocation.ajax and params.baseLocation.script must be a string")
    // }

    // // verify if params.requireScript is an array
    // if (!Array.isArray(params.requireScript)) {
    //     throw new Error("params.requireScript must be an array")
    // }

    // // verify if params.requireScript is an array of string or an array of array of string
    // for (var requireScript of params.requireScript) {
    //     if (typeof requireScript != "string" && Array.isArray(requireScript)) {
    //         for (var requireScriptItem of requireScript) {
    //             if (typeof requireScriptItem != "string") {
    //                 throw new Error("params.requireScript must be an array of string or an array of array of string")
    //             }
    //         }
    //     } else if (typeof requireScript != "string" && !Array.isArray(requireScript)) {
    //         throw new Error("params.requireScript must be an array of string or an array of array of string")
    //     }
    // }

    // // verify if params.iniLoadScript is an array of string
    // for (let i of params.iniLoadScript) {
    //     if (typeof i != "string") {
    //         throw new Error("params.iniLoadScript must be an array of string")
    //     }
    // }

    // // verify if params is an object
    // if (typeof params.dev != "boolean") {
    //     throw new Error("params.dev must be a boolean")
    // }

    // if (params.cache != false) {
    //     params.cache = true
    // }

    // // #endregion verification

    if (params.cache == false) {
        TAF.module.manager.cache.clear()
        TAF.module.manager.cache.cache = false
    }

    // #region set global variable and set prototype/modifier

    TAF.module.loader.script.parseJson(TAF.json.loader.packageTAF, TAF.info.baseLocation + "tool/");
    TAF.module.loader.script.parseJson(TAF.json.loader.packageProject, TAF.info.projectBaseLocation, "LOCAL");

    // set the default name util to the location of the util module
    TAF.module.loader.script.property.addPackage({
        sort: "default",
        path: TAF.info.utilLocation + "util.js",
        name: "util"
    })

    styleLoader.load('/global/style/style.css')

    // #endregion set global variable

    // #region scriptLoader

    // ! prototype/modifier must be load in first and with scriptLoader.load and not .loads (the asyncForEach is used in scriptLoader.loads function)
    await prototypeModifier.ini();
    await TAF.module.loader.script.array.load(["n0safe/manager/event"]);
    TAF.addTAFVar(["module", "eventManager"], TAF.module.loader.script.call({ module: "n0safe/manager/event", property: "default" }))



    let arrayStackFrame = TAF.module.error.ErrorStackParser.parse(new Error())
    let StackFrame = arrayStackFrame[arrayStackFrame.length - 1]
    if (StackFrame.getFileName()) {
        StackFrame.setFileName(StackFrame.getFileName().substring(0, 5) == "async" ? StackFrame.getFileName().substring(5).trim() : StackFrame.getFileName())
    }
    TAF.addTAFVar(["info", "firstFileLocation"], StackFrame.getFileName())

    if (params.dev) TAF.module.dev.on()

    // #endregion scriptLoader

    // #region load module requested by user

    // console.log(params)
    let modulesLoad = await TAF.module.loader.script.array.load(...[...(params.requireScript || []).map(function(array) { return [array] }), ...TAF.json.loader.packageRequire.map(function(array) { return [array] })])

    // #endregion load module requested by user

    delete window.setApp

    console.log("%c%s", "color: #2bb7df; font-size: 15px;", "the setBuild function end up in " + (performance.now() - startTime) + "ms")

    // #region return

    return modulesLoad

    // #endregion return
}

window.setApp = setApp