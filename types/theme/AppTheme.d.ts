declare const _default: AppThemeConfig;
export default _default;
/**
 * Base application theme.
 * Should be extended by app-specific themes.
 */
export type AppThemeConfig = import("./Theme.js").ThemeConfig & {
    fontFamily?: string;
};
