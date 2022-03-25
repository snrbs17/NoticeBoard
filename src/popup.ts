export class Popup {
	memo: string;
	article: HTMLElement;
	constructor(memo: string) {
		this.memo = memo;
		this.article = document.createElement('article');
		this.article.setAttribute(
			'style',
			'width: 1000px; height: 100vh; background-color: #cccccccc; z-index: 100; position: absolute; top: 0; margin: 0; padding: 0; display: flex;',
		);
		this.article.innerHTML = memo;

		document.body.append(this.article);
	}

	draw() {}
}
