import { processI18n } from "./utils/processI18n.js"
import { tokens } from "./tokens.js"
import Element from "./Element.js"
import { default as Theme, getUserTheme, CustomTheme, DarkLightTheme, NightTheme } from "./theme/index.js"

export {
	Element,
	processI18n,
	Theme,
	getUserTheme,
	CustomTheme,
	NightTheme,
	DarkLightTheme,
	tokens,
}

export default Element
