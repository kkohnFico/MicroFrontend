import { Rule } from '@angular-devkit/schematics';
import { MfSchematicSchema } from './schema';
export declare function npmInstall(packageName: string): Promise<void>;
export declare function yarnAdd(packageName: string): Promise<void>;
export declare function add(options: MfSchematicSchema): Rule;
export default function config(options: MfSchematicSchema): Rule;
