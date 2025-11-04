#!/usr/bin/env node

import { CliController } from "./cli-controller.js";
import { CliService } from "./cli-service.js";
import { Cli } from "./cli.js";

async function main() {
  const cli = new Cli();
  const service = new CliService();
  const cliController = new CliController(service);
  const task = cli.getTask();
  const args = cli.getArgs();
  cliController.executeTask(task, args);
}

main().catch((error) => {
  console.error("Error:", error.message);
  process.exit(1);
});
