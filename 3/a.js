import { readFile } from 'fs/promises'
const input = await readFile('./input', 'utf8');
const data = input.split`\r\n`;

let gamma = "";

let epsilon = "";

[... data[0]].forEach((e, i) => {
   let ones = data.reduce((a, b, j) => a + ~~b[i], 0);
   console.log(ones);
   gamma += ~~(ones > data.length - ones);
   epsilon += ~~!(ones > data.length - ones);
});

console.log(parseInt(gamma, 2) * parseInt(epsilon, 2));