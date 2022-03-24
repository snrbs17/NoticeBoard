import { NoticeBoard } from './noticeBoard';
import Style from './style.module.css';
import { Memo, location } from './memo';

class App {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	stageWidth: number;
	stageHeight: number;
	noticeBoard: NoticeBoard;
	memo: Memo;

	constructor() {
		this.canvas = document.createElement('canvas');
		this.canvas.setAttribute('style', 'width: 100%; height: 100%; background-color: #222');
		this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

		this.stageWidth = 0;
		this.stageHeight = 0;

		document.body.appendChild(this.canvas);

		window.addEventListener('resize', this.resize.bind(this), false);
		this.resize();

		this.noticeBoard = new NoticeBoard(this.ctx, this.stageWidth, this.stageHeight);
		this.memo = new Memo(this.ctx, { x: 300, y: 200 }, 200);

		requestAnimationFrame(this.animate.bind(this));
	}

	resize(): void {
		this.stageWidth = window.innerWidth;
		this.stageHeight = window.innerHeight;
		this.canvas.width = this.stageWidth;
		this.canvas.height = this.stageHeight;

		this.noticeBoard?.resize(this.stageWidth, this.stageHeight);
	}

	animate(t: any): void {
		// this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

		this.noticeBoard.draw();
		this.memo.draw(t);

		requestAnimationFrame(this.animate.bind(this));
	}
}

window.onload = () => new App();
