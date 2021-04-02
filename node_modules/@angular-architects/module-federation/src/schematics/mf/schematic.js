"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = exports.yarnAdd = exports.npmInstall = void 0;
const tslib_1 = require("tslib");
const schematics_1 = require("@angular-devkit/schematics");
const cross_spawn_1 = require("cross-spawn");
const path = require("path");
const create_config_1 = require("../../utils/create-config");
const prod_config_1 = require("./prod-config");
function npmInstall(packageName) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield new Promise((resolve) => {
            console.log('Installing packages...');
            cross_spawn_1.spawn('npm', ['install', packageName, '-D'])
                .on('close', (code) => {
                if (code === 0) {
                    console.log('Packages installed successfully ✅');
                    resolve(true);
                }
                else {
                    throw new Error(`Error installing '${packageName}'`);
                }
            });
        });
    });
}
exports.npmInstall = npmInstall;
function yarnAdd(packageName) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield new Promise((resolve) => {
            cross_spawn_1.spawn('npm', ['install', packageName, '-D'])
                .on('close', (code) => {
                if (code === 0) {
                    resolve(true);
                }
                else {
                    throw new Error(`Error installing '${packageName}'`);
                }
            });
        });
    });
}
exports.yarnAdd = yarnAdd;
function add(options) {
    return config(options);
}
exports.add = add;
function makeMainAsync(main) {
    return function (tree, context) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const mainPath = path.dirname(main);
            const bootstrapName = path.join(mainPath, 'bootstrap.ts');
            if (tree.exists(bootstrapName)) {
                console.info(`${bootstrapName} already exists.`);
                return;
            }
            const mainContent = tree.read(main);
            tree.create(bootstrapName, mainContent);
            tree.overwrite(main, "import('./bootstrap')\n\t.catch(err => console.error(err));\n");
        });
    };
}
function config(options) {
    return function (tree) {
        var _a, _b, _c, _d, _e, _f;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const workspace = JSON.parse(tree.read('angular.json').toString('utf8'));
            if (!options.project) {
                options.project = workspace.defaultProject;
            }
            if (!options.project) {
                throw new Error(`No default project found. Please specifiy a project name!`);
            }
            const projectName = options.project;
            const projectConfig = workspace.projects[projectName];
            if (!projectConfig) {
                throw new Error(`Project ${projectName} not found!`);
            }
            const projectRoot = projectConfig.root;
            const configPath = path.join(projectRoot, 'webpack.config.js').replace(/\\/g, '/');
            const configProdPath = path.join(projectRoot, 'webpack.prod.config.js').replace(/\\/g, '/');
            const port = parseInt(options.port);
            const main = projectConfig.architect.build.options.main;
            const relWorkspaceRoot = path.relative(projectRoot, '');
            const tsConfigName = tree.exists('tsconfig.base.json') ?
                'tsconfig.base.json' : 'tsconfig.json';
            const relTsConfigPath = path
                .join(relWorkspaceRoot, tsConfigName)
                .replace(/\\/g, '/');
            if (isNaN(port)) {
                throw new Error(`Port must be a number!`);
            }
            const remotes = generateRemoteConfig(workspace, projectName);
            const webpackConfig = create_config_1.createConfig(projectName, remotes, relTsConfigPath, projectRoot, port);
            tree.create(configPath, webpackConfig);
            tree.create(configProdPath, prod_config_1.prodConfig);
            if (!((_b = (_a = projectConfig === null || projectConfig === void 0 ? void 0 : projectConfig.architect) === null || _a === void 0 ? void 0 : _a.build) === null || _b === void 0 ? void 0 : _b.options) ||
                !((_d = (_c = projectConfig === null || projectConfig === void 0 ? void 0 : projectConfig.architect) === null || _c === void 0 ? void 0 : _c.serve) === null || _d === void 0 ? void 0 : _d.options)) {
                throw new Error(`The project doen't have a build or serve target in angular.json!`);
            }
            projectConfig.architect.build.options.extraWebpackConfig = configPath;
            projectConfig.architect.build.configurations.production.extraWebpackConfig = configProdPath;
            projectConfig.architect.serve.options.extraWebpackConfig = configPath;
            projectConfig.architect.serve.options.port = port;
            projectConfig.architect.serve.configurations.production.extraWebpackConfig = configProdPath;
            if ((_f = (_e = projectConfig === null || projectConfig === void 0 ? void 0 : projectConfig.architect) === null || _e === void 0 ? void 0 : _e.test) === null || _f === void 0 ? void 0 : _f.options) {
                projectConfig.architect.test.options.extraWebpackConfig = configPath;
            }
            tree.overwrite('angular.json', JSON.stringify(workspace, null, '\t'));
            return schematics_1.chain([
                makeMainAsync(main),
                schematics_1.externalSchematic('ngx-build-plus', 'ng-add', { project: options.project }),
            ]);
        });
    };
}
exports.default = config;
function generateRemoteConfig(workspace, projectName) {
    var _a, _b, _c, _d;
    let remotes = '';
    for (const p in workspace.projects) {
        const project = workspace.projects[p];
        const projectType = (_a = project.projectType) !== null && _a !== void 0 ? _a : 'application';
        if (p !== projectName
            && projectType === 'application'
            && ((_b = project === null || project === void 0 ? void 0 : project.architect) === null || _b === void 0 ? void 0 : _b.serve)
            && ((_c = project === null || project === void 0 ? void 0 : project.architect) === null || _c === void 0 ? void 0 : _c.build)) {
            const pPort = (_d = project.architect.serve.options.port) !== null && _d !== void 0 ? _d : 4200;
            remotes += `        //     "${p}": "${p}@http://localhost:${pPort}/remoteEntry.js",\n`;
        }
    }
    if (!remotes) {
        remotes = '        //     "mfe1": "mfe1@http://localhost:3000/remoteEntry.js",\n';
    }
    return remotes;
}
//# sourceMappingURL=schematic.js.map