const fs = require('fs/promises');
const path = require('path');

const stylesFolder = path.join(__dirname, 'styles');
const distFolder = path.join(__dirname, 'project-dist');
const bundle = 'bundle.css';

async function mergeStyles() {
  try {
    const files = await fs.readdir(stylesFolder, { withFileTypes: true });
    const styles = [];
    for (const file of files) {
      if (file.isFile() && path.extname(file.name) === '.css') {
        const style = await fs.readFile(path.join(stylesFolder, file.name));
        styles.push(style);
      }
    }
    await fs.writeFile(path.join(distFolder, bundle), styles.join('\n'));
    console.log('bundle.css готов!');
  } catch (err) {
    console.error(err);
  }
}

mergeStyles();
