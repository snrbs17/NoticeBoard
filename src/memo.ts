export type location = {
	x: number;
	y: number;
};
export class Memo {
	ctx: CanvasRenderingContext2D;
	location: location;
	size: number;
	path: Path2D;
	name: string;
	constructor(name: string, ctx: CanvasRenderingContext2D, location: location, size: number) {
		this.name = name;
		this.ctx = ctx;
		this.location = location;
		this.size = size;
		this.path = new Path2D();
	}

	onclickHandler(x: number, y: number): string {
		console.log(this.name);
		if (this.ctx.isPointInPath(this.path, x, y)) return this.name;
		return '';
	}
	resize() {}

	draw(time: number): void {
		const SHADOW_LENGTH: number = 2;
		let motionSpeed: number = 0.002;
		let motionLength = 3 + Math.sin(time * motionSpeed);
		this.ctx.beginPath();
		this.ctx.fillStyle = '#222';
		this.ctx.moveTo(this.location.x, this.location.y);
		this.ctx.lineTo(
			this.location.x + this.size + (SHADOW_LENGTH * motionLength) / 2,
			this.location.y + (SHADOW_LENGTH * motionLength) / 2,
		);
		this.ctx.lineTo(
			this.location.x + this.size + SHADOW_LENGTH * motionLength,
			this.location.y + this.size + SHADOW_LENGTH * motionLength,
		);
		this.ctx.lineTo(
			this.location.x + (SHADOW_LENGTH * motionLength) / 4,
			this.location.y + this.size + (SHADOW_LENGTH * motionLength) / 4,
		);
		this.ctx.closePath();
		this.ctx.fill();

		this.ctx.beginPath();
		let grd: CanvasGradient = this.ctx.createLinearGradient(
			this.location.x,
			this.location.y,
			this.location.x + this.size,
			this.location.y + this.size,
		);
		grd.addColorStop(0, '#ffff00');
		grd.addColorStop(1, '#cccc00');
		this.ctx.fillStyle = grd;
		this.ctx.moveTo(this.location.x, this.location.y);
		this.ctx.lineTo(this.location.x + this.size - motionLength / 2, this.location.y);
		this.ctx.lineTo(this.location.x + this.size - motionLength, this.location.y + this.size - motionLength);
		this.ctx.lineTo(this.location.x, this.location.y + this.size - motionLength / 2);
		this.ctx.closePath();
		this.ctx.fill();

		this.path.moveTo(this.location.x, this.location.y);
		this.path.lineTo(this.location.x + this.size - motionLength / 2, this.location.y);
		this.path.lineTo(this.location.x + this.size - motionLength, this.location.y + this.size - motionLength);
		this.path.lineTo(this.location.x, this.location.y + this.size - motionLength / 2);
		this.path.closePath();

		this.ctx.beginPath();
		this.ctx.arc(this.location.x, this.location.y, 30, 0, Math.PI * 2, true);
		grd = this.ctx.createRadialGradient(
			this.location.x + 10,
			this.location.y - 10,
			10,
			this.location.x,
			this.location.y,
			30,
		);
		grd.addColorStop(0, '#ff4444');
		grd.addColorStop(1, '#ff0000');
		this.ctx.fillStyle = grd;
		this.ctx.fill();

		this.ctx.beginPath();
		this.ctx.fillStyle = 'black';
		this.ctx.font = '100px serif';
		this.ctx.fillText(this.name, this.location.x + this.size / 4, this.location.y + this.size - 40);
	}
}
