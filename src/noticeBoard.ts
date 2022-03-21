export class NoticeBoard {
	stageWidth: number;
	stageHeight: number;
	ctx: CanvasRenderingContext2D;

	constructor(ctx: CanvasRenderingContext2D, stageWidth: number, stageHeight: number) {
		this.ctx = ctx;
		this.stageWidth = stageWidth;
		this.stageHeight = stageHeight;
	}

	resize(stageWidth: number, stageHeight: number) {
		this.stageWidth = stageWidth;
		this.stageHeight = stageHeight;
	}

	draw() {
		const FRAME_WIDTH = this.stageWidth / 50;
		const blankX = this.stageWidth / 10;
		const blankY = this.stageHeight / 10;
		this.ctx.beginPath();
		this.ctx.moveTo(blankX, blankY);
		this.ctx.lineTo(this.stageWidth - blankX, blankY);
		this.ctx.lineTo(this.stageWidth - blankX, this.stageHeight - blankY);
		this.ctx.lineTo(blankX, this.stageHeight - blankY);
		this.ctx.closePath();
		this.ctx.fillStyle = 'tomato';
		this.ctx.fill();

		this.ctx.beginPath();
		this.ctx.moveTo(blankX + FRAME_WIDTH, blankY + FRAME_WIDTH);
		this.ctx.lineTo(this.stageWidth - blankX - FRAME_WIDTH, blankY + FRAME_WIDTH);
		this.ctx.lineTo(this.stageWidth - blankX - FRAME_WIDTH, this.stageHeight - blankY - FRAME_WIDTH);
		this.ctx.lineTo(blankX + FRAME_WIDTH, this.stageHeight - blankY - FRAME_WIDTH);
		this.ctx.closePath();
		this.ctx.fillStyle = 'green';
		this.ctx.fill();
	}
}
