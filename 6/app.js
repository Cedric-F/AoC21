const input = "3,4,3,2,1";

const population = [... new Array(9)].fill(0);
input.split(',').forEach(e => population[~~e]++);

for (let day = 0; day < 256; day++) {
    population.push(population.shift());
    population[6] += population[8];
}

console.log(population.reduce((a, b) => a + b, 0));