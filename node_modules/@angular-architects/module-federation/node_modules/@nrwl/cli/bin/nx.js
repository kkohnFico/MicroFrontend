#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// polyfill rxjs observable to avoid issues with multiple version fo Observable installed in node_modules
// https://twitter.com/BenLesh/status/1192478226385428483?s=20
Symbol.observable = Symbol('observable polyfill');
const chalk_1 = require("chalk");
const find_workspace_root_1 = require("../lib/find-workspace-root");
const init_local_1 = require("../lib/init-local");
const output_1 = require("../lib/output");
const workspace = find_workspace_root_1.findWorkspaceRoot(process.cwd());
if (!workspace) {
    output_1.output.log({
        title: `The current directory isn't part of an Nx workspace.`,
        bodyLines: [
            `To create a workspace run:`,
            chalk_1.default.bold.white(`npx create-nx-workspace@latest <workspace name>`),
        ],
    });
    output_1.output.note({
        title: `For more information please visit https://nx.dev/`,
    });
    process.exit(1);
}
// Make sure that a local copy of Nx exists in workspace
let localNx;
try {
    localNx = require.resolve('@nrwl/cli/bin/nx.js', {
        paths: [workspace.dir],
    });
}
catch (e) {
    output_1.output.error({
        title: `Could not find Nx modules in this workspace.`,
        bodyLines: [`Have you run ${chalk_1.default.bold.white(`npm/yarn install`)}?`],
    });
    process.exit(1);
}
if (localNx === require.resolve('@nrwl/cli/bin/nx.js')) {
    init_local_1.initLocal(workspace);
}
else {
    // Nx is being run from globally installed CLI - hand off to the local
    require(localNx);
}
//# sourceMappingURL=nx.js.map