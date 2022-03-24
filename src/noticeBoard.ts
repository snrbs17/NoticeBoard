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
		this.ctx.fillStyle = 'tomato';
		this.ctx.fillRect(blankX, blankY, this.stageWidth - 2 * blankX, this.stageHeight - 2 * blankY);
		this.ctx.fill();

		this.ctx.beginPath();
		this.ctx.fillStyle = 'green';
		this.ctx.fillRect(
			blankX + FRAME_WIDTH,
			blankY + FRAME_WIDTH,
			this.stageWidth - 2 * (blankX + FRAME_WIDTH),
			this.stageHeight - 2 * (blankY + FRAME_WIDTH),
		);
		this.ctx.fill();
	}
}
