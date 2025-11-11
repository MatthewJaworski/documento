import { TaskArgsMap, Tasks } from "./cli-controller.js";
import { CliTaskBuilder } from "./cli-task-builder.js";

export class Cli {
  constructor(private builder: CliTaskBuilder) {}

  public async parse<K extends Tasks>() {
    return (await this.builder.build()) as unknown as TaskArgsMap[K];
  }

  public getTask(argv: any): Tasks {
    const task = argv._[0] as Tasks;
    if (!task) throw new Error("No task specified");
    return task;
  }

  public getArgs<T extends Tasks>(argv: any): TaskArgsMap[T] {
    return argv as TaskArgsMap[T];
  }
}
