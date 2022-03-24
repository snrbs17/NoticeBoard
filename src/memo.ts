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

	draw(time: number) {
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
		this.ctx.fillStyle = 'yellow';
		this.ctx.moveTo(this.location.x, this.location.y);
		this.ctx.lineTo(this.location.x + this.size - motionLength / 2, this.location.y);
		this.ctx.lineTo(this.location.x + this.size - motionLength, this.location.y + this.size - motionLength);
		this.ctx.lineTo(this.location.x, this.location.y + this.size - motionLength / 2);
		this.ctx.closePath();
		this.ctx.fill();

		this.ctx.beginPath();
		this.ctx.arc(this.location.x, this.location.y, 30, 0, Math.PI * 2, true);
		const grd: CanvasGradient = this.ctx.createRadialGradient(
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
		this.ctx.fillText('AI', this.location.x + this.size / 4, this.location.y + this.size - 40);
	}
}
