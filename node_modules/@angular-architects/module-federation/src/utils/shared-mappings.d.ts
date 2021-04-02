import { NormalModuleReplacementPlugin } from 'webpack';
export declare class SharedMappings {
    private mappings;
    register(tsConfigPath: string, shared?: string[]): void;
    private getPackageVersion;
    getPlugin(): NormalModuleReplacementPlugin;
    getDescriptors(): object;
    getDescriptor(mappedPath: string, requiredVersion?: string): any;
}
