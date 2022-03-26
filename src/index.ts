import { NoticeBoard } from './noticeBoard';
import Style from './style.module.css';
import { Memo, location } from './memo';
import { Popup } from './popup';

type eventController = {
	x: number;
	y: number;
	state: 'running' | 'pending' | 'wait';
	content?: string;
};
class App {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	stageWidth: number;
	stageHeight: number;
	noticeBoard: NoticeBoard;
	memo: Memo;
	popup?: Popup;
	showDocument: eventController;

	constructor() {
		this.canvas = document.createElement('canvas');
		this.canvas.setAttribute('style', 'width: 100%; height: 100%; background-color: #222');
		this.canvas.onclick = this.clickCanvas.bind(this);
		this.canvas.addEventListener(
			'closePopup',
			() => {
				this.showDocument.state = 'wait';
			},
			true,
		);
		this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

		this.stageWidth = 0;
		this.stageHeight = 0;

		this.showDocument = { x: 0, y: 0, state: 'wait' };

		document.body.appendChild(this.canvas);

		window.addEventListener('resize', this.resize.bind(this), false);
		this.resize();

		this.noticeBoard = new NoticeBoard(this.ctx, this.stageWidth, this.stageHeight);
		this.memo = new Memo(this.ctx, { x: 300, y: 200 }, 200);

		requestAnimationFrame(this.animate.bind(this));
	}
	clickCanvas(event: MouseEvent): void {
		if (!event) return;
		const x = event.clientX;
		const y = event.clientY;
		if (this.showDocument.state == 'wait') this.showDocument = { x, y, state: 'pending' };
	}
	popupEvent(event: MouseEvent): void {}

	resize(): void {
		this.stageWidth = window.innerWidth;
		this.stageHeight = window.innerHeight;
		this.canvas.width = this.stageWidth;
		this.canvas.height = this.stageHeight;

		this.noticeBoard?.resize(this.stageWidth, this.stageHeight);
	}

	animate(t: any): void {
		this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

		this.noticeBoard.draw();
		this.memo.draw(t);
		if (this.showDocument.state == 'pending') {
			const selectedMemo: string = this.memo.onclickHandler(this.showDocument.x, this.showDocument.y);
			if (!selectedMemo) {
				this.showDocument.state = 'wait';
			} else {
				this.showDocument.content = selectedMemo;
				this.popup = new Popup(selectedMemo);
				this.showDocument.state = 'running';
			}
		}

		requestAnimationFrame(this.animate.bind(this));
	}
}

window.onload = () => new App();

document.body.addEventListener('closePopup', () => console.log('body listened closePopup'));
