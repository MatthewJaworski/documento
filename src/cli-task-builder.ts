import yargs, { Argv } from "yargs";
import { hideBin } from "yargs/helpers";

export class CliTaskBuilder {
  private y: Argv;

  constructor() {
    this.y = yargs(hideBin(process.argv))
      .scriptName("documentum")
      .usage("$0 <command> [options]");
  }

  private addRenameCommand() {
    this.y = this.y.command(
      "rename <filePath> <newName>",
      "Rename a file",
      (y) =>
        y
          .positional("filePath", {
            describe: "Path of the file to rename",
            type: "string",
          })
          .positional("newName", {
            describe: "New name or relative path",
            type: "string",
          })
          .option("newPath", {
            describe: "Optional target directory",
            type: "string",
          })
    );
    return this;
  }

  private addDeleteCommand() {
    this.y = this.y.command("delete <filePath>", "Delete a file", (y) =>
      y.positional("filePath", {
        describe: "Path of the file to delete",
        type: "string",
      })
    );
    return this;
  }

  private addCopyCommand() {
    this.y = this.y.command(
      "copy <filePath> <destinationPath>",
      "Copy a file",
      (y) =>
        y
          .positional("filePath", {
            describe: "Path of the file to copy",
            type: "string",
          })
          .positional("destinationPath", {
            describe: "Destination path",
            type: "string",
          })
    );
    return this;
  }

  public build() {
    return this.y
      .help()
      .demandCommand(1, "You must specify a task")
      .strict()
      .parse();
  }

  public static create(): CliTaskBuilder {
    return new CliTaskBuilder()
      .addRenameCommand()
      .addDeleteCommand()
      .addCopyCommand();
  }
}
