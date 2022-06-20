export function serialize(obj) {
    let formData
    if (this) {
        formData = this
    } else {
        formData = new FormData()
    }


    if (Array.isArray(obj)) {
        recursiveSetFormData({
            array: obj
        }).flat(Infinity).map(function(item, index) {
            return {
                key: item.key.replace("array", index),
                val: item.val
            }
        })
    }

    for (let { key, val }
        of recursiveSetFormData(obj).flat(Infinity)) {
        formData.append(key, val)
    }
    return formData
}

function recursiveSetFormData(obj, deep = 0, str = "") {
    if (deep == 0) {
        return Object.entries(obj).map(function([key, val]) {
            return recursiveSetFormData(val, deep + 1, `${key}`)
        })
    }
    if (Array.isArray(obj)) {
        return obj.map(function(item) {
            return recursiveSetFormData(item, deep + 1, str + "[]")
        })
    } else if (obj instanceof Object) {
        return Object.entries(obj).map(function([key, val]) {
            return recursiveSetFormData(val, deep + 1, str + `[${key}]`)
        })
    } else {
        return {
            key: str,
            val: obj
        }
    }
}