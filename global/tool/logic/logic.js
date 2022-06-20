import Logic, * as logic from "./class.js"


export default new class MiniKernel {
    /**
     * It returns a new instance of the logic.Gate class
     * @returns A new instance of the logic.Gate class.
     */
    Gate() { return new logic.Gate(...arguments) }

    /**
     * It returns a new instance of the logic.CompareClass class
     * @returns A new instance of the logic.CompareClass.
     */
    Compare() { return new logic.Compare(...arguments) }

    Super = Logic
}


/**
 * It returns a new instance of the Not class from the logic module
 * @returns A new instance of the Not class.
 */
export const Not = function Not() { return new logic.Not(...arguments) }

/**
 * It returns a new instance of the logic.Buffer class
 * @returns A new instance of the Buffer class.
 */
export const Buffer = function Buffer() { return new logic.Buffer(...arguments) }

/**
 * It returns a new instance of the And class from the logic module
 * @returns A new instance of the And class.
 */
export const And = function And() { return new logic.And(...arguments) }

/**
 * It returns a new instance of the Or class, which is a class that is defined in the logic module
 * @returns A new instance of the Or class.
 */
export const Or = function Or() { return new logic.Or(...arguments) }

/**
 * It returns a new instance of the `logic.Val` class
 * @returns A new instance of the Val class.
 */
export const Val = function Val() { return new logic.Val(...arguments) }

export const Compare = new class Compare {
    /**
     * It returns a new instance of the logic.Equal class
     * @returns A new instance of the logic.Equal class.
     */
    Equal() { return new logic.Equal(...arguments) }

    /**
     * If the arguments are not different, return true
     * @returns A new instance of the logic.Different class.
     */
    Different() { return new logic.Different(...arguments) }

    /**
     * If the arguments are not contains, return true
     * @returns A new instance of the logic.Contains class.
     */
    Contains() { return new logic.Contains(...arguments) }

    // TODO : add the between compare method
}