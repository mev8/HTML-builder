const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'text.txt');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const writeStream = fs.createWriteStream(filePath);

console.log('Введите текст или exit для выхода:');

rl.on('line', (input) => {
  if (input === 'exit') {
    process.exit();
  }
  writeStream.write(`${input}\n`);
});

rl.on('close', () => {
  process.exit();
});
