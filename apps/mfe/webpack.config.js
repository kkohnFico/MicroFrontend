const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
    output: {
        uniqueName: "mfe2"
    },
    optimization: {
        // Only needed to bypass a temporary bug
        runtimeChunk: false
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "mfe",
            filename: "remoteEntry.js",
            exposes: {
                './Module': './apps/mfe/src/app/editor/text-editor.module.ts'
            },
            shared: {
                "@angular/core": { singleton: true, strictVersion: false },
                "@angular/common": { singleton: true, strictVersion: false },
                "@angular/router": { singleton: true, strictVersion: false }
            }
        }),
    ],
};
