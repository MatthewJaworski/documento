import fs from "fs/promises";
import * as path from "path";
import { PathService } from "./path-service.js";
import { RenameArgs } from "./interfaces/rename.interface.js";

export class CliService {
  private pathService: PathService;

  constructor(pathService: PathService = new PathService()) {
    this.pathService = pathService;
  }

  public async rename(args: RenameArgs): Promise<void> {
    if (!args.newName) {
      throw new Error("newName argument is required for rename task");
    }

    if (!args.filePath) {
      throw new Error("filePath argument is required for rename task");
    }

    const cwd = process.cwd();
    const sourcePath = this.pathService.ensureAbsolutePath(args.filePath, cwd);
    const baseTargetDir = this.pathService.resolveTargetDirectory(
      args.newPath,
      cwd
    );
    const targetPath = this.pathService.resolveTargetPath(
      args.newName,
      baseTargetDir
    );

    const targetDir = path.dirname(targetPath);

    console.log(`Renaming file:\n  from: ${sourcePath}\n  to:   ${targetPath}`);
    await fs.mkdir(targetDir, { recursive: true });

    await fs.rename(sourcePath, targetPath);
    console.log("File renamed");
  }

  public async delete(): Promise<void> {
    console.log("Deleting...");
  }

  public async copy(): Promise<void> {
    console.log("Copying...");
  }
}
