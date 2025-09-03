/**
 * Theme that automatically switches between light/dark modes.
 */
export default class DarkLightTheme extends Theme {
    /** @type {Object} */
    static light: any;
    /** @type {Object} */
    static dark: any;
    /** @type {string} */
    static current: string;
    /**
     * Gets active theme (light, dark, or system preference).
     * @returns {Object}
     */
    static getActiveTheme(): any;
}
import Theme from "./Theme.js";
