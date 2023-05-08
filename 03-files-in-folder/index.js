const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');
fs.promises.readdir(folderPath, { withFileTypes: true })
  .then(async (folderContents) => {
    const files = folderContents.filter((folderContent) => folderContent.isFile());

    for (const file of files) {
      const fileName = path.parse(file.name).name;
      const fileExt = path.extname(file.name).slice(1);
      const filePath = path.join(folderPath, file.name);
      const stats = await fs.promises.stat(filePath);
      const fileSize = stats.size;
      console.log(`${fileName} - ${fileExt} - ${fileSize}`);
    }
  })
  .catch((err) => console.error(err));
