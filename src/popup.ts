export class Popup {
	memo: string;
	article: HTMLElement;
	wrapper: HTMLElement;
	exitButton: HTMLButtonElement;
	constructor(memo: string) {
		this.memo = memo;

		const rawFile: XMLHttpRequest = new XMLHttpRequest();
		rawFile.open('GET', `${this.memo}.html`, true);
		rawFile.onreadystatechange = () => {
			if (rawFile.readyState === 4) {
				if (rawFile.status === 200 || rawFile.status == 0) {
					const allText = rawFile.responseText;
					this.createPopup(allText);
				} else {
					this.closePopup();
				}
			}
		};
		rawFile.send(null);

		this.wrapper = document.createElement('div');
		this.wrapper.setAttribute(
			'style',
			'width: 1000px; height: 100vh; background-color: #cccccccc; z-index: 100; position: absolute; top: 0; margin: 0; padding: 50px 150px; display: flex;',
		);

		this.article = document.createElement('article');
		this.article.setAttribute('style', 'width: 600px; height: 80vh; padding: 50px; background-color: yellow');

		this.exitButton = document.createElement('button');
		this.exitButton.setAttribute(
			'style',
			'width: 50px; height: 30px; position: absolute; right: 30px; top: 20px; z-index: 150;',
		);
		this.exitButton.innerHTML = 'x';
		this.exitButton.onclick = this.closePopup.bind(this);
		this.wrapper.addEventListener(
			'click',
			(event) => {
				if (event.target !== this.article) this.closePopup();
			},
			false,
		);
	}

	createPopup(allText: string) {
		this.article.innerHTML = allText;
		this.wrapper.appendChild(this.article);
		this.wrapper.appendChild(this.exitButton);

		document.body.appendChild(this.wrapper);
	}
	closePopup() {
		document.querySelector('canvas')?.dispatchEvent(new Event('closePopup', { bubbles: true }));
		this.wrapper.remove();
	}
}
