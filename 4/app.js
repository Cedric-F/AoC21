import { readFile } from 'fs/promises'
const input = await readFile('./input', 'utf8');
const data = input.split`\r\n\r\n`;

let nums = data.shift().split(',');
let cp;

const parse = () => {
	cp = [... nums];
	return data
	.map(grid => grid.split('\r\n')
		.map(e => e.trim().replace(/ +/g, ',').split(',').map(e => ({'v': e, 'm' : false}))));
}

let grids = parse();

const a = () => {
	let hStrokes = new Array(grids.length).fill(0);
	let vStrokes = new Array(grids.length).fill(0);

	let n;
	let winner;

	while (!winner) {
		n = cp.shift();
		grids = grids.map(grid =>
			grid.map(row =>
				row.map(col => !col.m && col.v == n ? {'v': n, 'm': true} : col))
		);

		hStrokes = grids.map((grid, i) =>
			grid.map(row => row.reduce((a, b) => a + ~~b.m, 0))
		);

		vStrokes = grids.map((grid, i) =>
			grid[0].map((_, col) =>
				grid.reduce((a, b, row) =>
					a + ~~grid[row][col].m, 0
				)
			)
		);

		for (let i = 0; i < grids.length; i++) {
			if (vStrokes[i].includes(vStrokes[i].length) || hStrokes[i].includes(hStrokes[i].length))
				winner = grids[i];
		}
	}

	console.log(winner.flat().reduce((a, b) => a + (!b.m ? ~~b.v : 0), 0) * n);
}

const b = () => {
	let hStrokes = new Array(grids.length).fill(0);
	let vStrokes = new Array(grids.length).fill(0);

	let n;
	let winningN;
	let winners = [];

	while (cp.length) {
		n = cp.shift();
		grids = grids.map((grid, i) =>
			grid.map(row =>
				row.map(col => !winners.includes(i) && !col.m && col.v == n ? {'v': n, 'm': true} : col))
		);

		hStrokes = grids.map((grid, i) =>
			grid.map(row => row.reduce((a, b) => a + ~~b.m, 0))
		);

		vStrokes = grids.map((grid, i) =>
			grid[0].map((_, col) =>
				grid.reduce((a, b, row) =>
					a + ~~grid[row][col].m, 0
				)
			)
		);

		for (let i = 0; i < grids.length; i++) {
			if (!winners.includes(i))
				if (vStrokes[i].includes(vStrokes[i].length) || hStrokes[i].includes(hStrokes[i].length)) {
					winners.push(i);
					winningN = n;
				}
		}
	}

	console.log(grids[winners[winners.length - 1]].flat().reduce((a, b) => a + (!b.m ? ~~b.v : 0), 0) * winningN);
}

a();

grids = parse();

b();