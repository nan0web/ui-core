// playground/main.js

import Element from "../src/index.js"
import { processI18n } from "../src/utils/processI18n.js"

console.log("=== Demo: Basic Element Creation ===")
const element1 = new Element({ 
	Button: ["Click me"], 
	$variant: "primary" 
})
console.log("Type:", element1.type)
console.log("Content:", element1.content)
console.log("Props:", element1.props)

console.log("\n=== Demo: Nested Elements ===")
const element2 = new Element({
	div: [
		{ span: "Hello World" },
		{ Button: ["Submit"] }
	],
	$style: "color: blue; margin: 10px"
})
console.log("Has children:", element2.hasChildren())
console.log("Child elements count:", element2.getChildElements().length)

console.log("\n=== Demo: Aria Attributes ===")
const element3 = new Element({
	button: "Close",
	$ariaLabel: "Close dialog"
})
console.log("Props with aria:", element3.props)

console.log("\n=== Demo: i18n Processing ===")
const translationFn = (key) => {
	const translations = {
		"greetings.hello": "Привіт!",
		"actions.save": "Зберегти"
	}
	return translations[key] || key
}

const tElement = { $t: "greetings.hello" }
console.log("Translation result:", processI18n(tElement, translationFn))

console.log("\n=== Demo: Variable Substitution ===")
const text = "User: {{name}}, Age: {{age}}"
const data = { name: "Іван", age: "30" }
console.log("Substituted text:", processI18n(text, null, data))

console.log("\n=== Demo: Complex Content Processing ===")
const complexContent = [
	"Welcome {{user}}!",
	{ $t: "actions.save" },
	{ div: [{ span: "{{status}}" }] }
]
const complexData = { user: "Admin", status: "active" }
console.log("Complex processing result:", processI18n(complexContent, translationFn, complexData))