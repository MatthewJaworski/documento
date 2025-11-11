#!/usr/bin/env node
import { Cli } from "./cli.js";
import { CliTaskBuilder } from "./cli-task-builder.js";
import { CliController } from "./cli-controller.js";
import { CliService } from "./cli-service.js";
import { PathService } from "./path-service.js";

async function main() {
  const pathService = new PathService();
  const cliService = new CliService(pathService);
  const cliController = new CliController(cliService);
  const cliTaskBuilder = CliTaskBuilder.create();

  const cli = new Cli(cliTaskBuilder);
  const argv = cli.parse();

  const task = cli.getTask(argv);
  const args = await cli.parse();

  await cliController.executeTask(task, args);
}

main().catch((error) => {
  console.error("❌ Error:", error.message);
  process.exit(1);
});
