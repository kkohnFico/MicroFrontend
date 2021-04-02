"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackageManagerInstallCommand = exports.detectPackageManager = void 0;
const fs_1 = require("fs");
function detectPackageManager() {
    return fs_1.existsSync('yarn.lock')
        ? 'yarn'
        : fs_1.existsSync('pnpm-lock.yaml')
            ? 'pnpm'
            : 'npm';
}
exports.detectPackageManager = detectPackageManager;
function getPackageManagerInstallCommand(packageManager = detectPackageManager(), isDevDependency = false) {
    if (packageManager === 'yarn') {
        return `yarn add${isDevDependency ? ' --dev' : ''}`;
    }
    return `${packageManager} install${isDevDependency ? ' --save-dev' : ''}`;
}
exports.getPackageManagerInstallCommand = getPackageManagerInstallCommand;
//# sourceMappingURL=detect-package-manager.js.map