const fs = require('fs').promises;
const path = require('path');
const mergeStyles = require(path.join(__dirname, '../05-merge-styles'));
const copyDir = require(path.join(__dirname, '../04-copy-directory'));

const TEMPLATE_FILE = path.join(__dirname, 'template.html');
const COMPONENTS_DIR = path.join(__dirname, 'components');
const STYLES_DIR = path.join(__dirname, 'styles');
const ASSETS_DIR = path.join(__dirname, 'assets');
const OUTPUT_DIR = path.join(__dirname, 'project-dist');

const replaceTags = async (html) => {
  const tags = html.match(/{{\w+}}/g) || [];

  for (const tag of tags) {
    const componentName = tag.slice(2, -2);
    const componentFile = path.join(COMPONENTS_DIR, componentName + '.html');

    try {
      const componentHtml = await fs.readFile(componentFile, 'utf-8');
      html = html.replace(tag, componentHtml);
    } catch (error) {
      console.error(`Could not read component file ${componentFile}:`, error);
    }
  }

  return html;
};

const buildPage = async () => {
  try {
    await fs.rm(OUTPUT_DIR, { recursive: true, force: true });

    await fs.mkdir(OUTPUT_DIR);

    const templateHtml = await fs.readFile(TEMPLATE_FILE, 'utf-8');
    const replacedHtml = await replaceTags(templateHtml);

    const indexHtml = path.join(OUTPUT_DIR, 'index.html');
    await fs.writeFile(indexHtml, replacedHtml);

    const stylesFileName = 'style.css';
    await mergeStyles(STYLES_DIR, OUTPUT_DIR, stylesFileName);

    await copyDir(ASSETS_DIR, path.join(OUTPUT_DIR, 'assets'));
  } catch (error) {
    console.error('Error while building page:', error);
  }
};

buildPage();
