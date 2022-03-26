export class Popup {
	memo: string;
	article: HTMLElement;
	exitButton: HTMLButtonElement;
	constructor(memo: string) {
		this.memo = memo;
		this.article = document.createElement('article');
		this.article.setAttribute(
			'style',
			'width: 1000px; height: 100vh; background-color: #cccccccc; z-index: 100; position: absolute; top: 0; margin: 0; padding: 0; display: flex;',
		);
		this.article.innerHTML = memo;

		this.exitButton = document.createElement('button');
		this.exitButton.setAttribute(
			'style',
			'width: 50px; height: 30px; position: absolute; right: 30px; top: 20px; z-index: 150;',
		);
		this.exitButton.innerHTML = 'x';
		this.exitButton.onclick = this.closePopup.bind(this);
		this.article.appendChild(this.exitButton);

		document.body.appendChild(this.article);
	}

	closePopup() {
		document.querySelector('canvas')?.dispatchEvent(new Event('closePopup', { bubbles: true }));
		this.article.remove();
	}
}
