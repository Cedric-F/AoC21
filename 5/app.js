import { readFile } from 'fs/promises'
const input = await readFile('./input', 'utf8');

const Point = class {
	constructor (coord = {'x': 0, 'y': 0}) {
		this.x = ~~coord[0];
		this.y = ~~coord[1];
		this.val = 0;
	}

	increment() {
		this.val++;
	}
}

const Grid = class {
	constructor (size) {
		this.width = size.w;
		this.height = size.h;
		this.marks = [... new Array(this.height)]
			.map((_, y) => [... new Array(this.width)]
				.map((_, x) => new Point([x, y])));
	}

	get(x, y) {
		return this.marks[y][x];
	}

	markRow(y, xA, xB) {
		for (let x = Math.min(xA, xB); x <= Math.max(xA, xB); x++)
			this.get(x, y).increment();
	}

	markCol(x, yA, yB) {
		for (let y = Math.min(yA, yB); y <= Math.max(yA, yB); y++)
			this.get(x, y).increment();
	}

	markDiag(u, v) {
		let x = [];
		let y = [];
		if (u.x < v.x)
			for (let i = u.x; i <= v.x; i++)
				x.push(i);
		else
			for (let i = u.x; i >= v.x; i--)
				x.push(i)
		if (u.y < v.y)
			for (let i = u.y; i <= v.y; i++)
				y.push(i);
		else
			for (let i = u.y; i >= v.y; i--)
				y.push(i);
		for (let i = 0; i < x.length; i++) {
			this.get(x[i], y[i]).increment();
		}
	}

	mark(u, v) {
		u.x == v.x ? this.markCol(u.x, u.y, v.y) : u.y == v.y ? this.markRow(u.y, u.x, v.x) : this.markDiag(u, v);
	}

	print() {
		let gridView = [];
		gridView = this.marks.map((y, i) => y.map(p => p.val).join('').replace(/0/g, '.')).join('\n')
		console.log(gridView);
	}

	lineCross() {
		console.log(this.marks.flat().filter(e => e.val > 1).length)
	}
}

const data = input.split`\r\n`.map(e => e.split(' -> ').map(e => new Point(e.split(','))));

const maxWidth = Math.max(... data.flat().map(e => e.x)) + 1
const maxHeight = Math.max(... data.flat().map(e => e.y)) + 1

const grid = new Grid({'w': maxWidth, 'h': maxHeight});
data.forEach(e => grid.mark(e[0], e[1]));
//grid.print();
grid.lineCross();