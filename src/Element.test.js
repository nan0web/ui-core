import { describe, it } from 'node:test'
import { strict as assert } from 'node:assert'
import Element from './Element.js'
import { processI18n } from './utils/processI18n.js'

describe('Element', () => {
	// Test data
	const testData = [
		{
			name: 'should correctly parse basic element structure',
			input: { Button: ['Click me'], $variant: 'primary' },
			expected: {
				type: 'Button',
				content: ['Click me'],
				props: { variant: 'primary' }
			}
		},
		{
			name: 'should handle text content as string',
			input: { div: 'Hello world' },
			expected: {
				type: 'div',
				content: 'Hello world',
				props: {}
			}
		},
		{
			name: 'should handle true content as empty array',
			input: { span: true },
			expected: {
				type: 'span',
				content: [],
				props: {}
			}
		},
		{
			name: 'should extract aria props correctly',
			input: { button: true, $ariaLabel: 'Submit form' },
			expected: {
				type: 'button',
				content: [],
				props: { 'aria-label': 'Submit form' }
			}
		},
		{
			name: 'should extract event handlers correctly',
			input: { div: 'Test', $onClick: () => { } },
			expected: {
				type: 'div',
				content: 'Test',
				props: { onClick: () => { } }
			}
		},
		{
			name: 'should parse inline styles correctly',
			input: { div: 'Styled', $style: 'color:red;font-size:14px' },
			expected: {
				type: 'div',
				content: 'Styled',
				props: { style: { color: 'red', 'font-size': '14px' } }
			}
		}
	]

	// Loop through test cases
	testData.forEach(({ name, input, expected }) => {
		it(name, () => {
			const element = new Element(input)

			assert.equal(element.type, expected.type)
			assert.deepEqual(element.content, expected.content)

			// Special handling for functions in props
			if (expected.props.onClick) {
				assert.equal(typeof element.props.onClick, 'function')
				delete expected.props.onClick
				delete element.props.onClick
			}

			// Special handling for nested objects
			if (expected.props.style) {
				assert.deepEqual(element.props.style, expected.props.style)
				delete expected.props.style
				delete element.props.style
			}

			// Special handling for aria attributes
			if (expected.props['aria-label']) {
				assert.equal(element.props['aria-label'], expected.props['aria-label'])
				delete expected.props['aria-label']
				delete element.props['aria-label']
			}

			assert.deepEqual(element.props, expected.props)
		})
	})

	it('should return true for hasChildren when there are nested objects', () => {
		const element = new Element({ div: [{ span: 'child' }] })
		assert.equal(element.hasChildren(), true)
	})

	it('should return false for hasChildren when there are no nested objects', () => {
		const element = new Element({ div: 'text only' })
		assert.equal(element.hasChildren(), false)
	})

	it('should return true for hasText when content contains strings', () => {
		const element = new Element({ div: 'some text' })
		assert.equal(element.hasText(), true)
	})

	it('should return false for hasText when content has no strings', () => {
		const element = new Element({ div: [{ span: 'child' }] })
		assert.equal(element.hasText(), false)
	})

	it('should convert child items to Element instances via getChildElements', () => {
		const element = new Element({ div: [{ span: 'child' }, 'text', 42] })
		const children = element.getChildElements()

		assert.equal(children.length, 1)
		assert.equal(children[0] instanceof Element, true)
		assert.equal(children[0].type, 'span')
		assert.equal(children[0].content, 'child')
	})

	it('should use static from method to create or return existing Element', () => {
		const inputObj = { p: 'paragraph' }
		const existingElement = new Element(inputObj)

		const fromNew = Element.from(inputObj)
		const fromExisting = Element.from(existingElement)

		assert.equal(fromNew instanceof Element, true)
		assert.equal(fromExisting instanceof Element, true)
		assert.equal(fromExisting, existingElement)
	})

	it("should parse $ariaLabel properly", () => {
		const input = { button: "Hello", $ariaLabel: "Hello" }
		const el = Element.from(input)
		assert.equal(el.props['aria-label'], "Hello")
	})

	it("should parse $onClick and $onKeyDown properly", () => {
		const input = { button: "Hello", $onClick: () => {}, $onKeyDown: () => {} }
		const el = Element.from(input)
		assert.ok(el.props.onClick)
		assert.ok(el.props.onKeyDown)
	})

	it("should process i18n when $t key is present", () => {
		const input = { $t: 'greetings.hello' }
		const t = (key) => key === 'greetings.hello' ? 'Привіт!' : key
		const processed = processI18n(input, t)
		assert.equal(processed, 'Привіт!')
	})

	it("should correctly process variable substitution in text content", () => {
		const input = ['User: {{name}}, Age: {{age}}']
		const data = { name: 'Іван', age: '30' }
		const processed = input.map(c => typeof c === 'string' ? processI18n(c, null, data) : c)
		assert.deepEqual(processed, ['User: Іван, Age: 30'])
	})

	it("should correctly process variable substitution in string content", () => {
		const input = 'User: {{name}}, Age: {{age}}'
		const data = { name: 'Іван', age: '30' }
		const processed = processI18n(input, null, data)
		assert.equal(processed, 'User: Іван, Age: 30')
	})
})
