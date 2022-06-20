/**
 * It takes an array as an argument and returns a new array with all the duplicate values removed.
 * @param array - the array to be processed
 * @returns An array with unique values.
 */
export const array_unique = function array_unique(array) {
    // verify if the array is a array
    if (!Array.isArray(array)) {
        console.error("the argument must be the type of array")
        return false
    }

    // process
    return [...new Set(array)]
}

/**
 * It returns an array of values that are in both array1 and array2.
 * @param array1 - The first array.
 * @param array2 - The array to compare values against.
 * @returns the array1.filter(value => array2.includes(value))
 */
export const array_intersect = function array_intersect(array1, array2) {
    // verify if the array is a array
    if (!Array.isArray(array1) || !Array.isArray(array2)) {
        console.error("the argument must be the type of array")
        return false
    }

    // process
    return array1.filter(value => array2.includes(value))
}

/**
 * It takes two arrays as arguments and returns a new array containing all the values from the first
 * array that are not present in the second array.
 * @param array1 - the array to be compared
 * @param array2 - The array to compare against
 * @returns the array1.filter(value => !array2.includes(value))
 */
export const array_diff = function array_diff(array1, array2) {
    // verify if the array is a array
    if (!Array.isArray(array1) || !Array.isArray(array2)) {
        console.error("the argument must be the type of array")
        return false
    }

    // process
    return array1.filter(value => !array2.includes(value))
}

/**
 * It takes two arrays and returns a new array that is the combination of the two arrays.
 * @param array1 - the first array to be merged
 * @param array2 - The array to merge.
 * @returns the merged array.
 */
export const array_merge = function array_merge(array1, array2) {
    // verify if the array is a array
    if (!Array.isArray(array1) || !Array.isArray(array2)) {
        console.error("the argument must be the type of array")
        return false
    }

    // process
    return [...array1, ...array2]
}

/**
 * It takes an array and returns a new array with all the elements of the original array and all the
 * elements of all the sub-arrays of the original array.
 * 
 * Here's a more detailed explanation:
 * 
 * The function takes an array as an argument. It then checks if the argument is an array. If it isn't,
 * it returns false. If it is, it uses the reduce method to create a new array. The reduce method takes
 * a callback function as an argument. The callback function takes two arguments: the accumulator and
 * the current value. The accumulator is the value that is returned by the callback function. The
 * current value is the value that is currently being processed. The reduce method also takes an
 * initial value for the accumulator. In this case, the initial value is an empty array.
 * 
 * The callback function checks if the current value is an array. If it is, it calls the array_flatten
 * @param {Array} array - the array to be flattened
 * @returns the array flattened.
 */
export const array_flatten = function array_flatten(array) {
    // verify if the array is a array
    if (!Array.isArray(array)) {
        console.error("the argument must be the type of array")
        return false
    }

    // process
    return array.reduce((acc, cur) => {
        if (Array.isArray(cur)) {
            return acc.concat(array_flatten(cur))
        } else {
            return acc.concat(cur)
        }
    }, [])
}

/**
 * It takes an array and a number, and returns an array of arrays, each of which has a length of the
 * number.
 * @param array - the array to be processed
 * @param size - The size of each chunk
 * @returns An array of arrays.
 */
export const array_chunk = function array_chunk(array, size) {
    // verify if the array is a array
    if (!Array.isArray(array)) {
        console.error("the argument must be the type of array")
        return false
    }

    // verify if the size is a number
    if (typeof size !== "number") {
        console.error("the size must be a number")
        return false
    }

    // process
    return array.reduce((acc, cur, index) => {
        if (index % size === 0) {
            acc.push([cur])
        } else {
            acc[acc.length - 1].push(cur)
        }
        return acc
    }, [])
}

/**
 * It takes an array of arrays and returns an array of the values of the specified column
 * @param array - The array to be processed.
 * @param column - The column name or index.
 * @returns the array with the column specified.
 */
export const array_column = function array_column(array, column) {
    // verify if the array is a array
    if (!Array.isArray(array)) {
        console.error("the argument must be the type of array")
        return false
    }

    // verify if the column is a number
    if (typeof column !== "number") {
        console.error("the column must be a number")
        return false
    }

    // process
    return array.map(value => value[column])
}

/**
 * It takes an array, a size, and a value, and returns a new array with the value padded to the size.
 * @param array - The input array.
 * @param size - The size of the array to be returned.
 * @param value - The value to pad if the array is less than size.
 * @returns an array.
 */
export const array_pad = function array_pad(array, size, value) {
    // verify if the array is a array
    if (!Array.isArray(array)) {
        console.error("the argument must be the type of array")
        return false
    }

    // verify if the size is a number
    if (typeof size !== "number") {
        console.error("the size must be a number")
        return false
    }

    // process
    if (size > 0) {
        return [...array, ...Array(size).fill(value)]
    } else {
        return [...Array(Math.abs(size)).fill(value), ...array]
    }
}

/**
 * It takes an array, a search value, and a replace value, and returns a new array with all instances
 * of the search value replaced with the replace value.
 * 
 * Here's a more detailed explanation:
 * 
 * The function takes three arguments: an array, a search value, and a replace value.
 * 
 * The first thing the function does is check to see if the first argument is an array. If it isn't, it
 * logs an error to the console and returns false.
 * 
 * If the first argument is an array, the function uses the map() method to create a new array. The
 * map() method calls a callback function on each element in the array. The callback function returns
 * the replace value if the current element is equal to the search value, and returns the current
 * element if it isn't.
 * 
 * Here's an example of the function in action:
 * 
 * @param array - the array to be processed
 * @param search - the value to be replaced
 * @param replace - the value to replace the search value with
 * @returns the array with the replaced values.
 */
export const array_replace = function array_replace(array, search, replace) {
    // verify if the array is a array
    if (!Array.isArray(array)) {
        console.error("the argument must be the type of array")
        return false
    }

    // process
    return array.map(value => value === search ? replace : value)
}

/**
 * It reverses an array.
 * @param array - the array to be reversed
 * @returns The array is being reversed.
 */
export const array_reverse = function array_reverse(array) {
    // verify if the array is a array
    if (!Array.isArray(array)) {
        console.error("the argument must be the type of array")
        return false
    }

    // process
    return array.reverse()
}

/**
 * It takes an array, a start index, and an end index, and returns a new array containing the elements
 * from the start index to the end index.
 * @param array - the array to be sliced
 * @param start - The index at which to begin the selection. If negative, it is treated as length+start
 * where length is the length of the array (for example, if start is -3 it is treated as length-3).
 * @param end - The end index of the array.
 * @returns the sliced array.
 */
export const array_slice = function array_slice(array, start, end) {
    // verify if the array is a array
    if (!Array.isArray(array)) {
        console.error("the argument must be the type of array")
        return false
    }

    // verify if the start is a number
    if (typeof start !== "number") {
        console.error("the start must be a number")
        return false
    }

    // verify if the end is a number
    if (typeof end !== "number") {
        console.error("the end must be a number")
        return false
    }

    // process
    return array.slice(start, end)
}

/**
 * It takes an array, a start index, a delete count, and any number of items to insert, and returns the
 * deleted items.
 * @param array - the array to be spliced
 * @param start - The index where to start changing the array.
 * @param deleteCount - The number of elements to remove.
 * @param items - The elements to add to the array, beginning at the start index. If you don't specify
 * any elements, splice() will only remove elements from the array.
 * @returns The spliced array.
 */
export const array_splice = function array_splice(array, start, deleteCount, ...items) {
    // verify if the array is a array
    if (!Array.isArray(array)) {
        console.error("the argument must be the type of array")
        return false
    }

    // verify if the start is a number
    if (typeof start !== "number") {
        console.error("the start must be a number")
        return false
    }

    // verify if the deleteCount is a number
    if (typeof deleteCount !== "number") {
        console.error("the deleteCount must be a number")
        return false
    }

    // process
    return array.splice(start, deleteCount, ...items)
}

/**
 * It returns true if at least one of the elements in the array passes the test implemented by the
 * provided function
 * @param array - the array to be processed
 * @param callback - The callback function to be executed on each element of the array.
 * @returns the result of the array.some() method.
 */
export const array_some_of_content = function array_some_of_content(array, callback) {
    // verify if the array is a array
    if (!Array.isArray(array)) {
        console.error("the argument must be the type of array")
        return false
    }

    // verify if the callback is a function
    if (typeof callback !== "function") {
        console.error("the callback must be a function")
        return false
    }

    // process
    return array.some(callback)
}

/**
 * It takes an array of numbers and returns the sum of all the numbers in the array.
 * @param {Array<int>} array - the array to be processed
 * @returns {int} The sum of the array.
 */
export const array_sum = function array_sum(array) {
    // verify if the array is a array
    if (!Array.isArray(array)) {
        console.error("the argument must be the type of array")
        return false
    }

    // verify if array is just of numbers
    if (array.some(value => typeof value !== "number")) {
        console.error("the array must be just of number")
        return false
    }

    // process
    return array.reduce((acc, cur) => acc + cur, 0)
}

/**
 * It takes an array of objects, and returns a new array of objects with only unique objects.
 * 
 * Here's a more detailed explanation:
 * 
 * The function takes an array of objects as an argument. It then uses the Set object to remove
 * duplicate objects from the array. The Set object only allows unique values, so when you pass it an
 * array, it will only keep the unique values from that array.
 * 
 * The Set object, however, only works on primitive values, so you have to convert the objects to
 * strings. You can do this with the JSON.stringify() method.
 * 
 * Once you have a Set object with only unique objects, you can convert it back to an array with the
 * spread operator.
 * 
 * Finally, you have to convert the strings back to objects. You can do this with the JSON.parse()
 * method.
 * 
 * Here's an example of the function in action:
 * @param array - the array to be processed
 * @returns An array of unique objects.
 */
export const array_unique_object = function array_unique_object(array) {
    // verify if the array is a array
    if (!Array.isArray(array)) {
        console.error("the argument must be the type of array")
        return false
    }

    // process
    return [...new Set(array.map(value => JSON.stringify(value)))].map(value => JSON.parse(value))
}

/**
 * It takes an array as an argument and returns a new array with all the duplicate values removed.
 * @param array - the array to be processed
 * @returns An array of unique values.
 */
export const array_unique_value = function array_unique_value(array) {
    // verify if the array is a array
    if (!Array.isArray(array)) {
        console.error("the argument must be the type of array")
        return false
    }

    // process
    return [...new Set(array)]
}

/**
 * It returns the values of an array.
 * @param array - the array to process
 * @returns The values of the array.
 */
export const array_values = function array_values(array) {
    // verify if the array is a array
    if (!Array.isArray(array)) {
        console.error("the argument must be the type of array")
        return false
    }

    // process
    return Object.values(array)
}

/**
 * It returns the keys of an array.
 * @param array - the array to process
 * @returns The keys of the array.
 */
export const array_keys = function array_keys(array) {
    // verify if the array is a array
    if (!Array.isArray(array)) {
        console.error("the argument must be the type of array")
        return false
    }

    // process
    return Object.keys(array)
}

/**
 * It returns an array of arrays, each of which contains the index and value of the original array
 * @param array - the array to be processed
 * @returns An array of arrays.
 */
export const array_entries = function array_entries(array) {
    // verify if the array is a array
    if (!Array.isArray(array)) {
        console.error("the argument must be the type of array")
        return false
    }

    // process
    return Object.entries(array)
}

/**
 * Verify if the array is a array and if the callback is a function, then process.
 * @param array - The array to walk through.
 * @param callback - The callback function to use.
 * @returns the value of the callback function.
 */
export const array_walk = function array_walk(array, callback) {
    // verify if the array is a array
    if (!Array.isArray(array)) {
        console.error("the argument must be the type of array")
        return false
    }

    // verify if the callback is a function
    if (typeof callback !== "function") {
        console.error("the callback must be a function")
        return false
    }

    // process
    array.forEach(value => callback(value))
}

/**
 * It takes an array, a callback function, and any number of arguments, and then calls the callback
 * function on each element of the array, and if the element is an array, it calls the callback
 * function on each element of that array, and so on
 * @param array - the array to be processed
 * @param callback - The callback function to run for each element in the array.
 * @param args - the arguments that will be passed to the callback function
 * @returns The function is being returned.
 */
export const array_walk_recursive = function array_walk_recursive(array, callback, ...args) {
    // verify if the array is a array
    if (!Array.isArray(array)) {
        console.error("the argument must be the type of array")
        return false
    }

    // verify if the callback is a function
    if (typeof callback !== "function") {
        console.error("the callback must be a function")
        return false
    }

    // process
    array.forEach(value => {
        if (Array.isArray(value)) {
            array_walk_recursive(value, callback)
        } else {
            callback(...args)
        }
    })
}

/**
 * It takes a value and a list of values, and returns true if the value is in the list of values.
 * @param toTest - The value to test
 * @param args - The array of arguments to check against.
 * @returns A function that takes two arguments.
 */
export const isInArray = function isInArray(toTest, args) {
    // verify if the args is a array
    if (!Array.isArray(args)) {
        args = [args]
    }

    for (let arg of args) {
        if (toTest === arg)
            return true
    }
    return false
}

/**
 * It checks if the two arrays are equal by comparing their length and then comparing each element of
 * the array.
 * @param array - the array to be compared
 * @param arrayToCompare - The array to compare with the array.
 * @returns The function isEqual is being returned.
 */
export const isEqual = function isEqual(array, arrayToCompare) {
        // verify if the array is a array
        if (!Array.isArray(array)) {
            console.error("the first argument must be the type of array")
            return false;
        }

        // verify if the array to compare is a array
        if (!Array.isArray(arrayToCompare)) {
            console.error("the second argument must be the type of array")
            return false;
        }

        // verify if the array length is equal
        if (array.length !== arrayToCompare.length) {
            return false;
        }

        // verify if the array is equal
        for (let i = 0; i < array.length; i++) {
            if (array[i] !== arrayToCompare[i]) {
                return false;
            }
        }

        return true;
    }
    /**
     * It counts the number of times a number appears in an array.
     * @param array - the array to search in
     * @param element - The element to count in the array.
     * @returns the number of times the element is found in the array.
     */

export const countOccurrences = function countOccurrences(array, element) {
    // verify if the array is a array
    if (!Array.isArray(array)) {
        console.error("the first argument must be the type of array")
        return false
    }

    // verify if the element is a number
    if (typeof element !== "number") {
        console.error("the second argument must be the type of number")
        return false
    }

    let count = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] === element) {
            count++;
        }
    }

    return count;
}

/**
 * It loops through the array, and if the index of the element is not equal to the current index, it
 * pushes the element to the duplicates array
 * @param array - the array that you want to find the duplicates
 * @returns the duplicates in the array.
 */
export const getDuplicates = function getDuplicates(array) {
    // verify if the array is a array
    if (!Array.isArray(array)) {
        console.error("the first argument must be the type of array")
        return false
    }

    let duplicates = [];

    for (let i = 0; i < array.length; i++) {
        let element = array[i];
        let index = array.indexOf(element);

        if (index !== -1 && index !== i) {
            duplicates.push(element);
        }
    }
    return duplicates;
}

/**
 * It sorts an array using either radix or bubble sort, and it can sort the array in ascending or
 * descending order
 * @param array - the array to sort
 * @param [sortWith=radix] - the type of sort you want to use, either radix or bubble
 * @param [sortType=asc] - "asc" or "desc"
 * @returns the sorted array.
 */
export const arraySort = function arraySort(array, sortWith = "radix", sortType = "asc") {
    const radixSort = arr => {
        const getNum = (num, index) => {
            const strNum = String(num);
            let end = strNum.length - 1;
            const foundNum = strNum[end - index];

            if (foundNum === undefined) return 0;
            else return foundNum;
        };

        const largestNum = arr => {
            let largest = "0";

            arr.forEach(num => {
                const strNum = String(num);

                if (strNum.length > largest.length) largest = strNum;
            });

            return largest.length;
        };
        let maxLength = largestNum(arr);

        for (let i = 0; i < maxLength; i++) {
            let buckets = Array.from({ length: 10 }, () => []);

            for (let j = 0; j < arr.length; j++) {
                let num = getNum(arr[j], i);

                if (num !== undefined) buckets[num].push(arr[j]);
            };
            arr = buckets.flat();
        };
        return arr;
    };

    const bubbleSort = (inputArr) => {
        let len = inputArr.length;
        let swapped;
        do {
            swapped = false;
            for (let i = 0; i < len; i++) {
                if (inputArr[i] > inputArr[i + 1]) {
                    let tmp = inputArr[i];
                    inputArr[i] = inputArr[i + 1];
                    inputArr[i + 1] = tmp;
                    swapped = true;
                }
            }
        } while (swapped);
        return inputArr;
    };

    // verify if the array is a array
    if (!Array.isArray(array)) {
        console.error("the argument must be the type of array")
        return false
    }

    // verify if the sort type is a string
    if (typeof sortType !== "string") {
        console.error("the sort type must be a string")
        return false
    }

    // verify if the sort type is a string
    if (typeof sortWith !== "string") {
        console.error("the sort with must be a string")
        return false
    }

    // create associative array between the sort type and the function
    let association = {
        "radix": radixSort,
        "bubble": bubbleSort
    }

    // verify if the sort with is a function
    if (typeof association[sortWith] !== "function") {
        console.error("the sort with must be a function")
        return false
    }

    // process
    if (association[sortWith] != undefined) {
        if (sortType === "asc") {
            return association[sortWith](array)
        } else if (sortType === "desc") {
            return association[sortWith](array).reverse()
        } else {
            console.error("the sort type must be asc or desc")
            return false
        }
    } else {
        console.error("the sort with must be radix or bubble")
        return false
    }
}

/**
 *  info: require parameters of type array, first = Array<string>, ?seconde = Array<any>
 *  args start:
 *  arg         1: {array aruments of type array with the string to count}
 *  arg         ?2:{arrayAssosiateObject of type array with object associate on the first array}
 *  args end
 *  utility: add a double array in a and detect it (a = [[htmlelement.tagName], [HTMLelement]]) return the htmlelement but compare the HTMLelement.tagName
 *  template cout_duplicate(array:Array<...string>, ?arrayAssociateObject:Array<...Object>>)
 *  return Array<Object<...count:int>> || Array<Object<...Object<coutn:int, associatedObject:Object<>>>>
 */
export const count_duplicate = function count_duplicate(array, arrayAssociateObject = undefined) {
    let counts = {}

    // check if have a array for associate object
    if (arrayAssociateObject != undefined) {
        // verify
        if (!Array.isArray(array) || !Array.isArray(arrayAssociateObject)) {
            console.error("the two arguments must be the type of array")
            return false;
        } else if (array.length != arrayAssociateObject.length) {
            console.error("the two arguments array must have the same length")
            return false
        }


        // loop
        // process
        for (let i = 0; i < array.length; i++) {
            if (counts[array[i]]) {
                counts[array[i]]["count"] += 1
            } else {
                counts[array[i]] = { count: 1, associate: arrayAssociateObject[i] }
            }
        }
    } else {
        // verify
        if (!Array.isArray(array)) {
            console.error("the argument must be the type of array")
            return false
        }
        // process
        for (let i = 0; i < array.length; i++) {
            if (counts[array[i]]) {
                counts[array[i]] += 1
            } else {
                counts[array[i]] = 1
            }
        }
    }
    return counts
}

/**
 * It takes an array or a single element and returns an array of elements that are not in the
 * second argument.
 * @param elmt - The element to be parsed.
 * @param [toAvoid] - The array of items to avoid.
 * @returns an array of elements that are not in the toAvoid array.
 */
export const parse = function parse(elmt, toAvoid = []) {
    let arr = elmt
    if (!Array.isArray(toAvoid)) {
        toAvoid = this.parse(toAvoid)
    }
    if (!Array.isArray(elmt)) {
        arr = [elmt]
    }
    return arr.filter(function(item) {
        if (!toAvoid.includes(item)) {
            return true
        }
        return false
    })
}

/**
 * It returns true if every item in arr1 is also in arr2
 * @param arr1
 * @param arr2
 * @returns A function that takes two arrays as arguments and returns true if the first array contains
 * all the elements of the second array.
 */
export const contains = function contains(arr1, arr2) {
    return arr1.every((item) => arr2.includes(item))
}