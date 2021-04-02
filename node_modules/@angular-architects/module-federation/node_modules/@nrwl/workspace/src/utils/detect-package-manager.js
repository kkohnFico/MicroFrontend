"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackageManagerInstallCommand = exports.getPackageManagerExecuteCommand = exports.detectPackageManager = void 0;
const fileutils_1 = require("./fileutils");
function detectPackageManager() {
    return fileutils_1.fileExists('yarn.lock')
        ? 'yarn'
        : fileutils_1.fileExists('pnpm-lock.yaml')
            ? 'pnpm'
            : 'npm';
}
exports.detectPackageManager = detectPackageManager;
function getPackageManagerExecuteCommand(packageManager = detectPackageManager()) {
    if (packageManager === 'yarn') {
        return `yarn`;
    }
    if (packageManager === 'pnpm') {
        return `pnpx`;
    }
    return `npx`;
}
exports.getPackageManagerExecuteCommand = getPackageManagerExecuteCommand;
function getPackageManagerInstallCommand(packageManager = detectPackageManager(), isDevDependency = false) {
    if (packageManager === 'yarn') {
        return `yarn add${isDevDependency ? ' --dev' : ''}`;
    }
    return `${packageManager} install${isDevDependency ? ' --save-dev' : ''}`;
}
exports.getPackageManagerInstallCommand = getPackageManagerInstallCommand;
//# sourceMappingURL=detect-package-manager.js.map