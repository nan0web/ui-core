import { processI18n } from "./utils/processI18n.js"
import { tokens } from "./tokens.js"
import Element from "./Element.js"
import { default as Theme, getUserTheme, CustomTheme, DarkLightTheme } from "./theme/index.js"

export {
	Element,
	processI18n,
	Theme,
	getUserTheme,
	CustomTheme,
	DarkLightTheme,
	tokens,
}

export default Element
