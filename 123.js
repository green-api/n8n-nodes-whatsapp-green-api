import fs from 'fs';
const buf = fs.readFileSync('fail.jpg'); // замени на своё имя файла
console.log('Первые 400 байт как текст:\n');
console.log(buf.slice(0, 400).toString('utf8'));