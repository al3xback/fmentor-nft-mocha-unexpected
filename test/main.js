import expect from 'unexpected';
import jsdom from 'jsdom';
import got from 'got';

const { JSDOM } = jsdom;

const url = 'https://al3xback.github.io/fmentor-nft-mocha-unexpected/';

const getData = () => {
	return got(url)
		.then((res) => {
			const { document } = new JSDOM(res.body).window;
			return document;
		})
		.catch((err) => {
			throw new Error(err);
		});
};

describe('DOM', () => {
	beforeEach(async () => {
		try {
			const document = await getData();
			global.document = document;

			const isElContainText = (elName, text) => {
				if (!elName || !text) {
					return;
				}

				const el = document.querySelector(`.${elName}`);
				const elContent = el.textContent.replace(/\n|\t/g, '');
				return elContent.indexOf(text) !== -1;
			};
			global.isElContainText = isElContainText;
		} catch (err) {
			console.log(err);
		}
	});

	it("should return undefined if there's no argument inside 'isElementContainText' function", () => {
		const result = isElContainText();
		expect(result, 'to be', undefined);
	});

	it("should have 'Equilibrium' text in the 'card__title' class element", () => {
		const isElementContainText = isElContainText(
			'card__title',
			'Equilibrium'
		);
		expect(isElementContainText, 'to be', true);
	});

	it("should have 'Equilibrium collection' text in the 'card__desc' class element", () => {
		const isElementContainText = isElContainText(
			'card__desc',
			'Equilibrium collection'
		);
		expect(isElementContainText, 'to be', true);
	});

	it("should have 'ETH' text in the 'card__stats-list-item' class element", () => {
		const isElementContainText = isElContainText(
			'card__stats-list-item',
			'ETH'
		);
		expect(isElementContainText, 'to be', true);
	});

	it("should have 'Jules Wyvern' text in the 'card__author' class element", () => {
		const isElementContainText = isElContainText(
			'card__author',
			'Jules Wyvern'
		);
		expect(isElementContainText, 'to be', true);
	});
});
