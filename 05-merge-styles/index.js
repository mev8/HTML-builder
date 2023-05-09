const fs = require('fs/promises');
const path = require('path');

async function mergeStyles(inputFolder, outputFolder, outputFileName) {
  try {
    const inputPath = inputFolder;
    const files = await fs.readdir(inputPath, { withFileTypes: true });
    const styles = [];
    for (const file of files) {
      if (file.isFile() && path.extname(file.name) === '.css') {
        const style = await fs.readFile(path.join(inputPath, file.name));
        styles.push(style);
      }
    }
    const outputPath = outputFolder;
    await fs.mkdir(outputPath, { recursive: true });
    await fs.writeFile(path.join(outputPath, outputFileName), styles.join('\n'));
    console.log(`${outputFileName} готов!`);
  } catch (err) {
    console.error(err);
  }
}

const inputFolder = path.join(__dirname, 'styles');
const outputFolder = path.join(__dirname, 'project-dist');
const outputFileName = 'bundle.css';

mergeStyles(inputFolder, outputFolder, outputFileName);

module.exports = mergeStyles;
