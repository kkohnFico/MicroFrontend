"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
const workspace_1 = require("@nrwl/workspace");
const lint_1 = require("../../utils/lint");
const ast_utils_1 = require("../../utils/ast-utils");
const file_utils_1 = require("../../core/file-utils");
const to_js_1 = require("../../utils/rules/to-js");
function addProject(options) {
    return workspace_1.updateWorkspaceInTree((json) => {
        const architect = {};
        architect.lint = lint_1.generateProjectLint(core_1.normalize(options.projectRoot), core_1.join(core_1.normalize(options.projectRoot), 'tsconfig.lib.json'), options.linter, [`${options.projectRoot}/**/*.ts`]);
        json.projects[options.name] = {
            root: options.projectRoot,
            sourceRoot: core_1.join(core_1.normalize(options.projectRoot), 'src'),
            projectType: 'library',
            schematics: {},
            architect,
        };
        return json;
    });
}
function updateTsConfig(options) {
    return (host) => workspace_1.updateJsonInTree('tsconfig.base.json', (json) => {
        const c = json.compilerOptions;
        c.paths = c.paths || {};
        delete c.paths[options.name];
        if (c.paths[options.importPath]) {
            throw new schematics_1.SchematicsException(`You already have a library using the import path "${options.importPath}". Make sure to specify a unique one.`);
        }
        c.paths[options.importPath] = [
            to_js_1.maybeJs(options, `${ast_utils_1.libsDir(host)}/${options.projectDirectory}/src/index.ts`),
        ];
        return json;
    });
}
function createFiles(options) {
    const { className, name, propertyName } = workspace_1.names(options.name);
    return schematics_1.mergeWith(schematics_1.apply(schematics_1.url(`./files/lib`), [
        schematics_1.template(Object.assign(Object.assign({}, options), { className,
            name,
            propertyName, cliCommand: file_utils_1.cliCommand(), tmpl: '', offsetFromRoot: workspace_1.offsetFromRoot(options.projectRoot), hasUnitTestRunner: options.unitTestRunner !== 'none' })),
        schematics_1.move(options.projectRoot),
        addTestFiles(options),
        options.js ? to_js_1.toJS() : schematics_1.noop(),
    ]));
}
function updateNxJson(options) {
    return ast_utils_1.addProjectToNxJsonInTree(options.name, { tags: options.parsedTags });
}
function addJest(options) {
    return options.unitTestRunner !== 'none'
        ? schematics_1.externalSchematic('@nrwl/jest', 'jest-project', {
            project: options.name,
            setupFile: 'none',
            supportTsx: true,
            babelJest: options.babelJest,
            skipSerializers: true,
            testEnvironment: options.testEnvironment,
        })
        : schematics_1.noop();
}
function default_1(schema) {
    return (host, context) => {
        const options = normalizeOptions(host, schema);
        return schematics_1.chain([
            lint_1.addLintFiles(options.projectRoot, options.linter),
            createFiles(options),
            options.js ? to_js_1.updateTsConfigsToJs(options) : schematics_1.noop(),
            !options.skipTsConfig ? updateTsConfig(options) : schematics_1.noop(),
            addProject(options),
            updateNxJson(options),
            addJest(options),
            workspace_1.formatFiles(options),
        ])(host, context);
    };
}
exports.default = default_1;
function normalizeOptions(host, options) {
    const name = workspace_1.toFileName(options.name);
    const projectDirectory = options.directory
        ? `${workspace_1.toFileName(options.directory)}/${name}`
        : name;
    const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
    const fileName = getCaseAwareFileName({
        fileName: options.simpleModuleName ? name : projectName,
        pascalCaseFiles: options.pascalCaseFiles,
    });
    const projectRoot = `${ast_utils_1.libsDir(host)}/${projectDirectory}`;
    const parsedTags = options.tags
        ? options.tags.split(',').map((s) => s.trim())
        : [];
    const defaultImportPath = `@${workspace_1.getNpmScope(host)}/${projectDirectory}`;
    const importPath = options.importPath || defaultImportPath;
    return Object.assign(Object.assign({}, options), { fileName, name: projectName, projectRoot,
        projectDirectory,
        parsedTags,
        importPath });
}
function getCaseAwareFileName(options) {
    const normalized = workspace_1.names(options.fileName);
    return options.pascalCaseFiles ? normalized.className : normalized.fileName;
}
function addTestFiles(options) {
    return options.unitTestRunner === 'none'
        ? schematics_1.filter((path) => !(path.endsWith('.ts') || path.endsWith('.tsx')))
        : schematics_1.noop();
}
//# sourceMappingURL=library.js.map