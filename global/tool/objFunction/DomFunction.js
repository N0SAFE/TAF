// #region getElement
export const get = function get(selector) {
    return document.querySelector(selector);
}
export const getAll = function getAll(selector) {
    return document.querySelectorAll(selector);
}
export const getById = function getById(id) {
    return document.getElementById(id);
}
export const getByClass = function getByClass(className) {
    return document.getElementsByClassName(className);
}
export const getByTag = function getByTag(tagName) {
    return document.getElementsByTagName(tagName);
}
export const getByName = function getByName(name) {
    return document.getElementsByName(name);
}

// #endregion createElement

// #region get, set, remove, event
export const getStyle = function getStyle(element) {
    return element.getComputedStyle(element);
}
export const setStyle = function setStyle(styles, element) {
    Object.assign(element.style, styles);
}
export const getAttribute = function getAttribute(element, attribute) {
    return element.getAttribute(attribute);
}
export const setAttribute = function setAttribute(element, attribute, value) {
    element.setAttribute(attribute, value);
}
export const removeAttribute = function removeAttribute(element, attribute) {
    element.removeAttribute(attribute);
}
export const remove = function remove(element) {
    element.remove();
}
export const add = function add(element, parent) {
    parent.appendChild(elemennt);
}
export const addEvent = function addEvent(element, event, callback) {
    element.addEventListener(event, callback);
}
export const addClass = function addClass(element, className) {
    element.classList.add(className);
}
export const removeChild = function removeChild(element) {
    element.removeChild(element);
}

// #endregion get, set, remove, event

// #region createElement
export const create = function create(tagName) {
    return document.createElement(tagName);
}
export const createText = function createText(text) {
    return document.createTextNode(text);
}
export const createComment = function createComment(text) {
    return document.createComment(text);
}
export const createDocumentFragment = function createDocumentFragment() {
    return document.createDocumentFragment();
}
export const createAttribute = function createAttribute(name) {
    return document.createAttribute(name);
}
export const createAttributeNS = function createAttributeNS(namespace, name) {
    return document.createAttributeNS(namespace, name);
}
export const createEvent = function createEvent(name) {
    return document.createEvent(name);
}
export const createRange = function createRange() {
    return document.createRange();
}
export const createNodeIterator = function createNodeIterator(root, whatToShow, filter) {
    return document.createNodeIterator(root, whatToShow, filter);
}
export const createTreeWalker = function createTreeWalker(root, whatToShow, filter) {
    return document.createTreeWalker(root, whatToShow, filter);
}
export const createEventListener = function createEventListener(type, listener, useCapture) {
    return document.addEventListener(type, listener, useCapture);
}

// #endregion createElement

// #region custom function
export const getDomPath = function getDomPath(el, param = {}) {
    param.getAttribute = param.getAttribute == true
    var stack = [];
    while (el.parentNode != null) {
        var sibCount = 0;
        var sibIndex = 0;
        for (var i = 0; i < el.parentNode.childNodes.length; i++) {
            var sib = el.parentNode.childNodes[i];
            if (sib.nodeName == el.nodeName) {
                if (sib === el) {
                    sibIndex = sibCount;
                }
                sibCount++;
            }
        }
        if (param.getAttribute) {
            if (el.hasAttribute('id') && el.id != '') {
                stack.unshift(el.nodeName.toLowerCase() + '#' + el.id);
            } else if (sibCount > 1) {
                stack.unshift(el.nodeName.toLowerCase() + ':eq(' + sibIndex + ')');
            } else {
                stack.unshift(el.nodeName.toLowerCase());
            }
        } else {
            stack.unshift(el)
        }

        el = el.parentNode;
    }

    return stack.slice(1); // removes the html element
}

// typeElement = "string" || "node"
export const createNewList = function createNewList(arrayListElement, typeElement = "string") {
    let list = document.createElement('ul');
    if (typeElement == "string") {
        arrayListElement.forEach(element => {
            list.innerHTML += `<li>${element}</li>`
        })
    } else if (typeElement == "node") {
        arrayListElement.forEach(element => {
            list.appendChild(element)
        })
    }
    return list
}

export const searchDataset = function searchDataset(dataset, elseValue) {
    if (dataset != undefined && dataset != "") {
        return dataset
    }
    return elseValue
}

export const insertAfter = function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
export const insertBefore = function insertBefore(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode);
}

export const getParentByClass = function getParentByClass(element, className) {
    let parent = element.parentElement;
    if (parent == undefined) {
        return null
    } else if (parent.classList.contains(className)) {
        return parent
    } else {
        return this.getParentByClass(parent, className)
    }
}

export const getParentByTag = function getParentByTag(element, tagName) {
    let parent = element.parentElement;
    if (parent.tagName.toLowerCase() == tagName.toLowerCase()) {
        return parent
    } else if (parent == undefined)
        return null
    else {
        return this.getParentByTag(parent, tagName)
    }
}

export const getParentByAttributeKey = function getParentByAttributeKey(element, attribute, value) {
    let parent = element.parentElement;
    if (parent.getAttribute(attribute) != undefined) {
        return parent
    } else if (parent == undefined)
        return null
    else {
        return this.getParentByAttribute(parent, attribute, value)
    }
}

export const getParentByAttributeValue = function getParentByAttributeValue(element, attribute, value) {
    let parent = element.parentElement;
    if (parent.getAttribute(attribute) == value) {
        return parent
    } else if (parent == undefined)
        return null
    else {
        return this.getParentByAttributeValue(parent, attribute, value)
    }
}

export const getChildByClass = function getChildByClass(element, className, retList = []) {
    let childs = element.children;
    Array.from(childs).forEach(element => {
        if (element.classList.contains(className)) {
            retList.push(element)
        }
        this.getChildByClass(element, className, retList)
    });
    return retList
}

export const getChildByTag = function getChildByTag(element, tagName, retList = []) {
    let childs = element.children;
    Array.from(childs).forEach(element => {
        if (element.tagName.toLowerCase() == tagName.toLowerCase()) {
            retList.push(element)
        }
        this.getChildByTag(element, tagName, retList)
    });
    return retList
}