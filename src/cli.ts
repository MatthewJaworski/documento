import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export enum TaskOptions {
  rename = "rename",
  delete = "delete",
  copy = "copy",
}

export type Options = {
  _: (string | number)[];
  help?: boolean;
  task?: TaskOptions;
};
export type TaskArgs = Omit<Options, "task">;

export class Cli {
  private _arguments: Options;

  constructor() {
    this._arguments = yargs(hideBin(process.argv)).parse() as Options;
  }

  public getTask(): TaskOptions | undefined {
    return this._arguments?.task;
  }

  public getArgs(): TaskArgs {
    const { task, ...args } = this._arguments;
    return args;
  }
}
