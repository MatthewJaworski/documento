import { CliService } from "./cli-service.js";
import { RenameArgs } from "./interfaces/rename.interface.js";
import { DeleteArgs } from "./interfaces/delete.interface.js";
import { CopyArgs } from "./interfaces/copy.interface.js";

export type TaskArgsMap = {
  rename: RenameArgs;
  delete: DeleteArgs;
  copy: CopyArgs;
};

export type Tasks = keyof TaskArgsMap;

type TaskFunction<K extends Tasks> = (args: TaskArgsMap[K]) => Promise<void>;

type TaskOptionRepository = { [K in Tasks]: TaskFunction<K> };

export class CliController {
  private cliService: CliService;
  private taskOptionRepository: TaskOptionRepository;

  constructor(cliService: CliService) {
    this.cliService = cliService;
    this.taskOptionRepository = {
      rename: this.cliService.rename.bind(this.cliService),
      delete: this.cliService.delete.bind(this.cliService),
      copy: this.cliService.copy.bind(this.cliService),
    };
  }

  public async executeTask<K extends Tasks>(
    task: K,
    args: TaskArgsMap[K]
  ): Promise<void> {
    const taskFunction = this.taskOptionRepository[task];
    if (!taskFunction) throw new Error(`Unknown task: ${task}`);
    await taskFunction(args);
  }
}
