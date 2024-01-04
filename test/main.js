import expect from 'unexpected';
import jsdom from 'jsdom';
import got from 'got';

const { JSDOM } = jsdom;

const url = 'https://al3xback.github.io/fmentor-nft-flex/';

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

			const isElementContainText = (elName, text) => {
				if (!elName || !text) {
					return;
				}

				const element = document.querySelector(`.${elName}`);
				const elementContent = element.textContent.replace(
					/\n|\t/g,
					''
				);
				return elementContent.indexOf(text) !== -1;
			};
			global.isElementContainText = isElementContainText;
		} catch (err) {
			console.log(err);
		}
	});

	it("should return undefined if there's no argument inside 'isElementContainText' function", () => {
		const result = isElementContainText();
		expect(result, 'to be', undefined);
	});

	it("should have 'Equilibrium' text in the 'card__title' class element", () => {
		const isContainText = isElementContainText(
			'card__title',
			'Equilibrium'
		);
		expect(isContainText, 'to be', true);
	});

	it("should have 'Equilibrium collection' text in the 'card__desc' class element", () => {
		const isContainText = isElementContainText(
			'card__desc',
			'Equilibrium collection'
		);
		expect(isContainText, 'to be', true);
	});

	it("should have 'ETH' text in the 'card__stats-list-item' class element", () => {
		const isContainText = isElementContainText(
			'card__stats-list-item',
			'ETH'
		);
		expect(isContainText, 'to be', true);
	});

	it("should have 'Jules Wyvern' text in the 'card__author' class element", () => {
		const isContainText = isElementContainText(
			'card__author',
			'Jules Wyvern'
		);
		expect(isContainText, 'to be', true);
	});
});
