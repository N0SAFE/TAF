import * as util from "../util/util.js"

export default class superIo extends util.Container {
    val = {}
    get(url) {
        return this.val[url]
    }

    set(url, val) {
        this.val[url] = val
        return this
    }
}(this)