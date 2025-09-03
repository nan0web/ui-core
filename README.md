# @nan0web/ui-core

<!-- %PACKAGE_STATUS% -->

A library for creating framework-agnostic UI elements.
Allows describing interfaces as simple objects.

## Description

The `@nan0web/ui-core` package provides a minimal yet powerful foundation for
framework-agnostic UI elements. It is designed to enable developers to describe
UI components as declarative objects. Core classes and utilities:

- `Element` — the main class for representing UI elements.
- `processI18n` — utility for translating and substituting variables in content.
- `tokens` — design system tokens for consistent UI styling.
- `Theme` — base class for creating and organizing UI themes.
- `getUserTheme` — function to select or create a custom theme.

These are perfect for building design systems, themeable UI frameworks,
and reusable component libraries.

## Installation

How to install with npm?
```bash
npm install @nan0web/ui-core
```

How to install with pnpm?
```bash
pnpm add @nan0web/ui-core
```

How to install with yarn?
```bash
yarn add @nan0web/ui-core
```

## Usage

### Basic Element Creation

Elements can be created with a component type, content, and props.

How to create a basic Element instance from object?
```js
import Element from '@nan0web/ui-core'
const element = new Element({
	Button: ["Click me"],
	$variant: "primary"
})
console.info(element.type)    // "Button"
console.info(element.content) // ["Click me"]
console.info(element.props)   // { variant: "primary" }

```
### Nested Elements

Elements can include child elements as arrays.

How to create nested Elements and check hasChildren()?
```js
import Element from '@nan0web/ui-core'
const element = new Element({
	div: [
		{ span: "Hello World" },
		{ Button: ["Submit"] }
	],
	$style: "color: blue; margin: 10px"
})
console.info(element.hasChildren()) // true
console.info(element.getChildElements().length) // 2

```
### Aria Attributes

Element handles $aria* props and converts them to aria-* attributes.

How to parse aria attributes like $ariaLabel?
```js
import Element from '@nan0web/ui-core'
const element = new Element({
	button: "Close",
	$ariaLabel: "Close dialog"
})
console.info(element.props) // { "aria-label": "Close dialog" }

```
### Event Handlers

Element recognizes $on* props as event handlers.

How to parse event handlers like $onClick and $onKeyDown?
```js
import Element from '@nan0web/ui-core'
const handleClick = () => console.log("Clicked")
const element = new Element({
	button: "Click me",
	$onClick: handleClick,
	$onKeyDown: () => {}
})
console.info(typeof element.props.onClick) // "function"
console.info(typeof element.props.onKeyDown) // "function"

```
## i18n

Elements support translations and variable substitution via `processI18n`.

How to process translations with processI18n and $t?
```js
import { processI18n } from '@nan0web/ui-core'
const input = { $t: "greetings.hello" }
const t = (key) => key === "greetings.hello" ? "Привіт!" : key
const result = processI18n(input, t)
console.info(result) // "Привіт!"

```

How to substitute variables in text content with processI18n?
```js
import { processI18n } from '@nan0web/ui-core'
const text = "User: {{name}}, Age: {{age}}"
const data = { name: "Іван", age: "30" }
const result = processI18n(text, null, data)
console.info(result) // "User: Іван, Age: 30"

```
## Playground: Try Before You Commit

There is a CLI sandbox to experiment safely.

There is a CLI sandbox to experiment safely:
```bash
git clone https://github.com/nan0web/ui-core.git
cd ui-core
npm install
npm run playground
```

## API Reference

### Element Class

* **Properties**
  * `type` – the component type or HTML tag (e.g. "Button", "div").
  * `content` – the element content (text, array, or nested elements).
  * `props` – the extracted props with expanded $-keys.

* **Methods**
  * `hasChildren()` – returns true if element contains nested elements.
  * `hasText()` – returns true if content includes text.
  * `getChildElements()` – returns an array of child Element instances.
  * `static from(input)` – creates or returns existing Element.

* **Static Properties**
  * `PROP_ALIASES` – map of custom key aliases (e.g., `$class` for `className`).

* **Static Methods**
  * `parseProp()` – transforms a $-prop into standard form.
  * `parseInlineStyle()` – turns CSS string into style object.
  * `extractProps()` – pulls all $-prefixed props.
  * `extractTags()` – pulls non-prefixed keys as [type, content].

How to create Element with complex content?
```js
import Element from '@nan0web/ui-core'
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

```
### processI18n Utility

* **Parameters**
  * `input` – content to translate or substitute.
  * `t` – optional translation function.
  * `data` – optional variable substitution object.

* **Returns**
  * processed content (string, array, or unchanged type).

How to use processI18n with arrays?
```js
import { processI18n } from '@nan0web/ui-core'
const content = [
	"Name: {{name}}",
	{ $t: "welcome" },
	[{ $t: "nested" }]
]
const t = (key) => key === "welcome" ? "Welcome" : "Nested"
const data = { name: "John" }
const result = processI18n(content, t, data)
console.info(result) // ["Name: John", "Welcome", ["Nested"]]

```
## Java•Script

Uses `d.ts` files for autocompletion

## Themes

Themes are built using atoms, molecules, and organisms.

How to access theme tokens?
```js
import { tokens } from '@nan0web/ui-core'
console.info(tokens.color.primary) // "var(--color-primary)"
console.info(tokens.font.size.base) // "1rem"
```
### Custom Themes

Create a custom theme using `getUserTheme`.

How to create a custom theme using getUserTheme?
```js
import { getUserTheme } from '@nan0web/ui-core'
const theme = getUserTheme({
	atoms: { Button: { background: "red" } },
	color: { background: "#fff" }
})
console.info(theme.atoms.Button.background) // "red"
```
### DarkLightTheme

Automatically switches between dark/light themes.

How to check active theme in DarkLightTheme?
```js
import { DarkLightTheme } from '@nan0web/ui-core'
DarkLightTheme.current = "light"
const theme = DarkLightTheme.getActiveTheme()
console.info(theme) // { background: "#fff", text: "#000" }

```
## Contributing

How to contribute? - [check here](./CONTRIBUTING.md)

## License

How to license ISC? - [check here](./LICENSE)
