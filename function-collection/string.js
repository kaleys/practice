/**
 * 将中划线转成驼峰式
 * @type {RegExp}
 */
var camelizeRE = /-(\w)/g;
function camelize (str) {
    return str.replace(camelizeRE, toUpper)
}
// replace 方法参数
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
function toUpper (_, c) {
    return c ? c.toUpperCase() : ''
}

/**
 * 将驼峰式转成中划线形式
 * eg:"camelCase" => "camel-case";
 * @type {RegExp}
 */
var hyphenateRE = /([^-])([A-Z])/g;
function hyphenate (str) {
    return str
        .replace(hyphenateRE, '$1-$2')
        .replace(hyphenateRE, '$1-$2')
        .toLowerCase()
}

/**
 * e.g. my-component => MyComponent
 *      some_else    => SomeElse
 *      some/comp    => SomeComp
 * @type {RegExp}
 */
var classifyRE = /(?:^|[-_\/])(\w)/g;
function classify (str) {
    return str.replace(classifyRE, toUpper)
}