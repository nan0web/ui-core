import Navigation from "./Navigation.js"
import Element from "../Element.js"

export default class Document {
	/**
	 * Content configuration for the document page.
	 * @type {Element[]}
	 */
	$content = []
	/** @type {string} */
	$lang = "en"
	/** @type {Navigation} */
	nav = new Navigation()

	/**
	 * @param {object} [input]
	 * @param {Array<object>} [input.$content=[]]
	 * @param {string} [input.$lang="en"]
	 * @param {any} [input.nav=new Navigation()]
	 */
	constructor(input = {}) {
		const {
			$content = this.$content,
			$lang = this.$lang,
			nav = this.nav
		} = input
		this.$content = Array.from($content).map(c => Element.from(c))
		this.$lang = String($lang)
		this.nav = Navigation.from(nav)
	}

	/**
	 * @param {object} input
	 * @returns {Document}
	 */
	static from(input) {
		if (input instanceof Document) return input
		return new Document(input)
	}

	/**
	 * @param {string} type
	 * @returns {Array<object>}
	 */
	getBlocksByType(type) {
		return this.$content.filter(block => block[type] !== undefined)
	}
}
