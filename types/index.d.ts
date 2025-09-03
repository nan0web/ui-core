export default Element;
import Element from "./Element.js";
import { processI18n } from "./utils/processI18n.js";
import { default as Theme } from "./theme/index.js";
import { getUserTheme } from "./theme/index.js";
import { CustomTheme } from "./theme/index.js";
import { DarkLightTheme } from "./theme/index.js";
import { tokens } from "./tokens.js";
export { Element, processI18n, Theme, getUserTheme, CustomTheme, DarkLightTheme, tokens };
