import Theme from "./Theme.js"
import * as presets from "./presets/index.js"

/**
 * @typedef {{ atoms?: object, molecules?: object, organisms?: object }} UserThemeConfig
 */

/**
 * Returns selected or custom user theme.
 * @param {string | UserThemeConfig} themeNameOrConfig
 * @returns {Theme}
 */
export function getUserTheme(themeNameOrConfig) {
	if (typeof themeNameOrConfig === 'string') {
		const preset = presets[themeNameOrConfig]
		if (preset) return new preset()
		throw new Error(`Theme preset "${themeNameOrConfig}" not found.`)
	}

	return new CustomTheme(themeNameOrConfig)
}

/**
 * Custom user theme.
 */
export default class CustomTheme extends Theme {
	/**
	 * @param {UserThemeConfig} config
	 */
	constructor(config) {
		super()
		Object.assign(this, config)
	}
}
