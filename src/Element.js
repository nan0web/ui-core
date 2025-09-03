/**
 * @file Element — модель декларативного UI-блоку.
 * Формат: { Button: [...], $variant: 'info', $onClick: fn }
 * Агностична до фреймворку.
 */

export default class Element {
	/** @type {Record<string, string | ((val: any, key: string) => Record<string, any>)>} */
	static PROP_ALIASES = {
		$class: 'className',
		$for: 'htmlFor',
		$aria: (val, key) => ({ [key.slice(1).replace(/([A-Z])/g, '-$1').toLowerCase()]: val }), // $ariaLabel → aria-label
		$on: (val, key) => ({ [key.slice(1).toLowerCase()]: val }) // $onClick → onclick
	}

	/**
	 * Тип компонента або HTML-тегу (наприклад, "Button", "div")
	 * @type {string}
	 */
	type

	/**
	 * Вміст елемента.
	 * Може бути:
	 *   - рядок → текст
	 *   - true → порожній
	 *   - масив → вкладені блоки { Icon } або текстові елементи
	 * @type {string | true | any[]}
	 */
	content

	/**
	 * Пропси (властивості), видобуті з $-ключів.
	 * Наприклад, { $onClick: fn, $variant: 'info' } → { onClick: fn, variant: 'info' }
	 * @type {Object}
	 */
	props

	/**
	 * Створює `Element` із декларативного блоку.
	 * @param {Object} input - Наприклад, { Button: ["Натисни"], $variant: "primary" }
	 */
	constructor(input = {}) {
		const tags = Element.extractTags(input)
		const [type, content] = tags[0] || ['div', '']
		this.type = type
		this.content = content === true ? [] : content
		this.props = Element.extractProps(input, true, Element.parseProp.bind(Element))
	}

	/**
	 * Чи містить елемент вкладені елементи (а не тільки текст).
	 * @returns {boolean}
	 */
	hasChildren() {
		return Array.isArray(this.content) && this.content.some(c => typeof c === 'object' && !Array.isArray(c))
	}

	/**
	 * Чи містить вміст текстові фрагменти.
	 * @returns {boolean}
	 */
	hasText() {
		return typeof this.content === 'string' ||
			(Array.isArray(this.content) && this.content.some(c => typeof c === 'string'))
	}

	/**
	 * Повертає масив вкладених елементів (екземплярів `Element`).
	 * @returns {Element[]}
	 */
	getChildElements() {
		if (!this.hasChildren()) return []
		return /** @type {any[]} */ (this.content)
			.filter(item => typeof item === 'object' && item && !Array.isArray(item))
			.map(item => Element.from(item))
	}

	/**
	 * Фабричний метод створення екземплярів.
	 * @param {Object} input
	 * @returns {Element}
	 */
	static from(input) {
		if (input instanceof Element) return input
		return new Element(input)
	}

	/**
	 * Парсер $-пропсів.
	 * Перетворює, наприклад:
	 *   - $style="color:red;font-size:14px" → { style: { color: 'red', 'font-size': '14px' } }
	 *   - $onClick=fn → { onClick: fn }
	 *   - $ariaHidden=true → { 'aria-hidden': true }
	 *
	 * @param {string} key - Назва пропсу
	 * @param {any} value - Значення
	 * @returns {Object} - Об’єкт { propName: newVal }
	 */
	static parseProp(key, value) {
		if (key === '$style' && typeof value === 'string') {
			return { style: this.parseInlineStyle(value) }
		}

		if (key.startsWith('$aria')) {
			const ariaKey = key.slice(5).replace(/([A-Z])/g, '$1').toLowerCase()
			return { [`aria-${ariaKey}`]: value }
		}

		if (key.startsWith('$on') && key.length > 3) {
			return { [key.slice(1).toLowerCase()]: value }
		}

		const propAlias = this.PROP_ALIASES[key]
		if (typeof propAlias === 'string') {
			return { [propAlias]: value }
		}

		if (typeof propAlias === 'function') {
			return propAlias(value, key)
		}

		if (key.startsWith('$')) {
			return { [key.slice(1)]: value }
		}

		return { [key]: value }
	}

	/**
	 * Парсить рядковий стиль (формат CSS).
	 * @param {string} styleStr
	 * @returns {Object}
	 */
	static parseInlineStyle(styleStr) {
		return styleStr.split(';').reduce((style, rule) => {
			const [key, val] = rule.trim().split(':')
			if (key && val) style[key.trim()] = val.trim()
			return style
		}, {})
	}

	/**
	 * Видобуває $-пропси з блоку.
	 * @param {Object} block
	 * @param {boolean} keep$ - Залишити `$` у ключах
	 * @param {Function} [flatMap] - Функція, що перетворює пару (ключ, значення) → { newKey: newVal }
	 * @returns {Object}
	 */
	static extractProps(block, keep$ = false, flatMap = undefined) {
		const entries = Object.entries(block)
			.filter(([k]) => k.startsWith('$'))
			.map(([k, v]) => [keep$ ? k : k.slice(1), v])

		if (typeof flatMap === 'function') {
			return Object.fromEntries(entries.flatMap(([k, v]) => Object.entries(flatMap(k, v))))
		}

		return Object.fromEntries(entries)
	}

	/**
	 * Видобуває теги (непрефіксовані ключі) з блоку.
	 * @param {Object} block
	 * @returns {Array<[string, any]>}
	 */
	static extractTags(block) {
		return Object.entries(block).filter(([k]) => !k.startsWith('$'))
	}
}
