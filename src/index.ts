import { NoticeBoard } from './noticeBoard';
import { Memo } from './memo';
import { Popup } from './popup';

type eventController = {
	x: number;
	y: number;
	state: (params: any) => Promise<any>;
	// state: 'running' | 'pending' | 'wait';
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
		this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

		this.stageWidth = window.innerWidth;
		this.stageHeight = window.innerHeight;
		this.canvas.width = this.stageWidth;
		this.canvas.height = this.stageHeight;

		document.body.appendChild(this.canvas);

		this.showDocument = { x: 0, y: 0, state: () => new Promise((res, rej) => {}) };

		this.noticeBoard = new NoticeBoard(this.ctx, this.stageWidth, this.stageHeight);
		this.memoList = [];
		let i = 1;
		// fetch('http://localhost:3000/dbFind')
		// 	.then((response) => response.json())
		// 	.then((res) =>
		const res = [
			{ name: 'AI', url: 'AI.html' },
			{ name: 'css', url: 'css.html' },
			{ name: 'html', url: 'html.html' },
			{ name: 'docker', url: 'docker.html' },
		];
		res.forEach((memo: any) => {
			if (memo?.url) {
				this.memoList.push(new Memo(memo.name, this.ctx, { x: 300 * i++, y: 200 }, 200));
			}
		}),
			// );

			this.canvas.addEventListener('openPopup', () => {
				this.handlePopupPendingState();
			});
		this.canvas.addEventListener(
			'closePopup',
			() => {
				// need to update promise
				this.showDocument.state = () => new Promise((res, rej) => {});
			},
			true,
		);

		requestAnimationFrame(this.animate.bind(this));
	}

	clickCanvas(event: MouseEvent): void {
		if (!event) return;
		const x = event.clientX;
		const y = event.clientY;
		const state = (selectedMemo: string) =>
			new Promise((res, rej) => {
				selectedMemo ? res(console.log('success')) : rej(console.log('fail'));
			});
		this.showDocument = { x, y, state };

		document.querySelector('canvas')?.dispatchEvent(new Event('openPopup', { bubbles: true }));

		this.handlePopupPendingState;
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
		this.showDocument
			.state(selectedMemo)
			.then(() => {
				this.popup = new Popup(selectedMemo as string);

				setTimeout(() => {
					this.requestDBInsert(selectedMemo as string);
				}, TIME_TO_READ);
			})
			.catch((e) => {
				console.log(e);
			});
	}

	requestDBInsert(name: string): void {
		fetch('http://localhost:3000/dbInsert', {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			headers: { 'Content-Type': 'application/json' },
			body: `{"name": "${name}"}`,
		});
	}

	animate(t: any): void {
		this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

		this.noticeBoard.draw();
		this.memoList.forEach((memo) => memo.draw(t));

		requestAnimationFrame(this.animate.bind(this));
	}
}

window.onload = () => new App();
