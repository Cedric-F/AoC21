import { readFile } from 'fs/promises'
const input = await readFile('./input', 'utf8');
const data = input.split`\r\n`;

const a = () => {
   let gamma = "";

   let epsilon = "";

   [... data[0]].forEach((e, i) => {
      let ones = data.reduce((a, b, j) => a + ~~b[i], 0);
      gamma += ~~(ones > data.length - ones);
      epsilon += ~~!(ones > data.length - ones);
   });

   console.log(parseInt(gamma, 2) * parseInt(epsilon, 2));
}

const b = () => {
   const filter = (data, common) => {
      let tab = [... data];
      let offset = 0;
      while (tab[1]) {
         let bits = tab.reduce((a, b) => a + ~~b[offset], 0);
         let criteria = common ?
                        ~~(bits >= tab.length - bits) :
                        ~~!(bits >= tab.length - bits)
         tab = tab.filter(v => v[offset] == criteria);
         offset++;
      }
      return parseInt(tab[0], 2);
   }

   console.log(filter(data, true) * filter(data));
}

a();
b();