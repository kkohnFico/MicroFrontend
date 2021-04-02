"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfig = void 0;
function createConfig(projectName, remotes, tsConfigName, root, port) {
    return `const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, '${tsConfigName}'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "${projectName}"
  },
  optimization: {
    // Only needed to bypass a temporary bug
    runtimeChunk: false
  },
  plugins: [
    new ModuleFederationPlugin({
      
        // For remotes (please adjust)
        // name: "${projectName}",
        // filename: "remoteEntry.js",
        // exposes: {
        //     './Component': './${root}/src/app/app.component.ts',
        // },        
        
        // For hosts (please adjust)
        // remotes: {
${remotes}
        // },

        shared: {
          "@angular/core": { singleton: true, strictVersion: true }, 
          "@angular/common": { singleton: true, strictVersion: true }, 
          "@angular/router": { singleton: true, strictVersion: true },

          ...sharedMappings.getDescriptors()
        }
        
    }),
    sharedMappings.getPlugin(),
  ],
};
`;
}
exports.createConfig = createConfig;
//# sourceMappingURL=create-config.js.map