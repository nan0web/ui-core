/**
 * @typedef {{ atoms?: object, molecules?: object, organisms?: object }} UserThemeConfig
 */
/**
 * Returns selected or custom user theme.
 * @param {string | UserThemeConfig} themeNameOrConfig
 * @returns {Theme}
 */
export function getUserTheme(themeNameOrConfig: string | UserThemeConfig): Theme;
/**
 * Custom user theme.
 */
export default class CustomTheme extends Theme {
    /**
     * @param {UserThemeConfig} config
     */
    constructor(config: UserThemeConfig);
}
export type UserThemeConfig = {
    atoms?: object;
    molecules?: object;
    organisms?: object;
};
import Theme from "./Theme.js";
