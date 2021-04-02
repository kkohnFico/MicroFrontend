"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedMappings = void 0;
const webpack_1 = require("webpack");
const path = require("path");
const fs = require("fs");
const JSON5 = require("json5");
class SharedMappings {
    constructor() {
        this.mappings = [];
    }
    register(tsConfigPath, shared = null) {
        var _a;
        if (!path.isAbsolute(tsConfigPath)) {
            throw new Error('SharedMappings.register: tsConfigPath needs to be an absolute path!');
        }
        const tsConfig = JSON5.parse(fs.readFileSync(tsConfigPath, { encoding: 'UTF8' }));
        const mappings = (_a = tsConfig === null || tsConfig === void 0 ? void 0 : tsConfig.compilerOptions) === null || _a === void 0 ? void 0 : _a.paths;
        const rootPath = path.normalize(path.dirname(tsConfigPath));
        if (!mappings) {
            return;
        }
        for (const key in mappings) {
            const libPath = path.normalize(path.join(rootPath, mappings[key][0]));
            const version = this.getPackageVersion(libPath);
            if (shared && shared.includes(key)) {
                this.mappings.push({
                    key,
                    path: libPath,
                    version
                });
            }
        }
    }
    getPackageVersion(libPath) {
        var _a;
        if (libPath.endsWith('.ts')) {
            libPath = path.dirname(libPath);
        }
        const packageJsonPath = path.join(libPath, '..', 'package.json');
        if (fs.existsSync(packageJsonPath)) {
            const packageJson = JSON5.parse(fs.readFileSync(packageJsonPath, { encoding: 'UTF8' }));
            return (_a = packageJson.version) !== null && _a !== void 0 ? _a : null;
        }
        return null;
    }
    getPlugin() {
        return new webpack_1.NormalModuleReplacementPlugin(/./, (req) => {
            const from = req.context;
            const to = path.normalize(path.join(req.context, req.request));
            if (!req.request.startsWith('.'))
                return;
            for (const m of this.mappings) {
                const libFolder = path.normalize(path.dirname(m.path));
                if (!from.startsWith(libFolder) && to.startsWith(libFolder)) {
                    req.request = m.key;
                    // console.log('remapping', { from, to, libFolder });
                }
            }
        });
    }
    getDescriptors() {
        const result = {};
        for (const m of this.mappings) {
            result[m.key] = {
                import: m.path,
                requiredVersion: false
            };
        }
        return result;
    }
    getDescriptor(mappedPath, requiredVersion = null) {
        var _a;
        const lib = this.mappings.find(m => m.key === mappedPath);
        if (!lib) {
            throw new Error('No mapping found for ' + mappedPath + ' in tsconfig');
        }
        return ({
            [mappedPath]: {
                import: lib.path,
                version: (_a = lib.version) !== null && _a !== void 0 ? _a : undefined,
                requiredVersion: requiredVersion !== null && requiredVersion !== void 0 ? requiredVersion : false
            }
        });
    }
}
exports.SharedMappings = SharedMappings;
//# sourceMappingURL=shared-mappings.js.map