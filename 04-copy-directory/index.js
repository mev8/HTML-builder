const fs = require('fs');
const path = require('path');

const copyDir = async (source, target) => {
  const sourcePath = path.resolve(source);
  const targetPath = path.resolve(target);

  await fs.promises.mkdir(targetPath, { recursive: true });

  const sourceFiles = await fs.promises.readdir(sourcePath);
  for (const sourceFile of sourceFiles) {
    const sourceFilePath = path.join(sourcePath, sourceFile);
    const targetFilePath = path.join(targetPath, sourceFile);

    const stat = await fs.promises.stat(sourceFilePath);
    if (stat.isDirectory()) {
      await copyDir(sourceFilePath, targetFilePath);
    } else {
      await fs.promises.copyFile(sourceFilePath, targetFilePath);
    }
  }

  const targetFiles = await fs.promises.readdir(targetPath);
  for (const targetFile of targetFiles) {
    const targetFilePath = path.join(targetPath, targetFile);

    if (!sourceFiles.includes(targetFile)) {
      const stat = await fs.promises.stat(targetFilePath);
      if (stat.isDirectory()) {
        await fs.promises.rmdir(targetFilePath, { recursive: true });
      } else {
        await fs.promises.unlink(targetFilePath);
      }
    }
  }
};

const sourceDir = path.join(__dirname, 'files');
const destDir = path.join(__dirname, 'files-copy');

copyDir(sourceDir, destDir)
  .then(() => console.log('Клонирование успешно!'))
  .catch((err) => console.error(err));

module.exports = copyDir;