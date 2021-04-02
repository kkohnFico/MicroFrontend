/**
 * Build dictionary of names:
 */
export declare function names(name: string): {
    name: string;
    className: string;
    propertyName: string;
    constantName: string;
    fileName: string;
};
/**
 * Hyphenated to UpperCamelCase
 */
export declare function toClassName(str: string): string;
/**
 * Hyphenated to lowerCamelCase
 */
export declare function toPropertyName(s: string): string;
/**
 * Upper camelCase to lowercase, hyphenated
 */
export declare function toFileName(s: string): string;
/**
 * Determine the parent directory for the ngModule specified
 * in the full-path option 'module'
 */
export declare function findModuleParent(modulePath: any): string;
