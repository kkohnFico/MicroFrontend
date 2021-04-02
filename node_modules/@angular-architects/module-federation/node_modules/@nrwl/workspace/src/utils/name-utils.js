"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findModuleParent = exports.toFileName = exports.toPropertyName = exports.toClassName = exports.names = void 0;
const path = require("path");
/**
 * Build dictionary of names:
 */
function names(name) {
    return {
        name,
        className: toClassName(name),
        propertyName: toPropertyName(name),
        constantName: toConstantName(name),
        fileName: toFileName(name),
    };
}
exports.names = names;
/**
 * Hyphenated to UpperCamelCase
 */
function toClassName(str) {
    return toCapitalCase(toPropertyName(str));
}
exports.toClassName = toClassName;
/**
 * Hyphenated to lowerCamelCase
 */
function toPropertyName(s) {
    return s
        .replace(/(-|_|\.|\s)+(.)?/g, (_, __, chr) => chr ? chr.toUpperCase() : '')
        .replace(/[^a-zA-Z\d]/g, '')
        .replace(/^([A-Z])/, (m) => m.toLowerCase());
}
exports.toPropertyName = toPropertyName;
/**
 * Hyphenated to CONSTANT_CASE
 */
function toConstantName(s) {
    return s.replace(/(-|_|\.|\s)/g, '_').toUpperCase();
}
/**
 * Upper camelCase to lowercase, hyphenated
 */
function toFileName(s) {
    return s
        .replace(/([a-z\d])([A-Z])/g, '$1_$2')
        .toLowerCase()
        .replace(/[ _]/g, '-');
}
exports.toFileName = toFileName;
/**
 * Capitalizes the first letter of a string
 */
function toCapitalCase(s) {
    return s.charAt(0).toUpperCase() + s.substr(1);
}
/**
 * Determine the parent directory for the ngModule specified
 * in the full-path option 'module'
 */
function findModuleParent(modulePath) {
    return path.dirname(modulePath);
}
exports.findModuleParent = findModuleParent;
//# sourceMappingURL=name-utils.js.map