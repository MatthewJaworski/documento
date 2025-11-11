import fs from "fs/promises";
import * as path from "path";
import { PathService } from "./path-service.js";
import { RenameArgs } from "./interfaces/rename.interface.js";
import { DeleteArgs } from "./interfaces/delete.interface.js";

export class CliService {
  private pathService: PathService;

  constructor(pathService: PathService = new PathService()) {
    this.pathService = pathService;
  }

  public async rename({
    filePath,
    newName,
    newPath,
  }: RenameArgs): Promise<void> {
    if (!newName)
      throw new Error("newName argument is required for rename task");

    if (!filePath)
      throw new Error("filePath argument is required for rename task");

    const cwd = process.cwd();
    const sourcePath = this.pathService.ensureAbsolutePath(filePath, cwd);
    const baseTargetDir = this.pathService.resolveTargetDirectory(newPath, cwd);
    const targetPath = this.pathService.resolveTargetPath(
      newName,
      baseTargetDir
    );

    const targetDir = path.dirname(targetPath);

    console.log(`Renaming file:\n  from: ${sourcePath}\n  to:   ${targetPath}`);
    await fs.mkdir(targetDir, { recursive: true });

    await fs.rename(sourcePath, targetPath);
    console.log("File renamed");
  }

  public async delete({ filePath }: DeleteArgs): Promise<void> {
    if (!filePath)
      throw new Error("filePath argument is required for rename task");

    const cwd = process.cwd();
    const sourcePath = this.pathService.ensureAbsolutePath(filePath, cwd);

    await fs.unlink(sourcePath);
    console.log("File removed");
  }

  public async copy(): Promise<void> {
    console.log("Copying...");
  }
}
