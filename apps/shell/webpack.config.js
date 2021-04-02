const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');


module.exports = {
    output: {
        uniqueName: 'shell'
    },
    optimization: {
        // Only needed to bypass a temporary bug
        runtimeChunk: false
    },
    plugins: [
        new ModuleFederationPlugin({
            remotes: {
            },
            shared: {
                '@angular/core': { singleton: true, strictVersion: false, eager:true },
                '@angular/common': { singleton: true, strictVersion: false, eager:true },
                '@angular/router': { singleton: true, strictVersion: false, eager:true },
            }
        }),
    ],
};
