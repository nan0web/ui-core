import { describe, it, before, beforeEach } from "node:test"
import assert from "node:assert/strict"
import FS from "@nan0web/db-fs"
import { NoConsole } from "@nan0web/log"
import {
	DatasetParser,
	DocsParser,
	runSpawn,
} from "@nan0web/test"
import Element, { processI18n, tokens, getUserTheme, CustomTheme, DarkLightTheme } from "./index.js"

const fs = new FS()
let pkg

// Load package.json once before tests
before(async () => {
	const doc = await fs.loadDocument("package.json", {})
	pkg = doc || {}
})

let console = new NoConsole()

beforeEach((info) => {
	console = new NoConsole()
})

/**
 * Core test suite that also serves as the source for README generation.
 *
 * The block comments inside each `it` block are extracted to build
 * the final `README.md`. Keeping the comments here ensures the
 * documentation stays close to the code.
 */
function testRender() {
	/**
	 * @docs
	 * # @nan0web/ui-core
	 *
	 * <!-- %PACKAGE_STATUS% -->
	 *
	 * A library for creating framework-agnostic UI elements.
	 * Allows describing interfaces as simple objects.
	 *
	 * ## Description
	 *
	 * The `@nan0web/ui-core` package provides a minimal yet powerful foundation for
	 * framework-agnostic UI elements. It is designed to enable developers to describe
	 * UI components as declarative objects. Core classes and utilities:
	 *
	 * - `Element` — the main class for representing UI elements.
	 * - `processI18n` — utility for translating and substituting variables in content.
	 * - `tokens` — design system tokens for consistent UI styling.
	 * - `Theme` — base class for creating and organizing UI themes.
	 * - `getUserTheme` — function to select or create a custom theme.
	 *
	 * These are perfect for building design systems, themeable UI frameworks,
	 * and reusable component libraries.
	 *
	 * ## Installation
	 */
	it("How to install with npm?", () => {
		/**
		 * ```bash
		 * npm install @nan0web/ui-core
		 * ```
		 */
		assert.equal(pkg.name, "@nan0web/ui-core")
	})
	/**
	 * @docs
	 */
	it("How to install with pnpm?", () => {
		/**
		 * ```bash
		 * pnpm add @nan0web/ui-core
		 * ```
		 */
		assert.equal(pkg.name, "@nan0web/ui-core")
	})
	/**
	 * @docs
	 */
	it("How to install with yarn?", () => {
		/**
		 * ```bash
		 * yarn add @nan0web/ui-core
		 * ```
		 */
		assert.equal(pkg.name, "@nan0web/ui-core")
	})

	/**
	 * @docs
	 * ## Usage
	 *
	 * ### Basic Element Creation
	 *
	 * Elements can be created with a component type, content, and props.
	 */
	it("How to create a basic Element instance from object?", () => {
		//import Element from '@nan0web/ui-core'
		const element = new Element({
			Button: ["Click me"],
			$variant: "primary"
		})
		console.info(element.type)    // "Button"
		console.info(element.content) // ["Click me"]
		console.info(element.props)   // { variant: "primary" }
		assert.equal(element.type, "Button")
		assert.deepEqual(element.content, ["Click me"])
		assert.deepEqual(element.props, { variant: "primary" })
	})

	/**
	 * @docs
	 * ### Nested Elements
	 *
	 * Elements can include child elements as arrays.
	 */
	it("How to create nested Elements and check hasChildren()?", () => {
		//import Element from '@nan0web/ui-core'
		const element = new Element({
			div: [
				{ span: "Hello World" },
				{ Button: ["Submit"] }
			],
			$style: "color: blue; margin: 10px"
		})
		console.info(element.hasChildren()) // true
		console.info(element.getChildElements().length) // 2

		assert.equal(element.hasChildren(), true)
		assert.equal(element.getChildElements().length, 2)
	})

	/**
	 * @docs
	 * ### Aria Attributes
	 *
	 * Element handles $aria* props and converts them to aria-* attributes.
	 */
	it("How to parse aria attributes like $ariaLabel?", () => {
		//import Element from '@nan0web/ui-core'
		const element = new Element({
			button: "Close",
			$ariaLabel: "Close dialog"
		})
		console.info(element.props) // { "aria-label": "Close dialog" }
		assert.deepEqual(element.props, { "aria-label": "Close dialog" })
	})

	/**
	 * @docs
	 * ### Event Handlers
	 *
	 * Element recognizes $on* props as event handlers.
	 */
	it("How to parse event handlers like $onClick and $onKeyDown?", () => {
		//import Element from '@nan0web/ui-core'
		const handleClick = () => console.log("Clicked")
		const element = new Element({
			button: "Click me",
			$onClick: handleClick,
			$onKeyDown: () => {}
		})
		console.info(typeof element.props.onClick)
		console.info(typeof element.props.onKeyDown)
		assert.equal(console.output()[0][1], "function")
		assert.equal(console.output()[1][1], "function")
	})

	/**
	 * @docs
	 * ## i18n
	 *
	 * Elements support translations and variable substitution via `processI18n`.
	 */
	it("How to process translations with processI18n and $t?", () => {
		//import { processI18n } from '@nan0web/ui-core'
		const input = { $t: "greetings.hello" }
		const t = (key) => key === "greetings.hello" ? "Привіт!" : key
		const result = processI18n(input, t)
		console.info(result) // "Привіт!"
		assert.equal(console.output()[0][1], "Привіт!")
	})

	/**
	 * @docs
	 */
	it("How to substitute variables in text content with processI18n?", () => {
		//import { processI18n } from '@nan0web/ui-core'
		const text = "User: {{name}}, Age: {{age}}"
		const data = { name: "Іван", age: "30" }
		const result = processI18n(text, null, data)
		console.info(result) // "User: Іван, Age: 30"
		assert.equal(console.output()[0][1], "User: Іван, Age: 30")
	})

	/**
	 * @docs
	 * ## Playground: Try Before You Commit
	 */
	it("There is a CLI sandbox to experiment safely:", async () => {
		/**
		 * ```bash
		 * git clone https://github.com/nan0web/ui-core.git
		 * cd ui-core
		 * npm install
		 * npm run playground
		 * ```
		 */
		assert.ok(String(pkg.scripts?.playground).includes("playground"))
		const response = await runSpawn("git", ["remote", "get-url", "origin"])
		assert.ok(response.code === 0, "git command fails (e.g., not in a git repo)")
		assert.ok(response.text.trim().endsWith(":nan0web/ui-core.git"))
	})

	/**
	 * @docs
	 * ## API Reference
	 *
	 * ### Element Class
	 *
	 * ```mermaid
	 * flowchart TD
	 *     A[Structure] -->|UI-Block| B(Element)
	 *     C[Styling] -->|Tokens + Theme| B
	 *     D[Localization] -->|processI18n| B
	 *     B --> E[Render в React/Vue/etc]
	 *
	 *     style A fill:#eef,stroke:#333,color:#000
	 *     style C fill:#efe,stroke:#333,color:#000
	 *     style D fill:#fee,stroke:#333,color:#000
	 *     style B fill:#cfc,stroke:#333,color:#000
	 *     style E fill:#ffcc00,stroke:#333,color:#000
	 * ```
	 *
	 * * **Properties**
	 *   * `type` – the component type or HTML tag (e.g. "Button", "div").
	 *   * `content` – the element content (text, array, or nested elements).
	 *   * `props` – the extracted props with expanded $-keys.
	 *
	 * * **Methods**
	 *   * `hasChildren()` – returns true if element contains nested elements.
	 *   * `hasText()` – returns true if content includes text.
	 *   * `getChildElements()` – returns an array of child Element instances.
	 *   * `static from(input)` – creates or returns existing Element.
	 *
	 * * **Static Properties**
	 *   * `PROP_ALIASES` – map of custom key aliases (e.g., `$class` for `className`).
	 *
	 * * **Static Methods**
	 *   * `parseProp()` – transforms a $-prop into standard form.
	 *   * `parseInlineStyle()` – turns CSS string into style object.
	 *   * `extractProps()` – pulls all $-prefixed props.
	 *   * `extractTags()` – pulls non-prefixed keys as [type, content].
	 *
	 * ```mermaid
	 * flowchart TD
	 *     I["Input: { Button, $props, content }"] --> J["Element.from(input)"]
	 *     J --> K[extractProps + extractTags]
	 *     K --> L[parseProp: $onClick → onClick]
	 *     K --> M[parseInlineStyle: 'color:red']
	 *     K --> N[PROP_ALIASES: $variant → variant]
	 *
	 *     N --> O[Element Instance]
	 *     O --> P[hasChildren?]
	 *     O --> Q[hasText?]
	 *     O --> R["getChildElements()"]
	 *
	 *     style I fill:#eef,stroke:#333,color:#000
	 *     style O fill:#cfc,stroke:#333,color:#000
	 *     style K fill:#def,stroke:#333,color:#000
	 * ```
	 */
	it("How to create Element with complex content?", () => {
		//import Element from '@nan0web/ui-core'
		const element = new Element({
			div: [
				"Text content",
				{ span: "Nested element" }
			],
			$className: "container",
			$onClick: () => {}
		})
		console.info(element.type)         // "div"
		console.info(element.hasText())    // true
		console.info(element.hasChildren()) // true
		assert.equal(console.output()[0][1], "div")
		assert.equal(console.output()[1][1], true)
		assert.equal(console.output()[2][1], true)
	})

	/**
	 * @docs
	 * ### processI18n Utility
	 *
	 * * **Parameters**
	 *   * `input` – content to translate or substitute.
	 *   * `t` – optional translation function.
	 *   * `data` – optional variable substitution object.
	 *
	 * * **Returns**
	 *   * processed content (string, array, or unchanged type).
	 */
	it("How to use processI18n with arrays?", () => {
		//import { processI18n } from '@nan0web/ui-core'
		const content = [
			"Name: {{name}}",
			{ $t: "welcome" },
			[{ $t: "nested" }]
		]
		const t = (key) => key === "welcome" ? "Welcome" : "Nested"
		const data = { name: "John" }
		const result = processI18n(content, t, data)
		console.info(result) // ["Name: John", "Welcome", ["Nested"]]
		assert.deepEqual(console.output()[0][1], ["Name: John", "Welcome", ["Nested"]])
	})

	/**
	 * @docs
	 * ## Themes
	 *
	 * Themes are built using atoms, molecules, and organisms.
	 * ```mermaid
	 * flowchart TD
	 *     T[tokens.js] --> U["space, color, radius, shadow"]
	 *     U --> V[Theme]
	 *     V --> W[atoms: Button, Input]
	 *     V --> X[molecules: Card]
	 *     V --> Y[organisms: Modal]
	 *
	 *     V --> Z[CustomTheme]
	 *     V --> AA[DarkLightTheme]
	 *     V --> AB[NightTheme]
	 *
	 *     Z --> AC["getUserTheme(config)"]
	 *     AA --> AD["getActiveTheme() → prefers-color-scheme"]
	 *
	 *     style T fill:#efe,stroke:#333,color:#000
	 *     style V fill:#cfc,stroke:#333,color:#000
	 *     style Z fill:#ddf,stroke:#333,color:#000
	 *     style AA fill:#ddf,stroke:#333,color:#000
	 * ```
	 */
	it("How to access theme tokens?", () => {
		//import { tokens } from '@nan0web/ui-core'
		console.info(tokens.color.primary) // "var(--color-primary)"
		console.info(tokens.font.size.base) // "1rem"
		assert.ok(tokens.color.primary)
		assert.ok(tokens.font.size.base)
	})

	/**
	 * @docs
	 * ### Custom Themes
	 *
	 * Create a custom theme using `getUserTheme`.
	 */
	it("How to create a custom theme using getUserTheme?", () => {
		//import { getUserTheme } from '@nan0web/ui-core'
		const theme = getUserTheme({
			atoms: { Button: { background: "red" } },
			color: { background: "#fff" }
		})
		console.info(theme.atoms.Button.background) // "red"
		assert.ok(theme instanceof CustomTheme)
		assert.equal(console.output()[0][1], "red")
	})

	/**
	 * @docs
	 * ### DarkLightTheme
	 *
	 * Automatically switches between dark/light themes.
	 */
	it("How to check active theme in DarkLightTheme?", () => {
		//import { DarkLightTheme } from '@nan0web/ui-core'
		DarkLightTheme.current = "light"
		const theme = DarkLightTheme.getActiveTheme()
		console.info(theme) // { background: "#fff", text: "#000" }

		assert.deepEqual(console.output()[0][1], DarkLightTheme.light)
	})

	/**
	 * @docs
	 * ## Java•Script
	 */
	it("Uses `d.ts` files for autocompletion", () => {
		assert.equal(pkg.types, "./types/index.d.ts")
	})

	/**
	 * @docs
	 * ## Contributing
	 */
	it("How to contribute? - [check here](./CONTRIBUTING.md)", async () => {
		assert.equal(pkg.scripts?.precommit, "npm test")
		assert.equal(pkg.scripts?.prepush, "npm test")
		assert.equal(pkg.scripts?.prepare, "husky")
		const text = await fs.loadDocument("CONTRIBUTING.md")
		const str = String(text)
		assert.ok(str.includes("# Contributing"))
	})

	/**
	 * @docs
	 * ## License
	 */
	it("How to license ISC? - [check here](./LICENSE)", async () => {
		/** @docs */
		const text = await fs.loadDocument("LICENSE")
		assert.ok(String(text).includes("ISC"))
	})
}

describe("README.md testing", testRender)

describe("Rendering README.md", async () => {
	let text = ""
	const format = new Intl.NumberFormat("en-US").format
	const parser = new DocsParser()
	text = String(parser.decode(testRender))
	await fs.saveDocument("README.md", text)
	const dataset = DatasetParser.parse(text, pkg.name)
	await fs.saveDocument(".datasets/README.dataset.jsonl", dataset)

	it(`document is rendered in README.md [${format(Buffer.byteLength(text))}b]`, async () => {
		const text = await fs.loadDocument("README.md")
		assert.ok(text.includes("## License"))
	})
})
