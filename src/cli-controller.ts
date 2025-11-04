import { Options, TaskArgs, TaskOptions } from "./cli.js";
import { CliService } from "./cli-service.js";

type TaskFunction = (args: Omit<Options, "task">) => void;
type TaskOptionRepository = Record<TaskOptions, TaskFunction>;

export class CliController {
  private cliService: CliService;
  private taskOptionRepository: TaskOptionRepository;

  constructor(cliService: CliService) {
    this.cliService = cliService;
    this.taskOptionRepository = {
      [TaskOptions.rename]: this.cliService.rename.bind(this.cliService),
      [TaskOptions.delete]: this.cliService.delete.bind(this.cliService),
      [TaskOptions.copy]: this.cliService.copy.bind(this.cliService),
    };
  }

  public executeTask(task: TaskOptions | undefined, args: TaskArgs): void {
    if (!task) throw new Error("No task provided");

    const taskFunction = this.taskOptionRepository[task];

    if (!taskFunction) throw new Error(`Unknown task: ${task}`);

    taskFunction(args);
  }
}
