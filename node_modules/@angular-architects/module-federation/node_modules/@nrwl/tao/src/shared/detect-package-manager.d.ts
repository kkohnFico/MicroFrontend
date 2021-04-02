export declare function detectPackageManager(): "yarn" | "pnpm" | "npm";
export declare function getPackageManagerInstallCommand(packageManager?: string, isDevDependency?: boolean): string;
