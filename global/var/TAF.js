import scriptLoader from "../tool/loader/scriptLoader.js"
import * as util from "../tool/util/util.js"
import importParser from "../tool/util/parser.js"
import styleLoader from "../tool/loader/styleLoader.js"
import srcLoader from "../tool/loader/srcLoader.js"
import string_class from "../association/string-class.js"
import int_class from "../association/int-class.js"
import ajax from "../tooL/ajax/index.js"
import * as ajaxModule from "../tool/ajax/index.js"
import prototypeModifier from "../tool/prototype.modifier.js"
import HTTP from "../association/http.js"
import cacheManager from "../tool/manager/cacheManager.js"
import promiseManager from "../tool/manager/promiseManager.js"
import * as elementManager from "../tool/manager/elementManager.js"
import windowManager from "../tool/manager/windowManager.js"
import PrefixManager from "../tool/manager/prefixManager.js"
import * as error from "../tool/error/error.js"
import dev from "../tool/dev/app.js"
import * as logic from "../tool/logic/logic.js"
import * as assert from "../tool/util/assert.js"

import packageProject from "../package/package.project.js"
import packageTAF from "../package/package.TAF.js"
import packageRequire from "../package/package.require.js"
import src from "../package/src.js"

import * as ArrayFunction from "../tool/objFunction/ArrayFunction.js"
import * as ObjectFunction from "../tool/objFunction/ObjectFunction.js"
import * as DomFunction from "../tool/objFunction/DomFunction.js"

import customVerification from "../tool/verification/customVerification.js"
import regexVerification from "../tool/verification/regexVerification.js"
import typeVerification from "../tool/verification/typeVerification.js"

import ARGS from "../tool/io/ARGS.js"
import EXPORT from "../tool/io/EXPORT.js"
import IMPORT from "../tool/io/IMPORT.js"

/* It's creating a new class called TAF that is the global var for the TAF module. */
export default new class TAF {
    io = new class extends util.Container {
        IMPORT = new IMPORT(this)

        EXPORT = new EXPORT(this)

        ARGS = new ARGS(this)

    }(this)

    module = new class extends util.Container {
        loader = new class extends util.Container {
            constructor(parent) {
                super(parent)
            }
            script = scriptLoader
            style = styleLoader
            src = srcLoader
        }(this)

        manager = new class extends util.Container {
            constructor(parent) {
                super(parent)
            }
            promise = promiseManager
            cache = cacheManager
            window = windowManager
            element = elementManager
            prefix = PrefixManager
        }(this)

        function = new class extends util.Container {
            constructor(parent) {
                super(parent)
            }
            array = ArrayFunction
            object = ObjectFunction
            dom = DomFunction
        }(this)

        verification = new class extends util.Container {
            constructor(parent) {
                super(parent)
            }
            custom = customVerification
            regex = regexVerification
            type = typeVerification
        }(this)

        util = {
            ...util,
            parser: importParser,
            assert: assert
        }

        ajaxModule = ajaxModule
        ajax = ajax
        prototypeModifier = prototypeModifier
        logic = logic
        error = error
        dev = dev
    }(this)

    json = new class extends util.Container {
        loader = new class extends util.Container {
            packageProject = packageProject
            packageTAF = packageTAF
            packageRequire = packageRequire
            src = src
        }(this)
    }(this)

    association = new class extends util.Container {
        constructor(parent) {
            super(parent)
        }
        string_class = string_class
        int_class = int_class
        http = HTTP
    }(this)

    /**
     * `addTAFVar` is a function that adds a value to the `global.TAF` object at a specifique location.
     * @param array - The array to add the value to.
     * @param value - The value to be added to the array
     */
    addTAFVar(array, value) { return util.addInObject(this, array, value) }
}