import Theme from "./Theme.js"

/**
 * Base application theme.
 * Should be extended by app-specific themes.
 */
export default class AppTheme extends Theme {
	/** @type {string} */
	static fontFamily = 'system-ui'

	constructor() {
		super()
		if (new.target === AppTheme) {
			throw new Error("AppTheme is an abstract class and must be extended.")
		}
	}
}