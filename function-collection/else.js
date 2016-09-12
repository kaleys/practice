/**
 * 当不在触发func wait秒后执行func
 * eg: 比如input检测，当用户不再输入之后再去验证
 * @param func function
 * @param wait 等待多少秒
 * @returns {Function}
 */
function debounce (func, wait) {
    var timeout, args, context, timestamp, result;
    var later = function () {
        var last = Date.now() - timestamp;
        if (last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            result = func.apply(context, args);
            if (!timeout) context = args = null
        }
    }
    return function () {
        context = this;
        args = arguments;
        timestamp = Date.now();
        if (!timeout) {
            timeout = setTimeout(later, wait);
        }
        return result
    }
}

function extend() {
    var options, name, src, copy,
        target = arguments[ 0 ] || {},
        i=1,
        length = arguments.length;
    // Handle case when target is a string or something (possible in deep copy)
    if ( typeof target !== "object" && Object.prototype.toString.call(target)==='[object Functon]' ) {
        target = {};
    }
    for ( ; i < length; i++ ) {
        // Only deal with non-null/undefined values
        if ( ( options = arguments[ i ] ) != null ) {
            // Extend the base object
            for ( name in options ) {
                src = target[ name ];
                copy = options[ name ];
                if ( target === copy ) {
                    continue;
                }
                target[ name ] = copy;
            }
        }
    }
    return target;
}

/**
 * 查找 indexOf 要比原生的快
 * @param arr
 * @param obj
 * @returns {*}
 */
function indexOf (arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) return i
    }
    return -1
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 *
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 */

export function looseEqual (a, b) {
    /* eslint-disable eqeqeq */
    return a == b || (
            isObject(a) && isObject(b)
                ? JSON.stringify(a) === JSON.stringify(b)
                : false
        )
    /* eslint-enable eqeqeq */
}