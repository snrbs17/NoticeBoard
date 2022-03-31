import { NoticeBoard } from './noticeBoard';
import { Memo } from './memo';
import { Popup } from './popup';

type eventController = {
	x: number;
	y: number;
	state: 'running' | 'pending' | 'wait';
	content?: string;
};
const TIME_TO_READ: number = 2000;
class App {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	stageWidth: number;
	stageHeight: number;
	noticeBoard: NoticeBoard;
	memoList: Memo[];
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
		this.memoList = [];
		let i = 1;
		fetch('http://localhost:3000/dbFind')
			.then((response) => response.json())
			.then((res) =>
				res.forEach((memo: any) => {
					if (memo?.url) {
						this.memoList.push(new Memo(memo.name, this.ctx, { x: 300 * i++, y: 200 }, 200));
					}
				}),
			);

		requestAnimationFrame(this.animate.bind(this));
	}
	clickCanvas(event: MouseEvent): void {
		if (!event) return;
		const x = event.clientX;
		const y = event.clientY;
		if (this.showDocument.state == 'wait') this.showDocument = { x, y, state: 'pending' };
	}

	handlePopupPendingState() {
		const selectedMemoCandidates: string[] = [];
		this.memoList.forEach((memo) => {
			const selected = memo.onclickHandler(this.showDocument.x, this.showDocument.y);
			console.log(selected);
			selectedMemoCandidates.push(selected);
		});
		const selectedMemo = selectedMemoCandidates.find((x) => !!x);
		console.log(selectedMemo);
		if (!selectedMemo) {
			this.showDocument.state = 'wait';
			return;
		}
		this.showDocument.content = selectedMemo;
		this.popup = new Popup(selectedMemo);
		this.showDocument.state = 'running';
		setTimeout(() => {
			this.requestDBInsert(selectedMemo);
		}, TIME_TO_READ);
	}
	requestDBInsert(name: string): void {
		if (this.showDocument.state === 'running') {
			fetch('http://localhost:3000/dbInsert', {
				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				headers: { 'Content-Type': 'application/json' },
				body: `{"name": "${name}"}`,
			});
		}
	}

	resize(): void {
		this.stageWidth = window.innerWidth;
		this.stageHeight = window.innerHeight;
		this.canvas.width = this.stageWidth;
		this.canvas.height = this.stageHeight;

		// this.noticeBoard?.resize(this.stageWidth, this.stageHeight);
	}

	animate(t: any): void {
		this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

		this.noticeBoard.draw();
		this.memoList.forEach((memo) => memo.draw(t));

		if (this.showDocument.state === 'pending') {
			this.handlePopupPendingState();
		}

		requestAnimationFrame(this.animate.bind(this));
	}
}

window.onload = () => new App();
