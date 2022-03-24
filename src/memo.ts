export type location = {
	x: number;
	y: number;
};
export class Memo {
	ctx: CanvasRenderingContext2D;
	location: location;
	size: number;
	constructor(ctx: CanvasRenderingContext2D, location: location, size: number) {
		this.ctx = ctx;
		this.location = location;
		this.size = size;
	}

	resize() {}

	draw() {
		this.ctx.beginPath();
		this.ctx.fillStyle = 'yellow';
		this.ctx.fillRect(this.location.x, this.location.y, this.size, this.size);
		this.ctx.moveTo(this.location.x, this.location.y);
		this.ctx.lineTo(this.location.x + this.size, this.location.y);
		this.ctx.lineTo(this.location.x + this.size, this.location.y + this.size);
		this.ctx.lineTo(this.location.x, this.location.y + this.size);
		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.beginPath();
		this.ctx.arc(this.location.x, this.location.y, 30, 0, Math.PI * 2, true);
		this.ctx.fillStyle = 'red';
		this.ctx.fill();
		this.ctx.beginPath();
		this.ctx.fillStyle = 'black';
		this.ctx.font = '100px serif';
		this.ctx.fillText('AI', this.location.x + this.size / 4, this.location.y + this.size - 40);
	}
}
