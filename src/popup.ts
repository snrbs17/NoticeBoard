export class Popup {
	memo: string;
	article: HTMLElement;
	wrapper: HTMLElement;
	exitButton: HTMLButtonElement;
	constructor(memo: string) {
		this.memo = memo;

		this.wrapper = document.createElement('div');
		this.wrapper.setAttribute(
			'style',
			'width: 1000px; height: 100vh; background-color: #cccccccc; z-index: 100; position: absolute; top: 0; margin: 0; padding: 0; display: flex;',
		);
		this.article = document.createElement('article');

		const rawFile = new XMLHttpRequest();
		rawFile.open('GET', 'AI.html', true);
		rawFile.onreadystatechange = () => {
			if (rawFile.readyState === 4) {
				if (rawFile.status === 200 || rawFile.status == 0) {
					const allText = rawFile.responseText;
					console.log(allText);
					this.article.innerHTML = allText;
				}
			}
		};
		rawFile.send(null);

		this.wrapper.appendChild(this.article);

		this.exitButton = document.createElement('button');
		this.exitButton.setAttribute(
			'style',
			'width: 50px; height: 30px; position: absolute; right: 30px; top: 20px; z-index: 150;',
		);
		this.exitButton.innerHTML = 'x';
		this.exitButton.onclick = this.closePopup.bind(this);
		this.wrapper.appendChild(this.exitButton);

		document.body.appendChild(this.wrapper);
	}

	closePopup() {
		document.querySelector('canvas')?.dispatchEvent(new Event('closePopup', { bubbles: true }));
		this.wrapper.remove();
	}
}
