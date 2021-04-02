export declare function detectPackageManager(): string;
export declare function getPackageManagerExecuteCommand(packageManager?: string): "yarn" | "pnpx" | "npx";
export declare function getPackageManagerInstallCommand(packageManager?: string, isDevDependency?: boolean): string;
