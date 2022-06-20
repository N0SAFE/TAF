export default {
    "creation": {
        "__description__": "",
        "__utility__": "",
        "linkModify": {
            "__description__": "",
            "__utility__": "",
            "__author__": "",
            "__maintainer__": "",
            "__contact__": "",
            "__repo__": {
                "path": "./creation/linkModify.js",
                "sort": "creation-link"
            }
        },
        "window": {
            "__description__": "",
            "__utility__": "",
            "__author__": "",
            "__maintainer__": "",
            "__contact__": "",
            "__repo__": {
                "path": "./creation/window/windowManager.js",
                "sort": "creation-window",
                "require": [
                    { "script": "function", "use": ["dirname"] },
                    { "script": "manager/element", "use": ["creator"] },
                    { "script": "./onclickTab.js", "use": ["default"] }
                ]
            }
        },
        "page": {
            "__description__": "",
            "__utility__": "",
            "__author__": "",
            "__maintainer__": "",
            "__contact__": "",
            "__repo__": {
                "path": "./creation/window/pages/PageManager.js",
                "sort": "creation-page",
                "require": [
                    { "script": "./../Scene/assets/js/index.js", "use": ["reloadA"] },
                    { "script": "n0safe/urlParser", "use": ["default"] }
                ]
            }
        }
    },
    "test": {
        "other": {
            "__repo__": {
                "path": "./index.js",
                "require": [
                    { "script": "./other.js", "use": true }
                ]
            }
        }
    }
}