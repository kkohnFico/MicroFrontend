export declare type LoadRemoteModuleOptions = {
    remoteEntry?: string;
    remoteName: string;
    exposedModule: string;
};
export declare function loadRemoteEntry(remoteEntry: string, remoteName: string): Promise<void>;
export declare function loadRemoteModule<T = any>(options: LoadRemoteModuleOptions): Promise<T>;
