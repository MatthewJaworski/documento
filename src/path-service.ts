import * as path from "path";

export class PathService {
  //Ensures a path is absolute, converting relative paths to absolute using the current working directory
  public ensureAbsolutePath(
    filePath: string,
    cwd: string = process.cwd()
  ): string {
    return path.isAbsolute(filePath) ? filePath : path.join(cwd, filePath);
  }

  //Resolves the target directory for a file operation, handling optional new path
  public resolveTargetDirectory(
    newPath: string | undefined,
    cwd: string = process.cwd()
  ): string {
    if (!newPath) return cwd;
    return this.ensureAbsolutePath(newPath, cwd);
  }

  // Resolves the full target path for a file operation
  public resolveTargetPath(newName: string, baseDir: string): string {
    return path.isAbsolute(newName) ? newName : path.join(baseDir, newName);
  }
}
