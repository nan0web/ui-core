// src/theme/presets/NightTheme.js
import Theme from "../Theme.js"

/**
 * Night (dark) theme – overrides solid button colours with darker background
 * while keeping white text for contrast.
 */
export default class NightTheme extends Theme {
	static solid = {
		primary:   { background: "#0a58ca", color: "#fff", border: "#0a58ca" },
		secondary: { background: "#343a40", color: "#fff", border: "#343a40" },
		success:   { background: "#146c43", color: "#fff", border: "#146c43" },
		warning:   { background: "#d39e00", color: "#212529", border: "#d39e00" },
		danger:    { background: "#b02a37", color: "#fff", border: "#b02a37" },
		info:      { background: "#0ab5c9", color: "#fff", border: "#0ab5c9" },
		light:     { background: "#212529", color: "#fff", border: "#212529" },
		dark:      { background: "#000", color: "#fff", border: "#000" },
		link:      { background: "transparent", color: "#0d6efd", border: "transparent" },
	}
}
