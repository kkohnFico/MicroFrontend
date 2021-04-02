"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadRemoteModule = exports.loadRemoteEntry = void 0;
const tslib_1 = require("tslib");
const moduleMap = {};
const remoteMap = {};
let isDefaultScopeInitialized = false;
function lookupExposedModule(remoteName, exposedModule) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const container = window[remoteName];
        const factory = yield container.get(exposedModule);
        const Module = factory();
        return Module;
    });
}
function initRemote(remoteName) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const container = window[remoteName];
        // Do we still need to initialize the remote?
        if (remoteMap[remoteName]) {
            return container;
        }
        // Do we still need to initialize the share scope?
        if (!isDefaultScopeInitialized) {
            yield __webpack_init_sharing__('default');
            isDefaultScopeInitialized = true;
        }
        yield container.init(__webpack_share_scopes__.default);
        remoteMap[remoteName] = true;
        return container;
    });
}
function loadRemoteEntry(remoteEntry, remoteName) {
    return new Promise((resolve, reject) => {
        // Is remoteEntry already loaded?
        if (moduleMap[remoteEntry]) {
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = remoteEntry;
        script.onerror = reject;
        script.onload = () => {
            initRemote(remoteName);
            moduleMap[remoteEntry] = true;
            resolve();
        };
        document.body.append(script);
    });
}
exports.loadRemoteEntry = loadRemoteEntry;
function loadRemoteModule(options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (options.remoteEntry) {
            yield loadRemoteEntry(options.remoteEntry, options.remoteName);
        }
        return yield lookupExposedModule(options.remoteName, options.exposedModule);
    });
}
exports.loadRemoteModule = loadRemoteModule;
//# sourceMappingURL=dynamic-federation.js.map